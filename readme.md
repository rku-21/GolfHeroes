# ⛳ Golf Heroes

Golf Heroes is a full-stack web application that combines golf score tracking, subscription-based participation, monthly prize draws, and charitable giving into a single platform.

Users can subscribe to plans, track their golf scores, participate in monthly draws, support charities, and view their performance through a personalized dashboard.

---

## Features

### Authentication

* User Registration
* User Login
* Protected Routes using JWT Authentication
* Persistent User Sessions

### Dashboard

* View Current Subscription
* View Selected Charity
* Latest Score Statistics
* Average Score Tracking
* Total Draws Played
* Total Winnings
* Total Donations

### Subscription Management

* Monthly Plan
* Yearly Plan
* Subscription Status Tracking
* Razorpay Payment Integration

### Charity Support

* Browse Available Charities
* Select Preferred Charity
* Track Donation Contributions
* Charity Percentage Management

### Golf Score Tracking

* Upload Golf Scores
* View Score History
* Track Average Performance
* Recent Score Analytics

### Draw System

* Monthly Prize Draws
* Winner Management
* Prize Tracking
* Draw History

### Profile Management

* View User Profile
* Update Profile Image
* Membership Information
* Account Details

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Zustand
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer

### Payments

* Razorpay

---

## Project Structure

```bash
Golf_Heroes/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── store/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── lib/
│   └── seed/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Golf_Heroes
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Backend `.env`

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Frontend `.env`

```env
VITE_RAZORPAY_API_KEY=your_razorpay_key
```

---

## Seed Database

```bash
node seed/seed.js
```

This will create:

* Demo Users
* Subscription Plans
* Charities
* Golf Scores
* Draw Results
* Winners

---

## Future Improvements

* Automated Winner Selection
* Email Notifications
* Admin Dashboard
* Advanced Analytics
* Mobile Responsive Enhancements
* Production Payment Verification
* Real-time Notifications

---

## Demo Credentials

```text
Email: rahul@gmail.com
Password: password123
```

---

## Author

Rahul Kumar Upadhyay

Built as part of a full-stack web development project demonstrating authentication, payment integration, dashboard analytics, charity management, and subscription workflows.
