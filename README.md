# NextCart - Modern E-Commerce Platform

NextCart is a full-featured, high-performance e-commerce application built with a modern tech stack. It provides a seamless shopping experience with real-time data fetching, global state management, and a premium user interface.

## 🚀 Live Demo & Links

- **Frontend Deployment:** [NextCart on Vercel](https://next-cart-lovat-three.vercel.app/)
- **Backend Repository:** [Ecom Backend GitHub](https://github.com/10-Amit-01/ecom-backend)

## ✨ Key Features

- **Product Discovery**: Dynamic product listing with advanced search and filtering.
- **Detailed Insights**: Comprehensive product detail pages with real-time stock status.
- **Shopping Cart**: Fully functional cart with persistent state and real-time updates.
- **Secure Checkout**: Streamlined checkout process for registered users.
- **Authentication**: Secure login and signup, including **Google OAuth** integration.
- **Responsive Design**: Optimized for all devices, from mobile to desktop.
- **Performance**: Extremely fast page loads and smooth transitions powered by Vite and React 19.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (Reference)
- **Runtime**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT & Passport.js (Google OAuth)

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/10-Amit-01/nextCart.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd nextCart/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   VITE_API_BASE_URL=your_backend_api_url
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License.
