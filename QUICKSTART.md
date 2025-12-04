# Quick Start Guide

Follow these steps to get the Task Management Application up and running quickly.

## Prerequisites Check

- ✅ Node.js installed (v18+)
- ✅ MongoDB installed OR MongoDB Atlas account
- ✅ npm or yarn package manager

## Step-by-Step Setup

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Windows (PowerShell):
New-Item -Path .env -ItemType File

# macOS/Linux:
touch .env
```

**Edit `.env` file** with this content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

**For MongoDB Atlas users**, replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
```

### 2. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows - Open MongoDB Compass or run mongod
mongod

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- No local setup needed, just use your connection string in `.env`

### 3. Start Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Start in development mode (with auto-reload)
npm run dev

# OR start in production mode
npm start
```

✅ Backend should now be running on `http://localhost:5000`

### 4. Frontend Setup (3 minutes)

**Open a NEW terminal window:**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# (Optional) Create .env file for custom API URL
# Default is http://localhost:5000/api
```

### 5. Start Frontend Development Server

```bash
# Make sure you're in the frontend directory
npm run dev
```

✅ Frontend should now be running on `http://localhost:3000`

### 6. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## First Steps in the App

1. **Sign Up**: Create a new account, use following as sample account
   - Email: `abc@gmail.com`
   - Password: `abc@123` (minimum 6 characters)

2. **Create Tasks**: Click "Create Task" button
   - Fill in title, description, status, and deadline
   - Click "Create Task"

3. **Explore Features**:
   - Filter by status
   - Sort by deadline/created date/status
   - Toggle between card and table views
   - Switch dark mode on/off
   - Edit and delete tasks

## Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check if MongoDB is running: `mongosh` or open MongoDB Compass
- ✅ Verify `MONGODB_URI` in `.env` is correct
- ✅ For Atlas: Check your IP is whitelisted and credentials are correct

### "Port 5000 already in use"
- ✅ Change PORT in `.env` to another port (e.g., 5001)
- ✅ Or stop the process using port 5000

### "Port 3000 already in use"
- ✅ Vite will automatically use the next available port
- ✅ Or change port in `vite.config.js`

### "Module not found" errors
- ✅ Delete `node_modules` folder
- ✅ Run `npm install` again
- ✅ Make sure you're in the correct directory

### Frontend can't connect to backend
- ✅ Verify backend is running on port 5000
- ✅ Check browser console for CORS errors
- ✅ Verify `VITE_API_URL` in frontend `.env` (if set)

## Next Steps
- Read the full [README.md](./README.md) for detailed documentation
---
