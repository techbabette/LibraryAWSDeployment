resource "aws_cloudfront_distribution" "vue_app_distribution" {
  origin {
    domain_name = aws_s3_bucket.vue_app_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.vue_app_bucket.id
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Library CloudFront Distribution"
  default_root_object = "index.html"

  custom_error_response {
    response_page_path = "/index.html"
    response_code = 200
    error_code = 404
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.vue_app_bucket.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [ aws_cloudfront_origin_access_control.oac, aws_s3_bucket.vue_app_bucket ]
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "CloudfrontOAC"
  description                       = "Cloudfront OAC for S3 origin"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.vue_app_distribution.domain_name
}