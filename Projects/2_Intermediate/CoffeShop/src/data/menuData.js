export const menuItems = [
  // Espresso Drinks
  { id: 1, name: 'Classic Espresso', category: 'Espresso Drinks', price: 3.50, description: 'Rich, bold shot of pure espresso', image: '☕', badge: 'popular' },
  { id: 2, name: 'Double Espresso', category: 'Espresso Drinks', price: 4.50, description: 'Double the intensity, double the energy', image: '☕☕' },
  { id: 3, name: 'Americano', category: 'Espresso Drinks', price: 3.99, description: 'Espresso with hot water for a smooth finish', image: '☕' },
  
  // Cold Brews
  { id: 4, name: 'Caramel Honey Cold Brew', category: 'Cold Brews', price: 5.99, description: 'Refreshing cold brew infused with golden honey, topped with silky caramel foam', image: '🧊', badge: 'new' },
  { id: 5, name: 'Vanilla Cold Brew', category: 'Cold Brews', price: 5.49, description: 'Smooth cold brew with a hint of vanilla', image: '🧊', badge: 'popular' },
  { id: 6, name: 'Nitro Cold Brew', category: 'Cold Brews', price: 6.49, description: 'Creamy, nitrogen-infused cold brew', image: '🧊', badge: 'limited' },
  
  // Lattes & Cappuccinos
  { id: 7, name: 'Hazelnut Latte', category: 'Lattes & Cappuccinos', price: 4.50, description: 'Creamy espresso blended with hazelnut syrup and steamed milk', image: '🥛', badge: 'popular' },
  { id: 8, name: 'Vanilla Latte', category: 'Lattes & Cappuccinos', price: 4.50, description: 'Classic latte with sweet vanilla notes', image: '🥛' },
  { id: 9, name: 'Cappuccino', category: 'Lattes & Cappuccinos', price: 4.25, description: 'Perfect balance of espresso, steamed milk, and foam', image: '🥛' },
  { id: 10, name: 'Caramel Macchiato', category: 'Lattes & Cappuccinos', price: 5.25, description: 'Layered espresso with vanilla and caramel drizzle', image: '🥛', badge: 'popular' },
  
  // Signature Creations
  { id: 11, name: 'Honey Lavender Latte', category: 'Signature Creations', price: 5.99, description: 'Floral lavender meets sweet honey in perfect harmony', image: '✨', badge: 'new' },
  { id: 12, name: 'Brown Sugar Cinnamon', category: 'Signature Creations', price: 5.75, description: 'Warm spices with brown sugar sweetness', image: '✨', badge: 'limited' },
  { id: 13, name: 'Salted Caramel Mocha', category: 'Signature Creations', price: 6.25, description: 'Rich chocolate and caramel with a hint of sea salt', image: '✨', badge: 'popular' },
  
  // Frappes & Iced Blends
  { id: 14, name: 'Mocha Frappe', category: 'Frappes & Iced Blends', price: 6.50, description: 'Blended coffee with chocolate and whipped cream', image: '🍦' },
  { id: 15, name: 'Caramel Frappe', category: 'Frappes & Iced Blends', price: 6.50, description: 'Sweet caramel blended with ice and coffee', image: '🍦', badge: 'popular' },
  { id: 16, name: 'Cookies & Cream Frappe', category: 'Frappes & Iced Blends', price: 6.99, description: 'Crushed cookies blended into creamy perfection', image: '🍦', badge: 'new' },
  
  // Seasonal Specials
  { id: 17, name: 'Pumpkin Spice Latte', category: 'Seasonal Specials', price: 5.99, description: 'Fall favorite with pumpkin and warm spices', image: '🎃', badge: 'limited' },
  { id: 18, name: 'Peppermint Mocha', category: 'Seasonal Specials', price: 5.99, description: 'Festive blend of chocolate and peppermint', image: '🎄', badge: 'limited' },
  
  // Tea & Non-Coffee
  { id: 19, name: 'Matcha Latte', category: 'Tea & Non-Coffee', price: 5.25, description: 'Premium Japanese matcha with steamed milk', image: '🍵', badge: 'popular' },
  { id: 20, name: 'Chai Latte', category: 'Tea & Non-Coffee', price: 4.75, description: 'Spiced black tea with steamed milk', image: '🍵' },
  { id: 21, name: 'Hot Chocolate', category: 'Tea & Non-Coffee', price: 4.25, description: 'Rich, creamy chocolate drink', image: '🍫' },
  
  // Pastries & Snacks
  { id: 22, name: 'Butter Croissant', category: 'Pastries & Snacks', price: 3.50, description: 'Flaky, buttery French pastry', image: '🥐', badge: 'popular' },
  { id: 23, name: 'Blueberry Muffin', category: 'Pastries & Snacks', price: 3.75, description: 'Fresh baked with juicy blueberries', image: '🧁' },
  { id: 24, name: 'Chocolate Chip Cookie', category: 'Pastries & Snacks', price: 2.99, description: 'Warm, gooey chocolate chip perfection', image: '🍪' },
  { id: 25, name: 'Almond Biscotti', category: 'Pastries & Snacks', price: 3.25, description: 'Crunchy Italian cookie, perfect for dipping', image: '🍪' }
]

export const categories = [
  'All',
  'Espresso Drinks',
  'Cold Brews',
  'Lattes & Cappuccinos',
  'Signature Creations',
  'Frappes & Iced Blends',
  'Seasonal Specials',
  'Tea & Non-Coffee',
  'Pastries & Snacks'
]

export const dailySpecials = [
  { day: 'Monday', item: menuItems[6], discount: 20 },
  { day: 'Tuesday', item: menuItems[9], discount: 15 },
  { day: 'Wednesday', item: menuItems[4], discount: 25 },
  { day: 'Thursday', item: menuItems[18], discount: 20 },
  { day: 'Friday', item: menuItems[14], discount: 15 },
  { day: 'Saturday', item: menuItems[10], discount: 20 },
  { day: 'Sunday', item: menuItems[12], discount: 25 }
]
