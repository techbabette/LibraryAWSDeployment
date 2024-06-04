resource "aws_db_subnet_group" "librarydb_group" {
  name       = "citylibrarydbsubnetgroup"
  subnet_ids = [ aws_subnet.private1.id, aws_subnet.private2.id ]

  tags = {
    Name = "City library database subnet group"
  }
}

resource "aws_db_instance" "librarydb" {
  allocated_storage    = 10
  db_name              = "books"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  username             = "root"
  password             = "pass1234!"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  vpc_security_group_ids = [ aws_security_group.private_database.id ]
  db_subnet_group_name = aws_db_subnet_group.librarydb_group.name
  availability_zone = "eu-north-1a"

  depends_on = [ aws_db_subnet_group.librarydb_group ]
}