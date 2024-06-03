variable "access_key" {
  sensitive = true
}

variable "secret_key" {
  sensitive = true
}

provider "external" {}

provider "aws" {
  region = "eu-north-1"
  access_key = var.access_key
  secret_key = var.secret_key
}