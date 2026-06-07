| Layer          | Responsibility                  |
| -------------- | ------------------------------- |
| Controller     | Handles HTTP requests/responses |
| Service        | Contains business logic         |
| Repository     | Database access                 |
| Entity (Model) | Database table mapping          |
| MySQL          | Stores data                     |

# Flow

React
↓
Controller
↓
Service
↓
Repository
↓
MySQL

# Final Architecture

React + TypeScript
↓
UserController
↓
UserService
↓
UserRepository
↓
Hibernate/JPA
↓
MySQL

# JPA/Hibernate handles:

- SQL generation
- Database connections
- Mapping rows to objects
- Inserts
- Updates
- Deletes
- Transactions

# One-Sentence Summary

JPA is the Java standard for mapping Java objects to database tables, and Hibernate is the tool that implements that standard and generates the SQL for you.

# Java: A general-purpose, object-oriented programming language used to build applications that run on many platforms through the Java Virtual Machine (JVM).

# Spring Boot: A framework built on Java that simplifies creating and running production-ready applications, especially web services and APIs, with minimal configuration.

# JPA stands for Java Persistence API.

It's a Java specification that defines how Java objects are stored and retrieved from a database.

- pom.xml stands for Project Object Model file.

It is the main configuration file for a Maven project (like your Spring Boot backend).

Think of it as:

🧾 “The blueprint of your backend project — what it needs to run, build, and package.”

- It contains all dependences and plugins
