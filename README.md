# Personal Task Manager

A full-stack web application for managing personal tasks with user authentication, built as part of the City Tele Coin coding challenge.

## ⚙️ Environment Configuration

This application uses a centralized `.env` file in the root directory for all environment variables. Before running the application, you must create this file:

### Creating the .env File
Copy the provided `.env` file or create one with the following variables:
```bash
# Database Configuration
POSTGRES_DB=taskmanager
POSTGRES_USER=admin
POSTGRES_PASSWORD=password

# Database Connection String
CONNECTION_STRING=Host=postgres;Database=taskmanager;Username=admin;Password=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-that-is-at-least-32-characters-long

# ASP.NET Core Configuration
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5001

# Additional Configuration
ALLOWED_HOSTS=*
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
LOG_LEVEL_DEFAULT=Information
LOG_LEVEL_ASPNETCORE=Warning
LOG_LEVEL_ENTITYFRAMEWORK=Warning
```

**Important**: The `.env` file contains sensitive information and should never be committed to version control. Ensure it's listed in your `.gitignore` file.

## 🚀 Tech Stack

- **Backend**: ASP.NET Core 8.0 (C#)
- **Frontend**: React 18 + TypeScript + Vite
- **Database**: PostgreSQL 15
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with bcrypt password hashing
- **Deployment**: Docker + Docker Compose

## 📋 Features

### User Authentication
- **Sign up**: Create account with unique email and password (minimum 8 characters)
- **Sign in**: Authenticate with email and password to access task management
- **Sign out**: Secure logout with token removal
- **Protected Routes**: Tasks are user-specific and require authentication

### Task Management
- **Create Tasks**: Add tasks with title (required), description (optional), category (Work/Personal/Other), and completion status
- **View Tasks**: Display all user tasks in an organized card-based layout
- **Update Tasks**: Edit task details including title, description, category, and completion status
- **Delete Tasks**: Remove tasks with confirmation prompt
- **Filter Tasks**: Filter tasks by category (Work, Personal, Other)
- **Real-time Updates**: Instant task status changes and updates

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS styling
- **Form Validation**: Client-side validation for email format and password requirements
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Clear error messages for user feedback

## 🛠️ Prerequisites

Before running this application, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- [Git](https://git-scm.com/downloads)

### Verify Installation
```bash
docker --version
docker-compose --version
git --version
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/personal-task-manager.git
cd personal-task-manager
```

### 2. Configure Environment Variables
Ensure the `.env` file exists in the root directory with all required variables (see Environment Configuration section above).

### 3. Start the Application
```bash
docker-compose up --build
```

This command will:
- Build and start the PostgreSQL database
- Build and start the ASP.NET Core backend API
- Build and start the React frontend application

### 4. Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5001](http://localhost:5001)
- **API Documentation**: [http://localhost:5001/swagger](http://localhost:5001/swagger) (Development only)

## 🏗️ Architecture

### Database Schema

**Users Table:**
```sql
users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**Tasks Table:**
```sql
tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'Other',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Authenticate user and return JWT token
- `POST /api/auth/signout` - Logout (client-side token removal)

#### Task Endpoints (Authentication Required)
- `GET /api/tasks` - List user's tasks (optional: `?category=Work`)
- `GET /api/tasks/{id}` - Get specific task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update existing task
- `DELETE /api/tasks/{id}` - Delete task

#### Health Check
- `GET /api/health` - Check API and database connectivity

## 🔧 Configuration

### Environment Variables

All environment variables are centralized in the root `.env` file and automatically loaded by Docker Compose. The application configuration has been updated to use environment variables instead of hardcoded values in configuration files.

**Key Configuration Changes:**
- All sensitive values moved from `appsettings.json` to environment variables
- Docker Compose updated to reference `.env` file variables
- Backend configuration updated to prioritize environment variables over config files

**Production Deployment:**
For production deployment, update the `.env` file with production-appropriate values:
- Use strong, unique passwords and secrets
- Configure proper database connection strings
- Set `ASPNETCORE_ENVIRONMENT=Production`
- Update CORS origins to match your production domains

### JWT Configuration
The JWT secret is now configured via the `JWT_SECRET` environment variable. Ensure this is a strong, unique key of at least 32 characters for production use.

## 🐳 Docker Services

The application consists of three Docker services:

1. **postgres**: PostgreSQL 15 database with initialization scripts
2. **backend**: ASP.NET Core API server running on port 5001
3. **frontend**: React application served via Nginx on port 3000

### Service Health Checks
- PostgreSQL includes health checks to ensure proper startup sequence
- Backend waits for database to be ready before starting
- Frontend depends on backend service availability

## 🔒 Security Features

- **Password Hashing**: Uses BCrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JWT tokens
- **CORS Configuration**: Configured for frontend-backend communication
- **Input Validation**: Server-side validation for all API endpoints
- **User Isolation**: Users can only access their own tasks

## 🛠️ Development

### Running in Development Mode

For development, you can run services individually:

#### Backend
```bash
cd backend/TaskManager.API
dotnet run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Database
```bash
docker run -d \
  --name taskmanager-db \
  -e POSTGRES_DB=taskmanager \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine
```

### Building for Production

```bash
# Build all services
docker-compose build

# Run in production mode
docker-compose -f docker-compose.yml up -d
```

## 🔍 Health Check

To verify the application is running correctly:

```bash
# Check API health
curl http://localhost:5001/api/health

# Check frontend accessibility
curl http://localhost:3000
```

## 📝 Usage

1. **Create Account**: Navigate to the registration page and create a new account
2. **Sign In**: Use your credentials to access the dashboard
3. **Manage Tasks**: Create, edit, complete, and delete tasks as needed
4. **Filter Tasks**: Use the category filter to organize your view
5. **Sign Out**: Use the sign-out button to securely end your session

## 🎨 Design Choices

- **Card-based Layout**: Tasks are displayed in an intuitive card format
- **Tailwind CSS**: Used for rapid, consistent styling
- **TypeScript**: Ensures type safety throughout the frontend
- **Entity Framework**: Provides robust ORM capabilities for the backend
- **Responsive Design**: Mobile-first approach for cross-device compatibility

## 🚨 Troubleshooting

### Common Issues

**Database Connection Issues:**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View database logs
docker-compose logs postgres
```

**Frontend Build Issues:**
```bash
# Clear Docker build cache
docker system prune

# Rebuild frontend specifically
docker-compose build frontend
```

**Port Conflicts:**
- Ensure ports 3000, 5001, and 5432 are available
- Modify docker-compose.yml port mappings if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Vincent Hartline  
Built for City Tele Coin programming challenge

---
