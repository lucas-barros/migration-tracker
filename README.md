# Migration tracker

## Overview

This project implements a set of features capable of tracking species migrations.

There are two types of users. Biologist and Citizens.

To enter the Biologist flow, create an user with "@biology.com" email domain. Biologists can view and create migrations.

To enter the Citizen flow, create an user with any other email domain. Citizens can view a migration list.

## Usage

### Start

Create an .env file at the root directory. You may copy the .env.sample file as is or updated with desired values.

`cp .env.sample .env`

To facilate infrastructure provision, this project uses docker. 

Use the command below to start the project

`docker compose up --build`

Then access `http://localhost:8080/` to view the client application

### Development Mode

During development, you can use the following command to run in watch mode:

`docker compose up --build --watch`

