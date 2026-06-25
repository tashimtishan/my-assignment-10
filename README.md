 📚 Fable – Ebook Sharing Platform

 🌐 Live Website

**Live URL:** https://your-live-site-url.vercel.app

 📖 Project Overview

Fable is a modern Ebook Sharing Platform that connects readers with talented writers. The platform allows users to discover, purchase, bookmark, and read original ebooks, while writers can publish and manage their creations after completing a verification payment. Administrators oversee users, ebooks, transactions, and platform analytics through a dedicated dashboard.

The project demonstrates advanced full-stack web development concepts including authentication, role-based authorization, payment integration, dashboard management, analytics, and responsive UI design.

---

 🎯 Purpose

The goal of Fable is to create a digital ecosystem where:

* Readers can discover and enjoy quality ebooks.
* Writers can publish and monetize their work.
* Administrators can efficiently manage the platform.
* Secure online payments enable ebook purchases.
* Modern web technologies provide a seamless user experience.

---

 Key Features

 Authentication & Authorization

* Email and Password Authentication
* Google Authentication using BetterAuth
* JWT-based Authorization
* Protected Routes
* Role-Based Access Control (User, Writer, Admin)

Reader Features

* Browse all available ebooks
* Search ebooks by title
* Filter by genre, availability, and price range
* Sort by newest and price
* View ebook details
* Purchase ebooks via Stripe
* Bookmark favorite ebooks
* View purchase history
* Access purchased ebooks
* Profile management

Writer Features

* Upload ebooks
* Edit ebook information
* Delete ebooks
* Publish/Unpublish ebooks
* Manage personal ebook collection
* View sales history
* Track ebook performance
* Bookmark ebooks



* Manage all users
* Change user roles
* Delete users
* Manage all ebooks
* Publish/Unpublish ebooks
* Delete ebooks
* Monitor all transactions
* View platform analytics
* Revenue tracking dashboard


* Total Users
* Total Writers
* Total Ebooks Sold
* Total Revenue
* Monthly Sales Chart
* Ebook Genre Distribution Chart



* Stripe Checkout Integration
* Ebook Purchase System
* Writer Verification Payment
* Transaction History Tracking
* Secure Payment Processing



* Image Upload with imgBB
* Ebook Cover Management
* Profile Picture Support


* Fully Responsive Design
* Modern Dashboard Interface
* Framer Motion Animations
* Skeleton Loading States
* Global Loading Spinner
* Custom 404 Error Page
* Error Boundary Support
* Active Navigation Highlighting
* Mobile-Friendly Navigation



* Dark Mode Toggle
* Wishlist System
* Email Notification Simulation

---

 Main Pages

 Public Pages

* Home Page
* Browse Ebooks
* Ebook Details
* Login
* Register
* 404 Error Page

 User Dashboard

* Purchase History
* Purchased Ebooks
* Bookmarks
* Profile

### Writer Dashboard

* Manage Ebooks
* Add Ebook
* Edit Ebook
* Sales History
* Bookmarks

### Admin Dashboard

* Manage Users
* Manage All Ebooks
* Transactions
* Analytics Overview

---

##  Technology Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* HeroUI
* Framer Motion
* Axios
* React Hook Form
* React Icons
* Next Themes

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* BetterAuth

### Payment & Media

* Stripe
* imgBB

---

##  NPM Packages Used

### Frontend Packages

```bash
next
react
react-dom
tailwindcss
@heroui/react
framer-motion
axios
react-hook-form
react-icons
next-themes
sonner
```

### Backend Packages

```bash
express
mongodb
jsonwebtoken
cors
dotenv
stripe
better-auth
bcryptjs
cookie-parser
```

---

##  Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BETTER_AUTH_URL=
```

### Backend (.env)

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
IMGBB_API_KEY=
BETTER_AUTH_SECRET=
CLIENT_URL=
```

---

##  Installation & Setup

### Clone Repositories

```bash
git clone <client-repository-url>
git clone <server-repository-url>
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## 👨 Admin Credentials

### Admin Login

```text
Email: admin@fable.com
Password: Admin@123
```

---

##  Project Links

### Client Repository

https://github.com/your-username/fable-client

### Server Repository

https://github.com/your-username/fable-server

### Live Website

https://your-live-site-url.vercel.app

---

##  Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

##  Security Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Environment Variable Protection
* Secure MongoDB Credentials
* Secure Stripe Transactions
* Input Validation
* Error Handling Middleware

---

##  Future Improvements

* Ebook Reviews & Ratings
* Reading Progress Tracking
* Personalized Recommendations
* Real-Time Notifications
* Advanced Analytics
* Social Sharing Features

---

##  Developed By

Tashim Tishan

A full-stack MERN application built for the Programming Hero Assignment 12 (Fable – Ebook Sharing Platform).
