resource "aws_lambda_function" "database_refresher" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  
  filename      = "BookDatabaseRefresher.zip"
  function_name = "citylibrarydatabase_refresher"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  timeout = 30

  runtime = "python3.12"

  vpc_config {
    subnet_ids = [ aws_subnet.private1.id ]
    security_group_ids = [ aws_security_group.private_lambda.id ]
  }

  environment {
    variables = {
      RDS_ENDPOINT = aws_db_instance.librarydb.address,
      DB_NAME = "books",
      DB_USERNAME = aws_db_instance.librarydb.username,
      DB_PASSWORD = aws_db_instance.librarydb.password
    }
  }

  depends_on = [ aws_iam_role_policy.lamda_policy, aws_instance.public_laravel ]
}

resource "aws_scheduler_schedule" "database_refresher" {
  name       = "citylibrarydatabase_refresher"

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression = "rate(15 minutes)"

  target {
    arn      = aws_lambda_function.database_refresher.arn
    role_arn = aws_iam_role.scheduler_role.arn
  }
}