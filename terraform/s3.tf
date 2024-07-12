data "external" "build_vue_app" {
  program = ["bash", "${path.cwd}/build_vue_app.sh", "${aws_apigatewayv2_api.api.api_endpoint}/api"]
}

resource "aws_s3_bucket" "vue_app_bucket" {
  force_destroy = true
}

resource "aws_s3_bucket_policy" "vue_app_bucket_policy" {
  bucket = aws_s3_bucket.vue_app_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
            Service: "cloudfront.amazonaws.com"
        }
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.vue_app_bucket.arn}/*"
        Condition = {
          StringEquals: {"AWS:SourceArn": "${aws_cloudfront_distribution.vue_app_distribution.arn}"}
        }
      }
    ]
  })

  depends_on = [ aws_cloudfront_distribution.vue_app_distribution ]
}

resource "aws_s3_object" "vue_app_files" {
  for_each = fileset(data.external.build_vue_app.result.path, "**")

  bucket = aws_s3_bucket.vue_app_bucket.bucket
  key    = each.key
  source = "${data.external.build_vue_app.result.path}/${each.key}"

    content_type = lookup({
    "index.html"   = "text/html",
    "css/app.css" = "text/css",
    "js/app.js" = "application/javascript",
    "js/chunk-vendors.js" = "application/javascript",
  }, each.key, "application/octet-stream")

  depends_on = [ data.external.build_vue_app ]
}

output "build_output" {
  value = data.external.build_vue_app.result
}