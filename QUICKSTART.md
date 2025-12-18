# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Default Login Credentials

- **Super Admin**
  - Email: `admin@college.edu`
  - Password: `admin123`

- **Staff**
  - Email: `staff@college.edu`
  - Password: `staff123`

- **Student**
  - Email: `student@college.edu`
  - Password: `student123`

## Features Overview

### Core Modules

1. **Dashboard** - Overview with statistics and charts
2. **Admissions** - Manage student applications and admission process
3. **Students** - Student directory and management
4. **Attendance** - Track and manage student attendance
5. **Examinations** - Schedule and manage exams
6. **Results** - View and manage exam results
7. **Fee Management** - Handle fee structures and payments
8. **Library** - Book inventory and issue management
9. **Inventory** - Store and inventory management
10. **Transport** - Transport routes and student assignments
11. **HR Management** - Staff directory and payroll
12. **Reports** - Analytics and report generation
13. **Settings** - System configuration

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Layout.tsx
│   └── ProtectedRoute.tsx
├── contexts/      # React contexts
│   └── AuthContext.tsx
├── pages/         # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── ... (other pages)
├── types/         # TypeScript definitions
│   └── index.ts
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Recharts** - Charts and analytics
- **Vite** - Build tool

## Next Steps

1. Connect to a backend API (replace mock data)
2. Implement real authentication with JWT tokens
3. Add database integration
4. Implement file uploads for documents
5. Add payment gateway integration
6. Set up email/SMS notifications
7. Add more advanced reporting features


