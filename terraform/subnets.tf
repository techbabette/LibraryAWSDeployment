# SUBNETS
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.4.1.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "librarypublicsubnet"
  }
}

resource "aws_subnet" "private1" {
  vpc_id     = aws_vpc.main.id
  availability_zone = "eu-north-1a"
  cidr_block = "10.4.2.0/24"

  tags = {
    Name = "libraryprivatesubnet1"
  }
}

resource "aws_subnet" "private2" {
  vpc_id     = aws_vpc.main.id
  availability_zone = "eu-north-1b"
  cidr_block = "10.4.3.0/24"

  tags = {
    Name = "libraryprivatesubnet2"
  }
}