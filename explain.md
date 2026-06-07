backend
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── example
│       │           └── backend
│       │
│       │               BackendApplication.java
│       │               // 🚀 Main entry point of Spring Boot application
│       │               // Starts the server (Tomcat) and loads all components
│       │
│       │               controller
│       │               └── UserController.java
│       │               // 🌐 Handles HTTP requests (GET, POST, PUT, DELETE)
│       │               // Talks to Service layer
│       │
│       │               service
│       │               └── UserService.java
│       │               // 🧠 Business logic layer
│       │               // Processes data before saving/fetching from DB
│       │
│       │               repository
│       │               └── UserRepository.java
│       │               // 🗄 Database layer (Spring Data JPA)
│       │               // Automatically provides CRUD operations
│       │
│       │               model
│       │               └── User.java
│       │               // 📦 Entity class (maps to database table "users")
│       │               // Defines fields like id, name, email
│       │
│       │               exception
│       │               ├── GlobalExceptionHandler.java
│       │               // ⚠️ Central place to handle all application errors
│       │               // Converts exceptions into clean API responses
│       │
│       │               ├── UserNotFoundException.java
│       │               // ❌ Custom exception when user is not found
│       │
│       │               └── ErrorResponse.java
│       │               // 📄 Standard structure for error responses
│       │               // (timestamp, status, message, etc.)
│
│       └── resources
│           ├── application.properties
│           // ⚙️ Configuration file (DB connection, JPA settings, etc.)
│
│           └── static
│           // 📁 For static files (not commonly used in APIs)
│
├── pom.xml
│   // 📦 Maven configuration (dependencies like Spring Web, JPA, MySQL)
│
└── mvnw / mvnw.cmd
    // 🔧 Maven wrapper (run project without installing Maven)