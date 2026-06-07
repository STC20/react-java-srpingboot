# Backend
curl.exe "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.5.0&groupId=com.example&artifactId=backend&name=backend&packageName=com.example.backend&dependencies=web" -o backend.zip

Expand-Archive backend.zip backend

Remove-Item backend.zip

# Run the backend
.\mvnw.cmd spring-boot:run

or
.\mvnw spring-boot:run


# Frontend
npm create vite@latest frontend -- --template react-ts

cd frontend
npm install
npm install axios
cd ..

cd backend
.\mvnw.cmd spring-boot:run

# Initiation
powershell -Command "Expand-Archive -Path backend.zip -DestinationPath backend"

# Create database
CREATE DATABASE userdb;

# Create table 
INSERT INTO users (name, email)
VALUES ('John', 'john@gmail.com');

# flow 
React → Spring Boot → JPA → MySQL

# Run test
.\mvnw test