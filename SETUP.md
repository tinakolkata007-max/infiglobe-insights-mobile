# SETUP GUIDE - Infiglobe Insights Mobile App

## Prerequisites

- Node.js 16+ and npm
- Android Studio or Xcode (for React Native)
- MySQL 8.0+
- Git

## Backend Setup

### 1. Database Setup

```bash
mysql -u root -p < database/schema.sql
```

### 2. Install dependencies

```bash
cd backend
npm install
```

### 3. Create .env file

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=infiglobe_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=3000
NODE_ENV=development
```

### 4. Start backend

```bash
npm run dev
```

Server will run on `http://localhost:3000`

## Mobile App Setup

### 1. Install dependencies

```bash
cd mobile
npm install
```

### 2. Update API URL in config

Edit `mobile/src/config/constants.js`:

```javascript
export const API_URL = __DEV__ ? 'http://10.0.2.2:3000/api' : 'https://api.infiglobe.com/api';
```

### 3. Run on Android

```bash
npx react-native run-android
```

### 4. Run on iOS

```bash
npx react-native run-ios
```

## Project Structure

### Backend

```
backend/
├── server.js                    # Main server file
├── package.json
├── .env.example
└── src/
    ├── config/
    │   └── db.js               # Database connection
    ├── models/
    │   ├── User.js
    │   ├── KYCRecord.js
    │   ├── SubscriptionPlan.js
    │   ├── UserSubscription.js
    │   ├── ResearchItem.js
    │   ├── EducationCourse.js
    │   ├── UserProgress.js
    │   └── AuditLog.js
    ├── middleware/
    │   └── authMiddleware.js
    └── routes/
        ├── authRoutes.js
        ├── kycRoutes.js
        ├── subscriptionRoutes.js
        ├── researchRoutes.js
        └── educationRoutes.js
```

### Mobile

```
mobile/
├── index.js
├── app.json
└── src/
    ├── App.js
    ├── config/
    │   └── constants.js
    ├── navigation/
    │   └── MainNavigator.js
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.js
    │   │   ├── RegisterScreen.js
    │   │   ├── OTPScreen.js
    │   │   └── KYCScreen.js
    │   ├── app/
    │   │   ├── DashboardScreen.js
    │   │   ├── ResearchScreen.js
    │   │   ├── EducationScreen.js
    │   │   └── ProfileScreen.js
    │   └── research/
    │       └── IntraDayScreen.js
    ├── services/
    │   ├── authService.js
    │   ├── apiClient.js
    │   ├── researchService.js
    │   └── educationService.js
    └── store/
        ├── index.js
        └── slices/
            ├── authSlice.js
            ├── userSlice.js
            ├── researchSlice.js
            └── educationSlice.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP

### KYC

- `GET /api/kyc/status` - Get KYC status
- `POST /api/kyc/submit` - Submit KYC
- `POST /api/kyc/approve/:kycId` - Approve KYC (admin only)

### Subscriptions

- `GET /api/subscriptions/plans` - Get all plans
- `GET /api/subscriptions/my-subscriptions` - Get user subscriptions
- `POST /api/subscriptions/initiate-payment` - Initiate payment
- `POST /api/subscriptions/verify-payment` - Verify payment

### Research

- `GET /api/research/intraday` - Get intraday research
- `GET /api/research/swing` - Get swing research
- `GET /api/research/investment` - Get investment research
- `POST /api/research/create` - Create research (researcher only)
- `POST /api/research/submit-approval/:id` - Submit for approval
- `POST /api/research/approve/:id` - Approve research (approver only)
- `POST /api/research/publish/:id` - Publish research

### Education

- `GET /api/education/courses` - Get all courses
- `GET /api/education/courses/:id` - Get course details
- `POST /api/education/enroll` - Enroll in course
- `GET /api/education/progress` - Get learning progress
- `POST /api/education/update-progress/:progressId` - Update progress

## Deployment

### Backend (Node.js + Express)

- Use Railway, Heroku, or AWS for deployment
- Update `.env` with production database credentials
- Set `NODE_ENV=production`

### Mobile App

- Use Expo (dev) or EAS Build (production)
- For Android: `eas build --platform android`
- For iOS: `eas build --platform ios`

## Support

For issues or questions, create an issue in the GitHub repository.
