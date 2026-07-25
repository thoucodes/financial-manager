# Financial Management App

A simple personal finance tracker to manage income, expenses, and view financial summaries. Built with a vanilla JavaScript frontend and a Node.js/Express backend using MongoDB.

## Features

- User registration and login (JWT-based authentication)
- Add income and expense transactions with categories
- Dashboard with total balance, income, and expense summary
- Filter transactions by year or month
- Full transactions page with search, filter, edit, delete, and pagination
- Profile page to view account info, edit name, and change password

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**Frontend:** HTML, CSS, JavaScript (no framework)

## Project Structure

```
financial-management/
├── backend/
│   ├── controllers/       # Request handling logic
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── server.js           # App entry point
│   └── package.json
└── frontend/
    ├── css/                # Stylesheets per page
    ├── js/                 # Scripts per page
    └── *.html              # Pages (login, registration, dashboard, transaction, profile)
```

## Setup Instructions

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment variables
Create a `.env` file inside the `backend` folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5500
```

### 3. Run the backend
```bash
npm run dev
```
Server runs at `http://localhost:5500`

### 4. Open the frontend
Open `frontend/login.html` in your browser (or serve it with a local server / Live Server extension).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/auth/me` | Get logged-in user's info |
| PUT | `/api/auth/update-name` | Update user's name |
| PUT | `/api/auth/change-password` | Change user's password |
| POST | `/api/transactions/create` | Create a transaction |
| GET | `/api/transactions` | Get all transactions for logged-in user |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

## Notes

- Passwords are hashed using bcrypt before storing.
- Routes other than register/login require a valid JWT token sent in the `Authorization` header.
- `.env` is excluded from version control via `.gitignore`.
