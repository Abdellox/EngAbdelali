# 🌍 WorldBite - Global Food & Drinks Explorer

**Taste the World, One Country at a Time**

A modern, responsive web application showcasing foods and drinks from countries around the world, featuring signature dishes, famous beverages, cultural facts, and more.

## ✨ Features

- **🗺️ Explore by Region**: Browse countries organized by Asia, Europe, Africa, Americas, Middle East, and Oceania
- **🍽️ Country Cuisine Pages**: Detailed pages for each country with signature foods, drinks, and cultural facts
- **📜 Food History**: Learn the fascinating history behind each dish and drink
- **👨‍🍳 Full Recipes**: Step-by-step recipes for every food and beverage
- **🔍 Global Food Browser**: Filter and search through dishes by type, spice level, and country
- **🥤 Drink Explorer**: Discover beverages from around the world, filtered by type
- **🌟 Daily Feature**: A new featured dish every day
- **💬 Interactive Modals**: Click any food or drink to see detailed history and recipes
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Fully Responsive**: Works beautifully on mobile, tablet, and desktop

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

The built files will be in the `dist` folder.

## 🎨 Design Features

- **Color Palette**:
  - Primary: Global Blue (#2D5FFF)
  - Secondary: Food Orange (#F06133)
  - Accent: Fresh Green (#3BB273)
  - Background: Off White (#F7F7F7)
  - Dark Mode: Charcoal (#1A1A1A)

- **Modern UI**: Clean cards, smooth transitions, rounded corners
- **Vibrant**: High-quality food emojis and colorful region themes
- **Accessible**: Proper contrast ratios and semantic HTML

## 📂 Project Structure

```
worldbite/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Countries.jsx
│   │   ├── CountryDetail.jsx
│   │   ├── FoodBrowser.jsx
│   │   ├── DrinkExplorer.jsx
│   │   ├── DailyFeature.jsx
│   │   └── About.jsx
│   ├── data/
│   │   └── countries.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🌍 Current Countries

The app features **20 countries** with complete cuisine information:

### Europe 🇪🇺
- 🇮🇹 **Italy** - Pizza, Pasta, Risotto, Tiramisu, Gelato
- 🇫🇷 **France** - Croissants, Coq au Vin, Macarons, Wine, Champagne
- 🇪🇸 **Spain** - Paella, Tapas, Gazpacho, Sangria, Jamón Ibérico
- 🇬🇷 **Greece** - Moussaka, Souvlaki, Greek Salad, Ouzo, Baklava
- 🇩🇪 **Germany** - Bratwurst, Schnitzel, Pretzels, Beer, Black Forest Cake
- 🇬🇧 **UK** - Fish & Chips, Full English, Scones, Tea, Sticky Toffee Pudding

### Asia 🌏
- 🇯🇵 **Japan** - Sushi, Ramen, Tempura, Matcha, Sake
- 🇨🇳 **China** - Peking Duck, Dim Sum, Kung Pao Chicken, Green Tea, Baijiu
- 🇮🇳 **India** - Butter Chicken, Biryani, Samosas, Chai, Lassi
- 🇹🇭 **Thailand** - Pad Thai, Tom Yum, Green Curry, Thai Tea
- 🇰🇷 **South Korea** - Kimchi, Bibimbap, Korean BBQ, Soju, Makgeolli
- 🇻🇳 **Vietnam** - Pho, Banh Mi, Spring Rolls, Vietnamese Coffee

### Middle East 🕌
- 🇹🇷 **Turkey** - Kebab, Döner, Baklava, Turkish Coffee, Raki
- 🇱🇧 **Lebanon** - Hummus, Falafel, Tabbouleh, Shawarma, Arak

### Americas 🌎
- 🇲🇽 **Mexico** - Tacos al Pastor, Quesadillas, Horchata, Tequila
- 🇺🇸 **USA** - Burgers, BBQ Ribs, Fried Chicken, Apple Pie, Bourbon
- 🇧🇷 **Brazil** - Feijoada, Pão de Queijo, Caipirinha, Brigadeiro
- 🇦🇷 **Argentina** - Asado, Empanadas, Dulce de Leche, Mate, Malbec
- 🇵🇪 **Peru** - Ceviche, Lomo Saltado, Pisco Sour, Chicha Morada

### Africa 🌍
- 🇲🇦 **Morocco** - Tagine, Couscous, Mint Tea, Harira

**Each country includes:**
- 5 signature dishes with full history and recipes
- 3-4 traditional drinks with preparation methods
- Cultural food facts and traditions
- Over 100 dishes and 60+ drinks total!

## 🔧 Technologies Used

- **React 18**: Modern UI library
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with CSS variables

## 📝 Adding More Countries

To add more countries, edit `src/data/countries.js`:

```javascript
{
  id: 'country-id',
  name: 'Country Name',
  flag: '🏳️',
  region: 'regionKey',
  greeting: 'Local greeting',
  foods: [
    { name: 'Dish', description: '...', type: 'main', spicy: 0, image: '🍽️' }
  ],
  drinks: [
    { name: 'Drink', description: '...', type: 'soft', image: '🥤' }
  ],
  culturalFacts: ['Fact 1', 'Fact 2']
}
```

## 🎯 Future Enhancements

- Interactive world map
- Recipe details
- Restaurant finder integration
- User favorites and collections
- Multi-language support
- AI food recommendations
- AR food preview
- Food challenges and quizzes

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more countries and dishes
- Improve the UI/UX
- Add new features
- Fix bugs
- Improve documentation

---

**Made with ❤️ for food lovers around the world**
