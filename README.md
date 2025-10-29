# SmartLMS - Learning Management System

A full-stack Learning Management System built with React, Node.js, MongoDB, and Stripe payment integration.

## 🚀 Features

- User authentication (Register/Login)
- Course browsing and enrollment
- Shopping cart functionality
- Stripe payment integration
- My Learning dashboard
- Responsive design with Bootstrap

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux Toolkit
- React Router DOM
- Bootstrap 5
- Stripe React
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Processing
- bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your configurations:
```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

5. Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your configurations:
```env
VITE_PUBLIC_STRIPE_KEY=your_stripe_public_key
VITE_API_URL=http://13.61.151.128:3000
```

5. Start the frontend development server:
```bash
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
- `DB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STRIPE_SECRET_KEY` - Stripe secret key
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode

### Frontend (.env)
- `VITE_PUBLIC_STRIPE_KEY` - Stripe publishable key
- `VITE_API_URL` - Backend API URL (Production: http://13.61.151.128:3000)
- `VITE_APP_NAME` - Application name

## 📱 Usage

1. **Register/Login** - Create an account or login
2. **Browse Courses** - View available courses
3. **Add to Cart** - Add courses to shopping cart
4. **Checkout** - Complete purchase with Stripe
5. **My Learning** - Access purchased courses

## 🔐 API Endpoints

### Auth Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user

### Course Routes (`/api/courses`)
- `GET /` - Get all courses
- `GET /:id` - Get course by ID
- `GET /my-courses` - Get user's enrolled courses

### Cart Routes (`/api/cart`)
- `GET /` - Get user's cart
- `POST /:courseId` - Add course to cart
- `PUT /:courseId` - Update cart item
- `DELETE /:courseId` - Remove from cart

### Payment Routes (`/api/payment`)
- `POST /create-payment-intent` - Create Stripe payment intent

## 🚀 Deployment

### Production Deployment (AWS)

**Live Application:** http://13.61.151.128

**Backend Deployment (Port 3000):**
1. SSH into AWS EC2 instance: `ssh -i your-key.pem ubuntu@13.61.151.128`
2. Clone repository and install dependencies
3. Create production `.env` file with:
   ```env
   NODE_ENV=production
   PORT=3000
   DB_URL=your_mongodb_atlas_connection
   JWT_SECRET=your_production_jwt_secret
   STRIPE_SECRET_KEY=your_production_stripe_key
   FRONTEND_URL=http://13.61.151.128
   ```
4. Start backend: `npm start`

**Frontend Deployment (Port 80/443):**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to web server
3. Configure with production API URL: `http://13.61.151.128:3000`

**Required AWS Security Group Ports:**
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS) 
- Port 3000 (Backend API)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - [Your GitHub Profile]

## 🔗 Links

- [Live Demo](http://13.61.151.128)
- [Backend API](http://13.61.151.128:3000)
- [Project Repository](https://github.com/sagar-nautiyal/smartLMS)