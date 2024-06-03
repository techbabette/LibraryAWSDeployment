resource "aws_security_group" "private_database" {
  name        = "citylibraryprivate_database"
  description = "Allow inbound traffic to port 3306 and all outbound traffic"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "citylibraryprivate_database"
  }
}

resource "aws_security_group" "private_lambda" {
  name        = "citylibraryprivate_lambda"
  description = "Allow outbound traffic on port 3306"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "citylibraryprivate_lambda"
  }
}

#SECURITY GROUP INGRESS RULES
resource "aws_vpc_security_group_ingress_rule" "allow_private_database" {
  security_group_id = aws_security_group.private_database.id
  cidr_ipv4         = aws_vpc.main.cidr_block
  from_port         = 3306
  ip_protocol       = "tcp"
  to_port           = 3306
}

#SECURITY GROUP EGRESS RULES
resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4_database" {
  security_group_id = aws_security_group.private_database.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv6_database" {
  security_group_id = aws_security_group.private_database.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

#SECURITY GROUP EGRESS RULES
resource "aws_vpc_security_group_egress_rule" "allow_database_ipv4_lambda" {
  security_group_id = aws_security_group.private_lambda.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port = 3306
  to_port = 3306
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "allow_database_ipv6_lambda" {
  security_group_id = aws_security_group.private_lambda.id
  cidr_ipv6         = "::/0"
  from_port = 3306
  to_port = 3306
  ip_protocol       = "tcp"
}
