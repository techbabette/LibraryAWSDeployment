data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "template_file" "laravel" {
  template = "${file("laravel_init.sh")}"

  vars = {
    RDSAddress = "${aws_db_instance.librarydb.address}"
    RDSPassword = "${aws_db_instance.librarydb.password}"
    MailUsername = "${var.email_username}"
    MailPassword = "${var.email_password}"
    S3AccessKey = "${aws_iam_access_key.s3access.id}"
    S3AccessKeySecret = "${aws_iam_access_key.s3access.secret}"
    S3BucketName = "${aws_s3_bucket.vue_app_bucket.id}"
    CloudfrontURL = "${aws_cloudfront_distribution.vue_app_distribution.domain_name}"
  }

  depends_on = [ aws_cloudfront_distribution.vue_app_distribution, aws_iam_access_key.s3access, aws_db_instance.librarydb ]
}
