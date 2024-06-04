resource "aws_instance" "public_laravel" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  subnet_id = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.public_laravel.id]

  tags = {
    Name = "citylibrarypublic_laravel"
  }

  user_data = "${data.template_file.laravel.rendered}"

  depends_on = [ 
    aws_iam_user_policy.s3access, 
    aws_db_instance.librarydb, 
    aws_cloudfront_distribution.vue_app_distribution,
    aws_vpc_security_group_egress_rule.allow_all_traffic_ipv4_laravel
   ]
}