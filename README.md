# Node.js API Practice Project

A backend practice project built using **Node.js, Express.js, PostgreSQL, and Drizzle ORM**.

This project demonstrates how to build REST APIs using Node.js with a clean and scalable project structure.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Drizzle ORM
* bcrypt
* dotenv
* Nodemon

## ORM Used

This project uses **Drizzle ORM** to communicate with PostgreSQL.

In a Node.js backend project, we can use different ORMs depending on the project requirements.

For example:

* **Drizzle ORM**
* **Prisma**

Both Drizzle ORM and Prisma can be used to work with databases such as PostgreSQL.

### Why Drizzle ORM?

Drizzle ORM is a lightweight TypeScript/JavaScript ORM that provides a SQL-like and type-safe way to work with databases.

In this project, Drizzle ORM is used for:

* Database connection
* Defining database schemas
* Running migrations
* Performing database queries
* Creating and retrieving users

## Project Structure

```text
node_practice_project_02/
│
├── src/
│   ├── config/
│   │   └── env.js
│   │
│   ├── controllers/
│   │   └── user.controller.js
│   │
│   ├── db/
│   │   ├── index.js
│   │   └── schema/
│   │       └── user.schema.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   └── user.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── drizzle/
│   └── migrations
│
├── .env
├── .env.example
├── .gitignore
├── drizzle.config.js
├── package.json
└── package-lock.json
```

## Database

This project uses **PostgreSQL** as the database.

The `users` table contains information such as:

* ID
* First Name
* Last Name
* Email
* Password
* Email Verification Status
* User Status
* Created At
* Updated At

Passwords are stored using **bcrypt hashing** instead of storing plain-text passwords.

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/practice_002
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

## Installation

Clone or create the project and install dependencies:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

## Database Commands

Generate Drizzle migrations:

```bash
npm run db:generate
```

Run database migrations:

```bash
npm run db:migrate
```

## API Endpoints

### Sign Up

Create a new user.

```http
POST /api/v1/users/sign-up
```

Request body:

```json
{
    "first_name": "John",
    "last_name": "doe",
    "email": "john@yopmail.com",
    "password": "12345678"
}
```

### Sign In

Login using email and password.

```http
POST /api/v1/users/sign-in
```

Request body:

```json
{
    "email": "john@yopmail.com",
    "password": "12345678"
}
```

## API Flow

The project follows a simple layered architecture:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Drizzle ORM
   ↓
PostgreSQL
```

### Routes

Routes define the API endpoints and forward requests to the appropriate controller.

### Controllers

Controllers handle:

* Request data
* Validation
* Response
* Error handling

### Services

Services contain the main business logic and database operations.

### Drizzle ORM

Drizzle ORM is responsible for communicating with PostgreSQL.

## Prisma vs Drizzle ORM

Node.js does not require a specific ORM.

We can choose an ORM based on project requirements.

```text
Node.js
   │
   ├── Prisma ORM
   │
   └── Drizzle ORM
```

For example:

### Using Prisma

```text
Node.js
   ↓
Express.js
   ↓
Prisma
   ↓
PostgreSQL
```

### Using Drizzle

```text
Node.js
   ↓
Express.js
   ↓
Drizzle ORM
   ↓
PostgreSQL
```

Both approaches can be used to build REST APIs.

This project uses **Drizzle ORM** for practice and learning.

## Security

The project follows some basic security practices:

* Passwords are hashed using bcrypt.
* Passwords are not returned in API responses.
* Database credentials are stored in environment variables.
* Duplicate emails are handled.
* Input validation is performed before creating users.

## Future Improvements

The following features can be added later:

* JWT Authentication
* Access Token
* Refresh Token
* Email OTP Verification
* Forgot Password
* Reset Password
* Role-Based Access Control
* Request Validation
* Global Error Handler
* Logging
* Rate Limiting
* API Documentation using Swagger
* Docker
* Production Deployment

## Learning Objective

The main objective of this project is to understand how to build a backend API using:

**Node.js + Express.js + PostgreSQL + Drizzle ORM**

and understand how different layers of a backend application work together.
