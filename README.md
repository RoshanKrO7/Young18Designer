# Doorstep Tailoring

A modern web application that connects customers with professional tailors for at-home tailoring services. Built with React, TypeScript, and Supabase.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Service Booking**: Easy booking system for tailoring services
- **Tailor Profiles**: Detailed profiles of professional tailors with ratings and reviews
- **Real-time Notifications**: Stay updated with booking status and messages
- **Responsive Design**: Mobile-friendly interface for seamless experience
- **Admin Dashboard**: Comprehensive management system for administrators
- **Review System**: Customer feedback and rating system
- **Contact Form**: Easy communication with support team

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context
- **Styling**: TailwindCSS
- **Deployment**: GitHub Pages
- **Code Quality**: ESLint, Prettier, Husky

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RoshanKrO7/Young18Designer.git
   cd Young18Designer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Building for Production

```bash
npm run build
```

### Deployment

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── config/        # Configuration files
├── hooks/         # Custom React hooks
├── images/        # Static images
├── lib/          # Utility libraries
├── pages/        # Page components
├── providers/    # Context providers
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── App.tsx       # Main application component
```

## 🔒 Database Schema

The application uses the following main tables:
- Profiles
- Services
- Tailors
- Bookings
- Reviews
- User Roles
- Contact Messages
- Notifications


## 👥 Authors

- RoshanKrO7 - Initial work
