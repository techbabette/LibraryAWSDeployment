resource "aws_apigatewayv2_api" "api" {
  name          = "citylibrarybackend_api"
  protocol_type = "HTTP"

  target = "http://${aws_instance.public_laravel.public_ip}"

  cors_configuration {
    allow_credentials = false
    allow_headers = [ "*", "authorization" ]
    allow_methods = [ "*" ]
    allow_origins = [ "*" ]
    expose_headers = [ "*" ]
  }
}

