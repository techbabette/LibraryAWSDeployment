#!/bin/bash

# Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the docker repository to Apt sources:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

# Install docker 
    yes | sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Get aws deployment repo

    git clone https://github.com/techbabette/LibraryAWSDeployment
    cd LibraryAWSDeployment

# Add environment variables

    cd backend
    
    echo RDSAddress="${RDSAddress}" >> .env
    echo RDSPassword="${RDSPassword}" >> .env
    echo MailUsername="${MailUsername}" >> .env
    echo MailPassword="${MailPassword}" >> .env
    echo S3AccessKey="${S3AccessKey}" >> .env
    echo S3AccessKeySecret="${S3AccessKeySecret}" >> .env
    echo S3BucketName="${S3BucketName}" >> .env
    echo CloudfrontURL="${CloudfrontURL}" >> .env

    docker compose up -d --build

    docker exec backend-application-1 php artisan migrate:fresh --seed --force

    echo "Script executed successfully, frontend address is ${CloudfrontURL}" >> /run/testing.txt