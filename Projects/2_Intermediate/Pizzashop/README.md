# 🍕 Pizza Palace - Ultimate Pizza Shop Web App

A modern, responsive, feature-rich web application for a fictional pizza shop with complete ordering functionality, custom pizza builder, deals, and more!

## ✨ Features

### 🏠 Home Page
- Eye-catching hero banner with call-to-action buttons
- Featured pizza of the day showcase
- Top-selling pizzas slider
- "Why Choose Us?" section highlighting key values

### 📋 Menu Page
- Complete pizza catalog organized by categories:
  - Classic Pizzas
  - Gourmet Pizzas
  - Meat Lovers
  - Veggie Lovers
  - Stuffed Crust Series
  - Thin Crust Specials
- Sides, drinks, and desserts sections
- Real-time search functionality
- Category filtering
- Size selection (S/M/L/XL)
- Add to cart and favorites

### 🔥 Deals & Specials Page
- Daily and weekly deals
- Live countdown timers for limited-time offers
- Coupon codes section
- Savings calculator

### 🎨 Custom Pizza Builder
- Interactive pizza creator with:
  - Size selection (S/M/L/XL)
  - Crust options (Hand-Tossed, Thin & Crispy, Cheese Stuffed, Deep Dish)
  - Sauce selection (Tomato, Marinara, Alfredo, Pesto)
  - Cheese options (Mozzarella, Extra Mozzarella, Cheddar, Vegan)
  - 13+ topping choices
- Real-time price updates
- Visual pizza preview with animated toppings
- Save custom recipes

### 🛒 Checkout & Ordering
- Shopping cart with quantity controls
- Delivery or pickup selection
- Order summary with tax and delivery fee
- Contact information form
- Delivery address input
- Mock payment interface
- Order confirmation screen with estimated delivery time

### 📖 About Us Page
- Restaurant history and story
- Chef profiles
- Core values showcase
- Customer testimonials with star ratings

### 📞 Contact Page
- Contact form
- Location and hours information
- Phone and email details
- Social media links
- Newsletter signup

### 🎨 Design Features
- **Color Palette:**
  - Tomato Red (#E63946)
  - Cheese Yellow (#FFD447)
  - Basil Green (#2A9D8F)
  - Charcoal Black (#1A1A1A)
- Smooth animations and transitions
- Rounded corners and soft shadows
- High-contrast CTAs
- Fully responsive design
- Dark mode toggle
- Toast notifications

## 🚀 Getting Started

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

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **Context API** - State management
- **CSS3** - Styling with custom properties

## 📁 Project Structure

```
pizza-palace/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PizzaCard.jsx
│   │   └── Toast.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Deals.jsx
│   │   ├── PizzaBuilder.jsx
│   │   ├── Checkout.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── menuData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Features Implementation

### State Management
- **CartContext**: Manages shopping cart, favorites, and cart operations
- **ThemeContext**: Handles dark mode toggle

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid layouts

### User Experience
- Smooth page transitions
- Loading states
- Toast notifications for user actions
- Form validation
- Real-time price calculations

## 🎨 Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --tomato-red: #E63946;
  --cheese-yellow: #FFD447;
  --basil-green: #2A9D8F;
  --charcoal-black: #1A1A1A;
}
```

### Menu Items
Update the menu data in `src/data/menuData.js`

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

**Pizza Palace** - Fresh. Hot. Handcrafted. Every Slice Matters. 🍕
