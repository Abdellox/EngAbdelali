# ☕ Coffee Bliss - Coffee Shop Specials Web App

A fully responsive, modern web application showcasing coffee drinks, daily specials, custom drink builder, and ordering features for Coffee Bliss café.

## 🎨 Features

- **Home Page**: Hero section with featured drinks and top sellers
- **Menu Page**: Complete menu with categories, search, and favorites
- **Specials Page**: Daily specials with countdown timer and combo deals
- **Drink Builder**: Custom drink creator with real-time price updates
- **Shopping Cart**: Full checkout flow with order summary
- **About Page**: Café story, values, and team members
- **Contact Page**: Contact form and business information
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette
- Coffee Brown: `#4B2E2B`
- Cream White: `#F6F2EC`
- Caramel Gold: `#C49A6C`
- Deep Espresso: `#2B1A17`

### Typography
- Headers: Playfair Display (serif)
- Body: Inter (sans-serif)

## 📁 Project Structure

```
coffee-bliss/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Toast.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Specials.jsx
│   │   ├── DrinkBuilder.jsx
│   │   ├── Checkout.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── context/         # React context providers
│   │   ├── CartContext.jsx
│   │   └── FavoritesContext.jsx
│   ├── data/            # Mock data
│   │   └── menuData.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
└── package.json
```

## 🛠️ Technologies

- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS3** - Styling with custom properties

## 📱 Pages Overview

### Home
- Hero section with call-to-action buttons
- Featured drink of the day
- Top sellers carousel

### Menu
- 25+ drink items across 8 categories
- Search functionality
- Favorites system
- Add to cart

### Specials
- Daily rotating specials with discounts
- Countdown timer for limited offers
- Weekly rotation grid
- Combo deals

### Drink Builder
- Customize base (espresso, cold brew, matcha, decaf)
- Choose milk type
- Adjust sweetness level
- Add toppings
- Real-time price calculation

### Checkout
- Shopping cart with quantity controls
- Order summary with tax calculation
- Pickup time selector
- Guest checkout

### About
- Café story and mission
- Core values
- Team member profiles

### Contact
- Contact form
- Business hours
- Location information
- Social media links

## 🎯 Key Features

- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System-wide theme toggle
- **Toast Notifications**: User feedback for actions
- **Shopping Cart**: Persistent cart with quantity management
- **Favorites**: Save favorite drinks
- **Search & Filter**: Find drinks quickly
- **Custom Drink Builder**: Create personalized beverages

## 📄 License

This is a demo project created for educational purposes.

---

**Brewed with Passion, Served with Love** ☕
