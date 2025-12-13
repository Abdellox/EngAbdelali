# FixIt - Comprehensive Repair Guide Website

A simplified, user-friendly repair guide website inspired by iFixit, focusing on helping users fix anything with detailed step-by-step instructions.

## Features

### 🔍 Intelligent Search
- Search for any repair problem (e.g., "HP laptop won't turn on", "iPhone screen not working")
- Smart keyword matching finds relevant guides instantly
- Searches through titles, descriptions, brands, and keywords

### 📱 Device Categories
- **Phones**: iPhone, Samsung Galaxy, and more
- **Laptops**: HP, Dell, MacBook, Lenovo
- **Tablets**: iPad, Surface, Android tablets
- **Game Consoles**: PlayStation, Xbox, Nintendo
- **Appliances**: Refrigerators, washers, dryers
- **Automotive**: Cars, motorcycles, bikes

### 📖 Detailed Step-by-Step Guides
Each repair guide includes:
- **Difficulty level** (Easy, Moderate, Difficult)
- **Estimated time** to complete
- **Tools needed** list
- **Parts required** (if any)
- **Detailed step-by-step instructions** with substeps
- **Safety warnings** for each step
- **Pro tips** to make repairs easier
- **Common causes** of the problem
- **Prevention tips** to avoid future issues

### 🎯 Current Repair Guides

1. **HP Laptop Won't Turn On** (Easy, 15 min)
   - Hard reset procedure
   - Power adapter troubleshooting
   - Display issue diagnosis
   - RAM reseating

2. **HP Laptop Overheating** (Moderate, 45 min)
   - External vent cleaning
   - Fan operation check
   - Internal deep cleaning
   - Thermal paste replacement
   - Power settings optimization

3. **HP Laptop Keyboard Not Working** (Easy, 20 min)
   - Software troubleshooting
   - Driver updates
   - Physical cleaning
   - Key removal and cleaning
   - Filter keys settings

4. **iPhone Touch Screen Not Responding** (Easy, 10 min)
   - Force restart methods
   - Screen cleaning
   - iOS updates
   - Settings reset

5. **Samsung Galaxy Won't Charge** (Easy, 15 min)
   - Cable and adapter testing
   - Charging port cleaning
   - Force restart
   - Safe mode diagnosis
   - Software updates

## How to Use

### For Users:
1. Open `index.html` in any web browser
2. Search for your problem in the search bar (e.g., "HP laptop overheating")
3. Click on the relevant repair guide
4. Follow the step-by-step instructions carefully
5. Print the guide if needed using the print button

### For Developers:
To add more repair guides, edit `repair-database.js`:

```javascript
repairDatabase.push({
    id: 6,
    title: "Your Repair Title",
    category: "laptop", // phone, laptop, tablet, game, appliance, car
    brand: "HP",
    difficulty: "easy", // easy, moderate, difficult
    time: "30 min",
    tools: ["Screwdriver", "Compressed air"],
    parts: ["Replacement part name"],
    image: "image-url",
    keywords: ["search", "keywords", "for", "this", "repair"],
    description: "Brief description",
    steps: [
        {
            number: 1,
            title: "Step Title",
            description: "Brief step description",
            details: [
                "First substep",
                "Second substep",
                "Third substep"
            ],
            warning: "Optional safety warning",
            tip: "Optional helpful tip",
            image: "step-image-url"
        }
    ],
    commonCauses: ["Cause 1", "Cause 2"],
    preventionTips: ["Tip 1", "Tip 2"]
});
```

## File Structure

```
├── index.html              # Main HTML page
├── styles.css              # All styling including modal
├── script.js               # Main JavaScript functionality
├── repair-database.js      # Comprehensive repair guide database
└── README.md              # This file
```

## Technologies Used

- Pure HTML5
- CSS3 (with animations and responsive design)
- Vanilla JavaScript (no frameworks)
- Mobile-responsive design
- Print-friendly layouts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

- Add more repair guides for different devices
- Video tutorials embedded in steps
- User comments and ratings
- Community-contributed guides
- Multi-language support
- Dark mode
- Bookmark favorite guides
- Repair difficulty calculator

## Contributing

To add more repair guides:
1. Research the repair thoroughly
2. Add detailed steps to `repair-database.js`
3. Include safety warnings
4. Test the guide yourself if possible
5. Add relevant keywords for search

## License

Free to use for educational and personal purposes.

## Credits

Inspired by iFixit's mission to teach everyone how to fix anything.
