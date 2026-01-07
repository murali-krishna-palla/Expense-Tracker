# Expense Tracker Backend

A Node.js/Express-based backend API for managing personal expenses with user authentication and data persistence using MongoDB.

## Features

- User authentication with JWT (JSON Web Tokens)
- Secure password hashing with bcryptjs
- CRUD operations for expense tracking
- MongoDB integration for data persistence
- CORS enabled for cross-origin requests
- Environment variable configuration for secure credential management

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Development Tools:** Nodemon

## Prerequisites

- Node.js (v14 or higher)
- MongoDB account (for connection URI)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/murali-krishna-palla/Expense-Tracker.git
cd expense-tracker-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:9000` (or the PORT specified in `.env`)

## Project Structure

```
expense-tracker-backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── expenseController.js # Expense management logic
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
├── models/
│   ├── User.js           # User schema
│   └── Expense.js        # Expense schema
├── routes/
│   ├── authRoutes.js     # Authentication endpoints
│   └── expenseRoutes.js  # Expense endpoints
├── server.js             # Main application file
├── package.json          # Dependencies and scripts
└── .env                  # Environment variables (not committed to git)
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT token

### Expense Routes
- `GET /api/expenses` - Get all expenses (requires authentication)
- `POST /api/expenses` - Create a new expense (requires authentication)
- `PUT /api/expenses/:id` - Update an expense (requires authentication)
- `DELETE /api/expenses/:id` - Delete an expense (requires authentication)

## Security Notes

- **Never commit `.env` file to version control** - Add sensitive API keys and credentials only in your local `.env` file
- JWT tokens are used for stateless authentication
- Passwords are hashed using bcryptjs before storing in the database
- CORS is configured for secure cross-origin requests

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 9000) |
| `MONGO_URI` | MongoDB connection string with credentials |
| `JWT_SECRET` | Secret key for JWT token generation |

## Dependencies

### Production
- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-Origin Resource Sharing

### Development
- **nodemon** - Auto-reload during development

## License

ISC

## Author

Murali Krishna Palla

## Support

For issues and questions, please open an issue on the GitHub repository.
