# Finora — Personal Finance Manager

A full-stack expense tracking application built with **React** and **Node.js/Express**, featuring luxury themed UI, real-time analytics, and secure authentication.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

### Authentication & Security
- **JWT-based authentication** with 7-day token expiry
- **Secure password hashing** using bcryptjs
- **Forgot Password** flow with 6-digit OTP verification
- **Change Password** with old password verification
- **Delete Account** with password confirmation & cascade data deletion

### Expense Management
- **Add / Edit / Delete** income & expense transactions
- **Category-based tracking** — Food, Transport, Shopping, Bills, Health, Education, Entertainment, Salary, Freelance, and more
- **Search & Filter** by type (income/expense), category, and keyword
- **Paginated transaction list** with responsive design

### Analytics Dashboard
- **Pie chart** breakdown of spending by category
- **Bar chart** for monthly income vs expense comparison
- **Category progress bars** with percentage breakdown
- **Summary cards** for total income, expenses, and balance

### Luxury Theme System
- **4 premium themes** with full UI integration:
  - 🟣 **Royal Amethyst** — Purple & gold luxury palette
  - ⚫ **Midnight Noir** — Dark mode with silver accents
  - 🟢 **Emerald Estate** — Green & gold sophistication
  - 🌹 **Rose Gold Luxe** — Pink & warm gold elegance
- **Persistent theme selection** via localStorage
- **Appearance settings** page with live previews

### Settings Hub
- **Profile overview** with account details
- **Appearance** customization
- **Change Password** page
- **Delete Account** with confirmation modal

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Chart.js + react-chartjs-2 | Analytics charts |
| Lucide React | Icon library |
| React Hot Toast | Toast notifications |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| dotenv | Environment configuration |
| CORS | Cross-origin support |

---

## 📁 Project Structure

```
expense-tracker/
├── expense-tracker-backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── analyticsController.js # Analytics aggregation
│   │   ├── authController.js      # Auth, forgot/reset password, delete account
│   │   └── expenseController.js   # CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT auth guard
│   ├── models/
│   │   ├── Expense.js             # Expense schema
│   │   └── User.js                # User schema with OTP fields
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── server.js                  # Express app entry
│   └── package.json
│
├── expense-tracker-frontend/
│   ├── public/
│   │   └── finora.svg             # Custom favicon
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js             # Axios instance
│   │   ├── components/
│   │   │   ├── Layout.jsx         # Page wrapper with sidebar offset
│   │   │   └── Navbar.jsx         # Sidebar navigation
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Auth state management
│   │   │   └── ThemeContext.jsx    # Theme system with 4 palettes
│   │   ├── pages/
│   │   │   ├── AddExpense.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Appearance.jsx     # Theme picker
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditExpense.jsx
│   │   │   ├── ForgotPassword.jsx # OTP-based password reset
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx        # Settings hub
│   │   │   └── Register.jsx
│   │   ├── App.jsx                # Route definitions
│   │   ├── index.css              # Global styles & animations
│   │   └── main.jsx               # App entry with ThemeProvider
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/murali-krishna-palla/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Setup Backend

```bash
cd expense-tracker-backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd expense-tracker-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get token | No |
| POST | `/api/auth/forgot-password` | Request OTP for password reset | No |
| POST | `/api/auth/reset-password` | Verify OTP & set new password | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| DELETE | `/api/auth/delete-account` | Delete account & all data | Yes |

### Expenses
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/expenses` | Get all user expenses | Yes |
| POST | `/api/expenses` | Create new expense | Yes |
| PUT | `/api/expenses/:id` | Update an expense | Yes |
| DELETE | `/api/expenses/:id` | Delete an expense | Yes |

### Analytics
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/analytics/summary` | Get income/expense summary | Yes |
| GET | `/api/analytics/category` | Get category-wise breakdown | Yes |
| GET | `/api/analytics/monthly` | Get monthly trends | Yes |

---

## 🎨 Theme Previews

| Royal Amethyst | Midnight Noir | Emerald Estate | Rose Gold Luxe |
|---|---|---|---|
| Purple gradients with gold accents | Dark mode with silver tones | Green & gold palette | Pink & warm gold |

---

## 📝 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend server port | `9000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
