export const pizzas = [
  {
    id: 1,
    name: "Margherita",
    category: "Classic Pizzas",
    description: "A simple Italian classic with tomato sauce, fresh mozzarella, basil, and olive oil.",
    price: { S: 8.50, M: 10.50, L: 13.50, XL: 16.50 },
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    badges: ["Classic"]
  },
  {
    id: 2,
    name: "BBQ Chicken Delight",
    category: "Gourmet Pizzas",
    description: "Smoky BBQ sauce, grilled chicken, red onions, cilantro, and mozzarella.",
    price: { S: 10.99, M: 14.99, L: 18.99, XL: 22.99 },
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    badges: ["Hot", "Fan Favorite"]
  },
  {
    id: 3,
    name: "Pepperoni Supreme",
    category: "Classic Pizzas",
    description: "Double pepperoni, extra cheese, and our signature tomato sauce.",
    price: { S: 9.99, M: 12.99, L: 16.99, XL: 20.99 },
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    badges: ["Fan Favorite"]
  },
  {
    id: 4,
    name: "Meat Lovers Paradise",
    category: "Meat Lovers",
    description: "Pepperoni, sausage, bacon, ham, and ground beef on a bed of mozzarella.",
    price: { S: 11.99, M: 15.99, L: 19.99, XL: 24.99 },
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500",
    badges: ["Hot"]
  },
  {
    id: 5,
    name: "Veggie Garden",
    category: "Veggie Lovers",
    description: "Mushrooms, bell peppers, onions, olives, tomatoes, and spinach.",
    price: { S: 9.50, M: 12.50, L: 15.50, XL: 19.50 },
    image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500",
    badges: ["New"]
  },
  {
    id: 6,
    name: "Hawaiian Sunset",
    category: "Classic Pizzas",
    description: "Ham, pineapple, and mozzarella with a sweet and savory twist.",
    price: { S: 9.99, M: 12.99, L: 16.99, XL: 20.99 },
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500",
    badges: []
  },
  {
    id: 7,
    name: "Truffle Mushroom",
    category: "Gourmet Pizzas",
    description: "Wild mushrooms, truffle oil, arugula, and parmesan on white sauce.",
    price: { S: 12.99, M: 16.99, L: 21.99, XL: 26.99 },
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500",
    badges: ["New", "Limited"]
  },
  {
    id: 8,
    name: "Buffalo Chicken",
    category: "Gourmet Pizzas",
    description: "Spicy buffalo chicken, ranch drizzle, celery, and blue cheese crumbles.",
    price: { S: 10.99, M: 14.99, L: 18.99, XL: 22.99 },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    badges: ["Hot"]
  },
  {
    id: 9,
    name: "Four Cheese Bliss",
    category: "Stuffed Crust Series",
    description: "Mozzarella, cheddar, parmesan, and gorgonzola with stuffed cheese crust.",
    price: { S: 11.50, M: 15.50, L: 19.50, XL: 24.50 },
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=500",
    badges: ["Fan Favorite"]
  },
  {
    id: 10,
    name: "Mediterranean Delight",
    category: "Thin Crust Specials",
    description: "Feta cheese, olives, sun-dried tomatoes, artichokes, and oregano.",
    price: { S: 10.50, M: 13.50, L: 17.50, XL: 21.50 },
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500",
    badges: ["New"]
  }
]

export const sides = [
  { id: 101, name: "Garlic Bread", price: 4.99, image: "https://images.unsplash.com/photo-1573140401552-388e3ead0b5e?w=300" },
  { id: 102, name: "Buffalo Wings", price: 8.99, image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300" },
  { id: 103, name: "Mozzarella Sticks", price: 6.99, image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=300" },
  { id: 104, name: "Loaded Fries", price: 5.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300" }
]

export const drinks = [
  { id: 201, name: "Coca-Cola", price: 2.49, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300" },
  { id: 202, name: "Lemonade", price: 2.99, image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=300" },
  { id: 203, name: "Iced Tea", price: 2.49, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300" }
]

export const desserts = [
  { id: 301, name: "Chocolate Lava Cake", price: 5.99, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300" },
  { id: 302, name: "Tiramisu", price: 6.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300" },
  { id: 303, name: "Cannoli", price: 4.99, image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=300" }
]

export const deals = [
  {
    id: 1001,
    title: "Two Large Pizzas Deal",
    description: "Get 2 Large Pizzas for only $19.99",
    originalPrice: 33.98,
    dealPrice: 19.99,
    validUntil: "2025-11-22",
    badges: ["Hot Deal"]
  },
  {
    id: 1002,
    title: "Family Combo",
    description: "1 XL Pizza + 2 Sides + 4 Drinks",
    originalPrice: 42.95,
    dealPrice: 29.99,
    validUntil: "2025-11-30",
    badges: ["Fan Favorite"]
  },
  {
    id: 1003,
    title: "Lunch Special",
    description: "Medium Pizza + Drink",
    originalPrice: 15.48,
    dealPrice: 9.99,
    validUntil: "2025-11-20",
    badges: ["Limited Time"]
  }
]
