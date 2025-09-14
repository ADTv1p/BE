# Copilot Instructions for the BE Repository

## Overview
This repository is a backend project built with Node.js, Express, and Sequelize for database management. It follows a modular structure with clear separation of concerns for routes, controllers, services, and models. The project uses MySQL as the database and relies on the `mysql2` library for database connections.

## Key Components

### 1. **Routes**
- Located in the `routes/` directory.
- Example files: `api.js`, `router.js`.
- Routes are defined using Express and delegate logic to controllers.

### 2. **Controllers**
- Located in `controllers/`.
- Subdirectories like `apiControllers/` and `serverControllers/` group related controllers.
- Controllers handle HTTP requests and responses, delegating business logic to services.

### 3. **Services**
- Located in `services/`.
- Subdirectories like `apiServices/` and `serverServices/` group related services.
- Services contain business logic and interact with models.

### 4. **Models**
- Located in `models/`.
- Sequelize models define the database schema and relationships.
- Example files: `users.js`, `staffs.js`, `work_orders.js`.

### 5. **Database Configuration**
- Configured in `config/database.js`.
- Uses environment variables from `.env` for database credentials.
- Example variables:
  ```
  DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASS=your_database_password
  DB_HOST=127.0.0.1
  ```

## Developer Workflows

### 1. **Starting the Server**
- Run the server with:
  ```bash
  node server.js
  ```
- Ensure the database is running and `.env` is correctly configured.

### 2. **Database Synchronization**
- Sequelize models can be synchronized with the database using:
  ```javascript
  sequelize.sync({ force: false });
  ```
  Add this in `server.js` if needed.

### 3. **Debugging**
- Use `console.log` for debugging.
- Enable Sequelize query logging by setting `logging: console` in `config/database.js`.

## Project-Specific Conventions

### 1. **Error Handling**
- Errors are logged to the console and returned as JSON responses.
- Example:
  ```javascript
  res.status(500).json({ error: 'Internal Server Error' });
  ```

### 2. **Model Relationships**
- Relationships are defined in the `associate` method of each model.
- Example:
  ```javascript
  User.hasMany(Post, { foreignKey: 'user_id' });
  ```

### 3. **EJS Views**
- Views are located in the `views/` directory.
- Layouts are managed using `express-ejs-layouts`.
- Example layout file: `views/layout/main.ejs`.

## External Dependencies

### 1. **MySQL**
- Uses the `mysql2` library for database connections.
- Ensure the correct version of `mysql2` is installed:
  ```bash
  npm install mysql2
  ```

### 2. **Environment Variables**
- Managed using the `dotenv` library.
- Ensure `.env` is present and correctly configured.

## Key Files and Directories
- `server.js`: Entry point of the application.
- `config/database.js`: Database configuration.
- `models/`: Sequelize models.
- `routes/`: Express routes.
- `controllers/`: Request handling logic.
- `services/`: Business logic.

## Notes for AI Agents
- Always ensure models are loaded and associated correctly in `models/index.js`.
- Follow the modular structure for adding new features (routes -> controllers -> services -> models).
- Use environment variables for sensitive data.

Feel free to update this file as the project evolves.
