resource "aws_iam_user" "s3access" {
  name = "citylibrarys3access"
  force_destroy = true
}

resource "aws_iam_access_key" "s3access" {
  user = aws_iam_user.s3access.name
}

data "aws_iam_policy_document" "s3access" {
  statement {
    effect    = "Allow"
    actions   = [
        "s3:DeleteObject",
        "s3:GetBucketLocation",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
    ]
    resources = [
        "${aws_s3_bucket.vue_app_bucket.arn}",
        "${aws_s3_bucket.vue_app_bucket.arn}/*"
    ]
  }
}

resource "aws_iam_user_policy" "s3access" {
  name   = "s3allowall"
  user   = aws_iam_user.s3access.name
  policy = data.aws_iam_policy_document.s3access.json
}