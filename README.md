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