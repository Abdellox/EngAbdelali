# Supplier Platform

A web platform that connects to Chinese suppliers via APIs and web scraping to display products with search, filter, and user registration features.

## Features

- **Product Display**: Browse products from Chinese suppliers
- **Search & Filter**: Search by keywords, filter by category and price range
- **User Authentication**: Register and login functionality with JWT
- **Web Scraping**: Scrape products from supplier websites using Cheerio
- **API Integration**: Connect to supplier APIs to fetch product data
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Axios for API calls
- Cheerio for web scraping
- Rate limiting for API protection

**Frontend:**
- React 18
- React Router for navigation
- Axios for API communication
- CSS for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/supplier-platform
JWT_SECRET=your_secure_random_string_here
NODE_ENV=development
```

### Running the Application

1. Start MongoDB (if running locally)

2. Start the backend server:
```bash
npm start
```

3. In a new terminal, start the React frontend:
```bash
npm run client
```

4. Access the application at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (with search/filter)
- `GET /api/products/:id` - Get single product
- `GET /api/products/meta/categories` - Get all categories

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers/:id/scrape` - Scrape products from supplier website
- `POST /api/suppliers/:id/fetch-api` - Fetch products from supplier API

## Usage

### Adding Suppliers

To add suppliers and fetch products, you'll need to:

1. Add supplier records to MongoDB with their website URLs or API endpoints
2. Use the scraping or API fetch endpoints to import products
3. Customize the scraping selectors in `routes/suppliers.js` based on actual supplier websites

### Customizing Web Scraping

Edit `routes/suppliers.js` and modify the Cheerio selectors to match the target website structure:

```javascript
$('.product-item').each((i, elem) => {
  const title = $(elem).find('.product-title').text().trim();
  const price = parseFloat($(elem).find('.product-price').text().replace(/[^0-9.]/g, ''));
  // Add more fields as needed
});
```

## Security Notes

- Always use environment variables for sensitive data
- Implement rate limiting on scraping endpoints
- Respect robots.txt and terms of service when scraping
- Use HTTPS in production
- Validate and sanitize all user inputs

## License

MIT
