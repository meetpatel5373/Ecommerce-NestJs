NestJS Backend Project

Overview

This is a NestJS backend project with a clean and scalable architecture. The project is structured to ensure maintainability and efficiency while leveraging NestJS's powerful features.

Features

Global Exception Handling: No need to use try-catch blocks in controllers/services since a global exception filter is in place.
Swagger API Documentation: Available at http://localhost:3000/documentation#/ after starting the server.
Modular and Scalable Architecture for easy feature expansion.
Environment Variables Support for flexible configuration.
Database Integration with Sequelize (PostgreSQL/MySQL support).

Prerequisites
Ensure you have the following installed:
Node.js (>= 16.x)
npm
PostgreSQL/MySQL (if using a database)

Installation

# Clone the repository

git clone <repo_url>
cd <project_folder>

# Install dependencies

npm install

Environment Variables
Create a .env file in the root directory and configure it accordingly:
APP_ENV =''

PORT=''
DB_HOST=''
DB_NAME=''
DB_PORT=''
DB_PASSWORD=''
DB_USERNAME=''

SWAGGER_PASSWORD=''

ALLOW_ORIGINS=''
ALLOW_METHODS=''
ALLOW_HEADERS=''

JWT_SECRET_KEY=''
JWT_SECRET_REFRESH_KEY=''

AWS_URL=''
AWS_S3_ACCESS_KEY=''
AWS_S3_SECRET_KEY=''
AWS_BUCKET_NAME=''
AWS_REGION=''

Running the Server

# Development mode

npm run start:dev

The server will start at http://localhost:3000/

API Documentation (Swagger)
After starting the server, access Swagger documentation at:
http://localhost:3000/documentation#/

Swagger is auto-generated based on the defined DTOs and API decorators.

Global Exception Handling

A global exception filter is implemented, so explicit try-catch blocks are not needed in controllers/services. This ensures consistent error responses across the application.

Contributing

Feel free to submit issues and PRs to improve the project.

License

MIT
