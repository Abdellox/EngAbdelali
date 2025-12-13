# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth Routes

#### Register
```
POST /auth/register
Body: { name, email, password, role }
Response: { success, token, user }
```

#### Login
```
POST /auth/login
Body: { email, password }
Response: { success, token, user }
```

### Course Routes

#### Get All Courses
```
GET /courses?category=programming&level=beginner&sort=popular
Response: { success, count, courses }
```

#### Get Course by ID
```
GET /courses/:id
Response: { success, course }
```

#### Create Course (Teacher only)
```
POST /courses
Headers: Authorization
Body: { title, description, category, price, ... }
Response: { success, course }
```

### Review Routes

#### Get Course Reviews
```
GET /reviews/course/:courseId
Response: { success, reviews }
```

#### Create Review
```
POST /reviews
Headers: Authorization
Body: { course, rating, comment }
Response: { success, review }
```

### User Routes

#### Get Teachers
```
GET /users/teachers
Response: { success, teachers }
```

### Payment Routes

#### Create Payment Intent
```
POST /payments/create-payment-intent
Headers: Authorization
Body: { courseId, amount }
Response: { success, clientSecret }
```
