# City Library AWS Deployment

## Architecture

The following architecture is created through Terraform.

![AWS Deployment Architecture](https://i.imgur.com/UPA5tK6.png "AWS Deployment Architecture")

## Running

Run ```terraform apply -target=data.external.build_vue_app && terraform apply```.

Set the following variables either in a terraform.tfvars file or manually when running terraform apply

- access_key (aws user access key id)
- secret_key (aws user access key secret)
- email_username (gmail address, used for sending mail to users)
- email_password (gmaill address app password)

Building the Vue application runs a bash script locally, so this deployment strategy can only be run on Linux machines.
The Vue application has to be built at deploy-time as there is no other way to affect environment variables and feed the frontend application information about the backend. 

## Output

Terraform outputs the following variables after completion:

- cloudfront_url (URL of the frontend of the newly generated stack)
- build_output (Local path of the newly built vue application)

## Destroying
As per terraform documentation:
*Due to AWS Lambda improved VPC networking changes that began deploying in September 2019, EC2 subnets and security groups associated with Lambda Functions can take up to 45 minutes to successfully delete.*

Since the Lamda function in this stack has to interact with an RDS instance that is in a private subnet, the Lambda too must be associated with a VPC and subnet, causing issues with destruction.

If the destruction process is interrupted, you might run into an ``` Error: Invalid for_each argument``` error.
To fix this error and continue destruction, first run ```terraform apply -target=data.external.build_vue_app``` and then proceed with destruction with ```terraform destroy```.