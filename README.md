# 🩸 Blood Donation Application - Frontend

> A modern, responsive React application for managing blood donations & connecting donors with recipients

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.18-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 🌐 Live Demo

- **Client URL**: [BLOOD DONOR](https://ph-a11-blood-bank-client.vercel.app/)
- **API Documentation**: [Server Repo](https://github.com/Taoshif1/PH-A11-BloodBank-Server)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [User Roles & Permissions](#user-roles--permissions)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Blood Donation Client is a full-featured React application that enables users to:
- **Register** as blood donors with profile information
- **Create** blood donation requests for those in need
- **Search** for available donors by blood type and location
- **Manage** donation requests through a comprehensive dashboard
- **Contribute** financially to support the organization
- **Track** donation statuses in real-time

---

## ✨ Features

### 🔐 Authentication & Authorization
- Email/password registration and login
- JWT-based session management
- Role-based access control (Admin, Volunteer, Donor)
- Protected routes with automatic redirects
- Persistent login sessions

### 👤 User Management
- Comprehensive user profiles with avatar uploads
- Editable profile information
- Blood group and location tracking
- User status management (active/blocked)

### 🩸 Donation Request System
- Create detailed donation requests
- Real-time status updates (Pending → In Progress → Done/Canceled)
- Filter and search functionality
- Pagination for large datasets
- Donor matching and notification

### 🔍 Donor Search
- Advanced search by blood group
- Location-based filtering (District & Upazila)
- Active donor status display
- Responsive grid layout

### 💰 Funding System
- Stripe payment integration
- Secure card processing
- Transaction history
- Total funding visualization

### 📊 Dashboard Features
- **Donor Dashboard**: View recent requests, create new requests, manage submissions
- **Admin Dashboard**: User management, statistics, full request oversight
- **Volunteer Dashboard**: Request management, status updates

### 🎨 UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Modern gradient designs and animations
- Framer Motion animations
- DaisyUI components with Tailwind CSS
- Real-time scrolling ticker for urgent requests
- Toast notifications for user feedback
- Loading states and error handling

---

## 🛠 Tech Stack

### Core
- **React** 19.2.0 - UI library
- **React DOM** 19.2.0 - React rendering
- **React Router DOM** 7.10.1 - Client-side routing
- **Vite** 7.2.4 - Build tool and dev server

### Styling
- **TailwindCSS** 3.4.18 - Utility-first CSS
- **DaisyUI** 5.5.8 - Tailwind component library
- **Framer Motion** 12.23.25 - Animation library
- **Autoprefixer** 10.4.22 - CSS vendor prefixing
- **PostCSS** 8.5.6 - CSS transformations

### State & Data Management
- **React Hook Form** 7.68.0 - Form handling
- **TanStack Query** 5.90.12 - Server state management
- **Axios** 1.13.2 - Promise Based HTTP client

### Payment & Storage
- **Stripe React** 5.4.1 - Payment processing
- **Firebase** 12.6.0 - Authentication & storage

### Authentication & Storage
- **Firebase** 12.6.0 - Authentication & cloud services
- **LocalForage** 1.10.0 - Offline storage

### UI Components & Icons
- **React Icons** 5.5.0 - Icon library
- **SweetAlert2** 11.26.4 - Beautiful alerts
- **React Hot Toast** 2.6.0 - Toast notifications
- **React Helmet** 6.1.0 - Head management

### Data Handling

- **Match Sorter** 8.2.0 - Simple string matching/sorting
- **Sort By** 1.2.0 - Array sorting utility

## Development Tools

- **ESLint** 9.39.1 - Code linting
- **@vitejs/plugin-react** 5.1.1 - Vite React plugin
- **Globals** 16.5.0 - Global variables for ESLint

---

## 📁 Project Structure

```
bloodDon-client/
│
├── dist/               # Production build files
├── node_modules/       # Project dependencies
├── public/             # Public assets
│
├── src/
│ ├── assets/           # Images & static assets
│
│ ├── components/       # Reusable UI components
│ │ ├── Navbar/
│ │ │ ├── Navbar.jsx
│ │ │ └── Navbar.css
│ │ ├── Banner.jsx
│ │ ├── Contact.jsx
│ │ ├── Features.jsx
│ │ ├── Footer.jsx
│ │ ├── PrivateRoute.jsx
│ │ └── Ticker.jsx
│ 
│ ├── context/          # Global state management
│ │ └── AuthContext.jsx
│
│ ├── firebase/         # Firebase configuration
│ │ └── firebase.config.js
│
│ ├── hooks/            # Custom React hooks
│ │ └── useAuth.js
│
│ ├── layouts/          # Layout wrappers
│ │ └── MainLayout.jsx
│
│ ├── pages/            # Application pages
│ │ ├── dashboard/
│ │ │ ├── AllBloodDonationRequests.jsx
│ │ │ ├── AllUsers.jsx
│ │ │ ├── CreateDonationRequest.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── DashboardLayout.jsx
│ │ │ ├── MyDonationRequests.jsx
│ │ │ └── Profile.jsx
│ │ │
│ │ ├── AboutUs.jsx
│ │ ├── DonationDetails.jsx
│ │ ├── DonationRequests.jsx
│ │ ├── Funding.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── SearchDonors.jsx
│
│ ├── routes/
│ │ └── Routes.jsx       # App routing configuration
│
│ ├── utils/
│ │ ├── axiosInstance.js # Axios base configuration
│ │ ├── districts.json
│ │ ├── divisions.json
│ │ ├── unions.json
│ │ ├── upazilas.json
│ │ └── geoData.js
│
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── index.css
│
├── .env.local           # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager
- **Git**: Version control
- **Firebase Account**: For authentication ([Get Started](https://firebase.google.com/))
- **ImgBB Account**: For image hosting ([Sign Up](https://imgbb.com/))
- **Stripe Account**: For payments ([Sign Up](https://stripe.com/))

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blooddon-client.git
cd blooddon-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration (see [Environment Variables](#environment-variables) section).

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# =============================================
# API Configuration
# =============================================
# Backend API URL
# Development: http://localhost:5000/api
# Production: https://your-api.vercel.app/api
VITE_API_URL=http://localhost:5000/api

# =============================================
# Firebase Configuration
# =============================================
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your-project.firebaseapp.com
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-project.appspot.com
VITE_MESSAGINGSENDERID=123456789012
VITE_APPID=1:123456789012:web:abcdef123456
VITE_MEASUREMENTID=G-XXXXXXXXXX

# =============================================
# Image Upload (ImgBB)
# =============================================
VITE_IMGBB_API_KEY=your_imgbb_api_key

# =============================================
# Payment (Stripe)
# =============================================
# Test Mode: pk_test_xxxxx
# Live Mode: pk_live_xxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Getting Your Keys

#### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings → General
4. Scroll to "Your apps" → Web app
5. Copy the configuration values

#### ImgBB API Key
1. Go to [ImgBB](https://imgbb.com/)
2. Sign up / Log in
3. Go to [API page](https://api.imgbb.com/)
4. Copy your API key

#### Stripe Publishable Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API Keys
3. Copy the Publishable key (starts with `pk_test_` or `pk_live_`)

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

Application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## 👥 User Roles & Permissions

### 🩸 Donor (Default Role)
**Permissions:**
- Create donation requests
- View own donation requests
- Edit/delete own requests
- Update request status (done/cancel when in progress)
- Search for other donors
- View public donation requests
- Make financial contributions
- Update own profile

**Dashboard Access:**
- Dashboard home with recent requests
- Profile management
- Create donation request
- My donation requests

### 🤝 Volunteer
**Permissions:**
- View all donation requests
- Update any request status
- Search for donors
- View statistics
- Make financial contributions

**Dashboard Access:**
- Dashboard home with statistics
- Profile management
- All blood donation requests

### 👑 Admin
**Permissions:**
- **All Volunteer permissions, plus:**
- View all users
- Block/unblock users
- Change user roles
- Delete any donation request
- Full system oversight

**Dashboard Access:**
- Dashboard home with full statistics
- Profile management
- All users management
- All blood donation requests

---

## 🗺️ Pages & Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with banner, features, contact |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |
| `/about-us` | About Us | Mission and vision |
| `/donation-requests` | Donation Requests | List of pending requests |
| `/search-donors` | Search Donors | Search for available donors |
| `/contact` | Contact | Contact form |

### Protected Routes (Requires Login)

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/donation-requests/:id` | Donation Details | All | View request details, donate |
| `/funding` | Funding | All | View funding history, contribute |

### Dashboard Routes (Protected)

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/dashboard` | Dashboard Home | All | Role-specific dashboard |
| `/dashboard/profile` | Profile | All | View/edit user profile |
| `/dashboard/create-donation-request` | Create Request | Donor | Create new donation request |
| `/dashboard/my-donation-requests` | My Requests | Donor | Manage own requests |
| `/dashboard/all-users` | All Users | Admin | User management |
| `/dashboard/all-blood-donation-request` | All Requests | Admin, Volunteer | Manage all requests |

---

## 🧩 Components

### Core Components

#### `AuthContext.jsx`
- Manages authentication state
- Provides auth functions (login, register, logout)
- Handles user data fetching
- JWT session management

#### `PrivateRoute.jsx`
- Protects authenticated routes
- Redirects to login if not authenticated
- Preserves intended destination

#### `axiosInstance.js`
- Centralized API configuration
- Automatic credential handling
- Error interceptors
- Request/response logging

### Layout Components

#### `MainLayout.jsx`
- Main application wrapper
- Includes Navbar and Footer
- Outlet for page content

#### `DashboardLayout.jsx`
- Dashboard wrapper with sidebar
- Role-based navigation
- Responsive mobile menu

### UI Components

#### `Navbar`
- Responsive navigation
- User profile dropdown
- Mobile menu
- Role-based links

#### `Ticker.jsx`
- Auto-scrolling urgent requests
- Pause on hover
- Seamless loop animation

#### `Banner.jsx`
- Hero section with CTA
- Gradient background
- Responsive design

#### `Footer.jsx`
- Site links
- Social media icons
- Copyright information

---

## 🔌 API Integration

### API Client Setup

All API calls use `axiosInstance` for consistent configuration:

```javascript
import axiosInstance from '../utils/axiosInstance';

// GET request
const response = await axiosInstance.get('/users/profile');

// POST request
const response = await axiosInstance.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
});

