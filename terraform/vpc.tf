# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.4.0.0/16"
}