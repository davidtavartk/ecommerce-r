# RedSeam E-commerce Platform

A modern e-commerce website built with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
This application provides a complete online shopping experience with product browsing, filtering, cart management, and user authentication.

---

## ✨ Features

- **Product Catalog** – Browse products with pagination and grid layout
- **Advanced Filtering** – Filter products by price range with real-time validation
- **Product Sorting** – Sort by price (low to high, high to low) and newest first
- **Product Details** – Detailed product pages with image galleries, color/size selection
- **Shopping Cart** – Add products to cart with variants, manage quantities, and checkout
- **User Authentication** – Register and login with avatar upload support
- **Responsive Design** – Fully responsive layout that works on all devices
- **Form Validation** – Comprehensive form validation with user-friendly error handling
- **URL State Management** – Filters and pagination persist in URL

---

## 🛠 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS 4**
- **React Hook Form** – Form handling and validation
- **Zod** – Schema validation
- **Zustand** – State management
- **React Aria Components** – Accessible UI components (Headless)

---

## Getting Started

### Prerequisites

Make sure you have **Node.js 18 or higher** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/davidtavartk/ecommerce-r
   cd ecommerce-r
   ```

````

2. Install dependencies:

   ```bash
   npm install (or use any of your choice)
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   http://localhost:3000

---

## 📜 Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run start` – Start production server
* `npm run lint` – Run ESLint

---

## 🌐 API Integration

The application connects to the **RedBerry API**:
🔗 `https://api.redseam.redberryinternship.ge/api`
It is done with a constant defined in apiClient.ts, since this project is not private and there is no need for ENV variables

---

## 🔑 Key Implementation Details

### Form Validation

* **React Hook Form** with **Zod** validation

### State Management

* **Zustand** with separate stores for:

  * Authentication
  * Cart functionality

### Image Optimization

* Next.js **Image component** is used for optimized performance

### Website is built for 1920x1080 - non-responsive design
````