// PATCH request
await axiosInstance.patch('/users/profile', profileData);

// DELETE request
await axiosInstance.delete(`/donation-requests/${id}`);
```

### Authentication Flow

1. **Register**: User fills registration form → Image uploaded to ImgBB → User created on backend → JWT cookie set
2. **Login**: Credentials sent to backend → JWT cookie set → User data fetched → Redirect to dashboard
3. **Logout**: Logout API called → Cookie cleared → Redirect to home
4. **Session Check**: On app load → `/auth/me` called → User data populated or cleared

### Data Flow Example

```javascript
// 1. Component mounts
useEffect(() => {
  fetchDonationRequests();
}, []);

// 2. API call through axiosInstance
const fetchDonationRequests = async () => {
  try {
    const response = await axiosInstance.get('/donation-requests/pending');
    setRequests(response.data);
  } catch (error) {
    toast.error('Failed to fetch requests');
  }
};

// 3. Display data
{requests.map(request => (
  <RequestCard key={request._id} data={request} />
))}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login

```bash
vercel login
```

#### 3. Deploy

```bash
vercel --prod
```

#### 4. Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add all variables from `.env.local`.

#### 5. Configure Firebase

Add your Vercel domain to Firebase:
- Firebase Console → Authentication → Settings
- Add domain to authorized domains

### Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard

### Deploy to GitHub Pages

```bash
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🧪 Testing

### Test User Credentials

Use these credentials to test different roles:

**Admin:**
- Email: `admmin@gmail.com`
- Password: `admin123`

**Volunteer:**
- Email: `a@gmail.com.com`
- Password: `tasu123`

**Donor:**
- Email: `john@example.com`
- Password: `password123`

### Test Stripe Payments

Use these test card numbers:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Decline |
| `4000 0025 0000 3155` | Requires authentication |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login/logout works
- [ ] Profile update with image upload
- [ ] Create donation request (blocked users cannot)
- [ ] View and filter donation requests
- [ ] Search donors by criteria
- [ ] Donate to a request (status changes)
- [ ] Mark request as done/canceled
- [ ] Payment with test card succeeds
- [ ] Admin can manage users
- [ ] Admin can block/unblock users
- [ ] Admin can change roles
- [ ] Volunteer can update request status
- [ ] Mobile responsive design
- [ ] Protected routes redirect properly

---

## 🎨 Customization

### Theming

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ef4444',     // Change primary color
        secondary: '#ec4899',
      }
    }
  },
  daisyui: {
    themes: ["light"],         // Add more themes
  }
}
```

### Modify Geo Data

Update location data in `src/utils/`:
- `districts.json` - Add/remove districts
- `upazilas.json` - Add/remove upazilas
- `divisions.json` - Add/remove divisions

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** 
- Check `VITE_API_URL` in `.env.local`
- Verify server CORS settings allow your origin
- Use local server during development

### Issue: Authentication Not Persisting
**Solution:**
- Check cookies in browser DevTools
- Verify `withCredentials: true` in axios config
- Clear browser cookies and try again

### Issue: Images Not Uploading
**Solution:**
- Verify `VITE_IMGBB_API_KEY` is correct
- Check file size (ImgBB has limits)
- Ensure file format is supported (JPG, PNG)

### Issue: Payment Not Working
**Solution:**
- Use test card numbers provided above
- Check Stripe publishable key is correct
- Verify in test mode (not live mode)

### Issue: Build Fails
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Learn More

### Documentation Links
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Tutorials
- [React Hook Form](https://react-hook-form.com/get-started)
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages
- Add comments for complex logic

---

## 👥 Authors

- **Gazi Taoshif** - *Full Stack Developer*
---

## 🙏 Acknowledgments

- DaisyUI for beautiful UI components
- Framer Motion for smooth animations
- Stripe for payment processing
- ImgBB for image hosting
- Firebase for authentication
- Vercel for deployment
- All contributors and supporters

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Fixing all the bugs
- [ ] Email notifications for urgent requests
- [ ] SMS alerts for matched donors
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Blood donation history tracking
- [ ] Donation reminders
- [ ] Certificate generation for donors

---

## 📊 Project Statistics

- **Total Components**: 25+
- **Total Pages**: 15+
- **API Endpoints Used**: 20+
- **Supported Blood Groups**: 8 (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Districts Covered**: 64 (Bangladesh)
- **User Roles**: 3 (Admin, Volunteer, Donor)

---

**Made with ❤️ to save lives** 🩸

**⭐ Star this repo if you found it helpful!**