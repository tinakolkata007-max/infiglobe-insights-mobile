# Infiglobe Insights App

This repository contains a starter project for an Infiglobe Insights mobile application using:

- React Native CLI
- Node.js + Express
- MySQL
- Redux Toolkit
- JWT-based authentication

## Project structure

```bash
.
├── backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
├── database/
│   └── schema.sql
├── mobile/
│   ├── app.json
│   ├── index.js
│   └── src/
│       ├── config/
│       ├── navigation/
│       ├── screens/
│       ├── services/
│       └── store/
└── README.md
```

## Quick start

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile app

```bash
cd mobile
npm install
npx react-native run-android
```

## Features included

- Login / register flow
- OTP verification flow
- KYC landing screen
- Dashboard
- Research module
- Education module
- Profile screen
- Express API starter

## Next steps

- Connect MySQL database
- Add real KYC integration
- Add payment gateway integration
- Add research and education API endpoints
- Add admin approval workflow
