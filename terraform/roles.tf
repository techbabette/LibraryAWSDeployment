resource "aws_iam_role" "lambda_role" {
  name = "citylibrarydatabaserefresher_role"

  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
})
}

resource "aws_iam_role" "scheduler_role" {
  name = "citylibrarydatabasescheduler_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "scheduler.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
})
}

resource "aws_iam_role_policy" "lamda_policy" {
  name = "citylibrarydatabaserefresher_policy"
  role = aws_iam_role.lambda_role.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Effect": "Allow",
        "Action": [
            "ec2:CreateNetworkInterface",
            "ec2:DeleteNetworkInterface",
            "ec2:DescribeNetworkInterfaces"
        ],
        "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": "logs:CreateLogGroup",
          "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": [
              "logs:CreateLogStream",
              "logs:PutLogEvents"
          ],
          "Resource": [
              "*"
          ]
      }
    ]
  })

  depends_on = [ aws_iam_role.lambda_role ]
}

resource "aws_iam_role_policy" "scheduler_policy" {
  name = "citylibrarydatabasescheduler_policy"
  role = aws_iam_role.scheduler_role.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:InvokeFunction",
        ]
        Effect   = "Allow"
        Resource = [
          "${aws_lambda_function.database_refresher.arn}",
          "${aws_lambda_function.database_refresher.arn}:*",
        ]
      },
    ]
  })

  depends_on = [ aws_lambda_function.database_refresher ]
}