# financial-manager

A modern Full Stack Personal Finance Manager built using the **MERN Stack**. MoneyTrack helps users track their income and expenses, monitor their financial balance, and manage transactions through a clean and intuitive interface.

---

## 📖 Overview

MoneyTrack is designed to provide users with a simple and organized way to manage their personal finances. Users can create an account, securely log in, record income and expenses, and view their financial summary based on different time periods.

The application focuses on simplicity, performance, and a modern user experience while demonstrating the core concepts of full-stack web development.

---

## ✨ Features

### 👤 User Authentication
- User Registration
- Secure Login
- Password Hashing
- JWT Authentication
- Protected Routes

---

### 📊 Dashboard

- Display user's name
- Total Balance
- Total Income
- Total Expense

#### Time Filter

View financial summary for:

- All Time
- Monthly
- Yearly

The dashboard updates automatically whenever the selected filter changes.

---

### 💵 Transactions

Manage all financial transactions.

Each transaction contains:

- Date
- Category
- Description
- Type (Income / Expense)
- Amount

---

### ➕ Add Transactions

Users can:

- Add Income
- Add Expense

---

### ✏️ Edit Transactions

Users can edit:

- Amount
- Category
- Description
- Date
- Transaction Type

---

### 🗑 Delete Transactions

Delete unwanted transactions with confirmation.

---

### 🔍 Transaction Filters

Filter transactions by:

- Type
  - All
  - Income
  - Expense

- Category
  - All Categories

---

### 📄 Pagination

Transactions are displayed page by page for better performance and user experience.

---

### 👤 Profile

- View Profile Information
- Edit Name
- Change Password
- Logout

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

---

## 📂 Project Structure

```
financial-manager
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

## 🚀 Pages

### Register

Create a new account.

---

### Login

Secure user authentication.

---

### Dashboard

Displays:

- User Name
- Balance
- Income
- Expense

Allows:

- Add Income
- Add Expense

Shows recent transactions.

---

### Transactions

View all transactions.

Supports:

- Filter by Type
- Filter by Category
- Pagination
- Edit
- Delete

---

### Profile

Manage account information.

---

## 🗄 Database Schema

### User

```
Name
Email
Password (Hashed)
Created At
Updated At
```

### Transaction

```
User ID
Type
Category
Description
Amount
Date
Created At
Updated At
```

---

## 🔒 Security

- Password hashing using bcrypt
- JWT Authentication
- Protected API Routes
- User-specific transaction access

---

## 🎯 Future Improvements

- Search Transactions
- Date Range Filter
- Charts & Analytics
- Export to PDF
- CSV Export
- Dark Mode
- Email Verification
- Forgot Password
- Profile Picture
- Google Authentication
- Two-Factor Authentication (2FA)
- Custom Categories
- Budget Planning
- Savings Goals
- Recurring Transactions
- Multi-Currency Support

---

## 📸 Screenshots

> Add screenshots here after completing the UI.

- Register
- Login
- Dashboard
- Transactions
- Profile

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/MoneyTrack.git
```

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## 📌 Learning Objectives

This project demonstrates:

- Full Stack Web Development
- REST API Development
- Authentication & Authorization
- MongoDB Database Design
- CRUD Operations
- React State Management
- API Integration
- Pagination
- Protected Routes
- Responsive UI Design

---

## 👨‍💻 Author

**Mayanglambam Thoungamba Meitei**

Built as a full-stack portfolio project to practice MERN Stack development and modern web application architecture.

---

## 📄 License

This project is open source and available under the **MIT License**.
