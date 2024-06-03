#!/bin/bash

# Get the environment variable from Terraform
API_URL=$1

# Navigate to the Vue project directory
cd ../frontend

# Export the environment variable for the Vue build process
echo "VUE_APP_API_URL=$API_URL" > .env
echo "VUE_APP_IMAGE_SOURCE='imgs/'" >> .env 

#Install dependencies
npm install &> '/dev/null'

#Build the Vue application
npm run build &> '/dev/null'

# Return the output
dir=`pwd`
echo "{\"path\": \"${dir}/dist\"}"