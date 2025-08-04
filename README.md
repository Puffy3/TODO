Here’s a clear and concise README for your full-stack MERN ToDo app with Gemini AI integration:

# MERN ToDo App with Gemini AI Question Bar

A full-stack ToDo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Google Gemini API integration for asking questions.

## 🚀 Features

- **ToDo CRUD:** Add, toggle, and delete tasks with state persisted in MongoDB.
- **Gemini Question Bar:** Ask any question and receive an answer from Google’s Gemini AI.
- **.env Config:** Easily customize ports and API endpoints.
- **CORS Configured:** Secure communication between frontend and backend.

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Puffy3/TODO.git
cd todo-mern-gemini
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server`:

```
PORT=5000
MONGODB_URI=<Your mongodb connection string>
FRONTEND_URL=http://localhost:3000
```

Start the local MongoDB server if it’s not already running.

### 3. Frontend Setup

```bash
cd ../client
npm install
```

In the  `App.jsx` file in `client`:

```
REACT_APP_API_URL=http://localhost:5000/api/todos
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

> Replace `your_gemini_api_key_here` with your actual [Gemini API key](https://ai.google.dev/gemini-api/docs/get-api-key).

### 4. Running the App Locally

#### In one terminal, start the backend:

```bash
cd server
npm run dev
```
Or, if using Node:
```bash
npm start
```

#### In another terminal, start the frontend:

```bash
cd client
npm start
```

## 💡 Usage

- Visit [http://localhost:3000](http://localhost:3000) in your browser.
- **Add, toggle, and delete todos** in the main app area.
- **Ask questions** using the Gemini question bar—answers appear instantly using Gemini AI.
- Data persists in MongoDB.

## ⚙️ Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React.js, Axios
- Language Model: Gemini (Google) API

## 📄 Notes

- Ensure MongoDB is running locally or update `MONGODB_URI`.
- The Gemini API key is used directly in frontend (for demo/simple projects); consider proxying requests through your backend in production for security.
- CORS is set via `FRONTEND_URL` in the backend `.env` for secure API access.

Feel free to customize and extend as needed!
