# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations, filtering, sorting, pagination, and dark mode support.

## 🚀 Features

### Core Features
- **User Authentication**: Secure signup and login with JWT-based authentication
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Task Properties**: Each task includes:
  - Title (required, max 200 characters)
  - Description (optional, max 1000 characters)
  - Status (Pending / In Progress / Done)
  - Deadline date (required)

### Additional Features
- **Task Filtering**: Filter tasks by status (Pending, In Progress, Done)
- **Task Sorting**: Sort by deadline, creation date, or status
- **Pagination**: Navigate through tasks with pagination support
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Two View Modes**: Switch between card view and table view
- **Visual Indicators**: Overdue tasks are highlighted in red

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v7 or higher) - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **npm** or **yarn** package manager
- **Git** (optional, for cloning the repository)

## Screenshots
<img width="1912" height="830" alt="image" src="https://github.com/user-attachments/assets/cfc5a7d5-888b-4616-a84c-9c27d7a92674" />

<img width="1916" height="820" alt="image" src="https://github.com/user-attachments/assets/ca48fa00-cba1-4c0b-85b7-3a64700689a6" />

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd crud
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory, with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important**: 
- Change `JWT_SECRET` to a strong, random string in production
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend` directory (optional, defaults to `http://localhost:5000/api`):

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

#### Start MongoDB

**Option 1: MongoDB Atlas**
- Use your Atlas connection string in the `.env` file

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server
Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

#### Start Backend in Production

```bash
cd backend
npm start
```

## 📡 API Endpoints
### Authentication

- `POST /api/auth/signup` - Register a new user
--- sample account to use
  - Email: `abc@gmail.com`
  - Password: `abc@123` 

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe" // optional
  }
  ```

- `POST /api/auth/login` - Login existing user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Tasks (Requires Authentication)

All task endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

- `GET /api/tasks` - Get all tasks (supports query parameters)
  - Query parameters:
    - `status` - Filter by status (Pending, In Progress, Done)
    - `sortBy` - Sort by (deadline, createdAt, status)
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 10)
  - Example: `GET /api/tasks?status=Pending&sortBy=deadline&page=1&limit=10`

- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "status": "Pending",
    "deadline": "2024-12-31T23:59:59.000Z"
  }
  ```

- `PUT /api/tasks/:id` - Update a task
  ```json
  {
    "title": "Updated Title",
    "status": "In Progress"
  }
  ```

- `DELETE /api/tasks/:id` - Delete a task


### MongoDB Atlas Setup

1. **Create Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**: Choose a free tier cluster

3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

4. **Update Environment Variables**: Use the connection string in your `.env` file

## 📁 Project Structure

```
crud/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model schema
│   │   └── Task.js          # Task model schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── tasks.js         # Task CRUD routes
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── validation.js    # Request validation middleware
│   ├── server.js            # Express server setup
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.jsx     # Task card component
│   │   │   ├── TaskModal.jsx    # Task create/edit modal
│   │   │   └── TaskTable.jsx    # Task table component
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication context
│   │   │   └── ThemeContext.jsx # Dark mode context
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Signup.jsx       # Signup page
│   │   │   └── Dashboard.jsx    # Main dashboard
│   │   ├── utils/
│   │   │   └── api.js           # API utility functions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Backend routes are protected with authentication middleware
- **Input Validation**: All inputs are validated on both client and server
- **CORS Configuration**: Cross-origin requests are properly configured
- **Environment Variables**: Sensitive data stored in environment variables

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Card & Table Views**: Switch between different viewing modes
- **Visual Feedback**: Toast notifications for user actions
- **Loading States**: Loading indicators during API calls
- **Form Validation**: Real-time form validation with error messages

## 🧪 Testing the Application

1. **Sign Up**: Create a new account
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Add multiple tasks with different statuses
4. **Filter Tasks**: Use the status filter to view specific tasks
5. **Sort Tasks**: Change sorting options to see different arrangements
6. **Edit Tasks**: Update task details using the Edit button
7. **Delete Tasks**: Remove tasks using the Delete button
8. **Toggle Dark Mode**: Switch between light and dark themes
9. **Switch Views**: Toggle between card and table views
10. **Pagination**: Navigate through multiple pages of tasks

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**:
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network connectivity

**Port Already in Use**:
- Change the PORT in `.env` file
- Or stop the process using the port

**JWT Secret Error**:
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random string

### Possible Issues

**API Connection Error**:
- Verify backend server is running
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is properly configured

**Build Errors**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be v18+)

---
