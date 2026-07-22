# NoteLock – Secure Password & Notes Manager

NoteLock is a production-quality MERN stack application with a Chrome Extension to securely store passwords and personal notes. It features Email OTP-based 2FA authentication, a password generator, password strength metering, and a Chrome extension to detect login forms, prompt to save credentials, and autofill them.

## Technology Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Authentication**: JWT, bcrypt, Nodemailer (Email OTP)
- **Extension**: Chrome Extension (Manifest V3)

## Project Structure
- `/client`: Frontend React application
- `/server`: Backend Express application
- `/extension`: Chrome Extension

## Setup Instructions

### 1. Database and Environment Variables
Navigate to the `server` directory and modify `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
```
*(Note: Use a Gmail App Password for EMAIL_PASS. Google Account -> Security -> 2-Step Verification -> App Passwords)*

### 2. Start the Backend Server
```bash
cd server
npm install
node server.js
```

### 3. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```

### 4. Install Chrome Extension
1. Open Google Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** in the top left.
4. Select the `NoteLock/extension` folder.
5. Click on the extension icon in Chrome. You need to provide your JWT token to authenticate the extension (for this demo, grab it from the Web App's Local Storage).

## Features
- **User Authentication**: Signup, Login, and Email OTP (2FA) Verification.
- **Dashboard**: Summary cards for Total Passwords, Secure Notes, Favorites, and Weak Passwords.
- **Password Vault**: Store credentials securely. Create, Edit, Delete, Search, and Favorite.
- **Secure Notes**: Store personal notes securely with hover-to-reveal content.
- **Password Generator**: Generate strong passwords with customizable options.
- **Chrome Extension**: Detect login forms, prompt to save credentials asynchronously, and autofill saved credentials when returning to the site.

## Disclaimer
This project is built for a college-level demonstration. While it employs good practices like password hashing and JWT, in a true production environment, sensitive fields like `password` and `content` (in Notes) should be encrypted at rest using AES-256 before being stored in the database.
