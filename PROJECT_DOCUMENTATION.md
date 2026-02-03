# VinylVault - Project Documentation

## 1. PROJECT OVERVIEW

### Project Name
**VinylVault** - A modern web application for vinyl record collectors and enthusiasts

### Description
VinylVault is a full-stack e-commerce platform designed for vinyl record collectors. It allows users to browse vinyl records, manage a shopping cart, search with advanced filters, and maintain user profiles. The application features a clean, modern UI with vinyl-themed design elements.

### Tech Stack

#### Frontend
- **React**: ^18.2.0
- **React Router DOM**: ^6.30.0 (for routing)
- **React Scripts**: 5.0.1 (Create React App)
- **CSS3**: Custom styling (no framework)

#### Backend
- **Node.js**: >=16.0.0
- **Express.js**: ^4.21.2
- **Body-Parser**: ^1.20.3
- **CORS**: ^2.8.5
- **Serverless-HTTP**: ^3.2.0 (for Netlify Functions)

#### Deployment
- **Netlify**: Configured for serverless deployment
- **Netlify Functions**: Backend API handling

#### Development Tools
- **Concurrently**: ^8.2.2 (for running frontend/backend together)

### Project Structure

```
vinyl-vault-main/
├── client/                          # React frontend application
│   ├── public/                      # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Main app styles
│   │   ├── AppRouter.jsx            # Route configuration
│   │   ├── index.js                 # React entry point
│   │   ├── index.css                # Global styles
│   │   ├── assets/                  # Images, icons, etc.
│   │   │   └── icons/
│   │   ├── components/              # Reusable components
│   │   │   ├── Auth/                # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Login.css
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── Auth.css
│   │   │   ├── Filter/              # Filter components
│   │   │   │   ├── GenreFilter.jsx
│   │   │   │   ├── DecadeFilter.jsx
│   │   │   │   ├── FilterExample.jsx
│   │   │   │   └── FilterStyles.css
│   │   │   ├── Layout/              # Layout components
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Layout.css
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── Product/             # Product components
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ProductCard.css
│   │   │   └── UI/                  # UI components
│   │   │       ├── Notification.jsx
│   │   │       └── Notification.css
│   │   ├── contexts/                # React Context providers
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   ├── CartContext.jsx      # Shopping cart state
│   │   │   └── NotificationContext.jsx  # Notifications
│   │   ├── data/                    # Mock/static data
│   │   │   └── mockProducts.js      # Product data
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Search.jsx
│   │   │   ├── Search.css
│   │   │   ├── Cart.jsx
│   │   │   ├── Cart.css
│   │   │   ├── Profile.jsx
│   │   │   └── Profile.css
│   │   └── utils/                   # Utility functions
│   │       ├── api.js               # API calls
│   │       ├── cartUtils.js         # Cart operations
│   │       └── productUtils.js      # Product utilities
│   ├── package.json                 # Frontend dependencies
│   └── README.md
├── netlify/                         # Netlify configuration
│   └── functions/
│       └── api.js                   # Serverless API functions
├── netlify.toml                     # Netlify deployment config
├── package.json                     # Backend dependencies
└── README.md                        # Project README

```

---

## 2. FRONTEND (React)

### Pages/Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | `Home.jsx` | Protected | Home page with featured products and categories |
| `/home` | Redirect to `/` | Protected | Alias for home page |
| `/login` | `Login.jsx` | Public | User login page |
| `/signup` | `Signup.jsx` | Public | User registration page |
| `/search` | `Search.jsx` | Protected | Advanced search with filters |
| `/cart` | `Cart.jsx` | Protected | Shopping cart management |
| `/profile` | `Profile.jsx` | Protected | User profile page |
| `*` | 404 Component | None | Fallback for invalid routes |

### Components

#### Authentication Components
- **`Login.jsx`**: Login form with email/password validation
  - Status: ✅ Working
  - Features: Form validation, error handling, animated background
  
- **`Signup.jsx`**: Registration form with password confirmation
  - Status: ✅ Working
  - Features: Form validation, password matching, error messages

#### Layout Components
- **`Layout.jsx`**: Main layout wrapper with navbar
  - Status: ✅ Working
  - Wraps all protected routes
  
- **`Navbar.jsx`**: Navigation bar with cart count
  - Status: ✅ Working
  - Features: Dynamic cart count, logout confirmation, responsive design

#### Product Components
- **`ProductCard.jsx`**: Vinyl record product card
  - Status: ✅ Working
  - Features: Product image, price, rating, vinyl-specific info (genre, decade, condition)

#### Filter Components
- **`GenreFilter.jsx`**: Genre filter checkboxes
  - Status: ✅ Working
  - Filters: Rock, Jazz, Hip-Hop, Electronic, Classical, Pop, Soul, Country
  
- **`DecadeFilter.jsx`**: Decade filter checkboxes
  - Status: ✅ Working
  - Filters: 60s, 70s, 80s, 90s, 2000s
  
- **`FilterExample.jsx`**: Filter example/reference component
  - Status: ⚠️ Example only (not used in production)

#### UI Components
- **`Notification.jsx`**: Toast notification system
  - Status: ✅ Working
  - Types: success, error, info
  - Features: Auto-dismiss, fade animation

### State Management

**React Context API** is used for global state management:

1. **AuthContext** (`contexts/AuthContext.jsx`)
   - Manages user authentication state
   - Methods: `login()`, `signup()`, `logout()`, `checkAuth()`
   - State: `currentUser`, `loading`, `error`
   - Status: ✅ Working

2. **CartContext** (`contexts/CartContext.jsx`)
   - Manages shopping cart state
   - Methods: `addItem()`, `removeItem()`, `updateItemQuantity()`, `clearCart()`, `calculateTotal()`
   - State: `cartItems`, `cartCount`
   - Storage: LocalStorage
   - Status: ✅ Working

3. **NotificationContext** (`contexts/NotificationContext.jsx`)
   - Manages toast notifications
   - Methods: `showNotification()`, `hideNotification()`
   - Status: ✅ Working

### Styling Approach

- **Pure CSS** (no framework like Tailwind or Bootstrap)
- **CSS Modules**: Separate CSS file per component
- **Custom Design System**: Vinyl-themed UI with custom colors and animations
- **Material Icons**: Used for iconography (via Google Material Icons CDN)
- **Responsive Design**: Mobile-first approach

---

## 3. BACKEND (Node.js/Express)

### API Endpoints

All endpoints are prefixed with `/.netlify/functions/api` in production or `/api` in development.

| Method | Route | Description | Status |
|--------|-------|-------------|--------|
| `GET` | `/` | Health check endpoint | ✅ Working |
| `POST` | `/auth/signup` | Register a new user | ✅ Working |
| `POST` | `/auth/login` | Login user with email/password | ✅ Working |
| `POST` | `/auth/logout` | Logout user and clear session | ✅ Working |
| `GET` | `/auth/status` | Check authentication status | ✅ Working |

### Authentication Method

- **Session-based Authentication**
- Sessions stored in-memory (resets on server restart/redeploy)
- Session ID stored in localStorage on client
- Default test user:
  - Email: `test@test.com`
  - Username: `Test User`
  - Password: `test123`

### Middleware Used

1. **CORS** (`cors`)
   - Allows cross-origin requests
   - Origin: `*` (all origins allowed)
   - Credentials: enabled

2. **Body Parser** (`body-parser`)
   - Parses JSON request bodies
   - Parses URL-encoded data

3. **Serverless HTTP** (`serverless-http`)
   - Wraps Express app for Netlify Functions
   - Enables serverless deployment

### Third-Party Integrations

- **None currently implemented**
- API is self-contained with no external services

---

## 4. DATABASE

### Database Type
- **No Database** - Currently using in-memory storage

### Connection Status
- ❌ **Not Connected** - No database connection exists

### Schemas/Models
- **None** - No database schemas defined

### Current Data Storage Approach

1. **User Data**:
   - Stored: In-memory array in `netlify/functions/api.js`
   - Persists: Only during server uptime (lost on restart)
   - Default user: test@test.com / test123
   
2. **Session Data**:
   - Stored: In-memory object `activeSessions`
   - Persists: Only during server uptime
   
3. **Product Data**:
   - Stored: Hardcoded in `client/src/data/mockProducts.js`
   - Type: Static mock data (15 vinyl records)
   - Persists: Always available (client-side)
   
4. **Cart Data**:
   - Stored: Browser localStorage
   - Persists: Until user clears browser data
   - Scope: Per-browser/device

---

## 5. WORKING FEATURES

### Authentication ✅
- ✅ User signup with validation
- ✅ User login with email/password
- ✅ Session management
- ✅ Logout functionality
- ✅ Protected routes (redirect to login)
- ✅ Public routes (redirect to home if authenticated)
- ✅ Default test account works

**Limitations:**
- Sessions reset on server restart/redeploy
- No password encryption/hashing
- No email verification
- In-memory storage only

### Product Browsing ✅
- ✅ Display products on home page
- ✅ Product cards with images, price, rating
- ✅ Featured products section
- ✅ Product categories display
- ✅ Vinyl-specific info (genre, decade, condition)

**Limitations:**
- Using mock data only (15 products)
- No real product API integration
- Categories display but don't filter

### Shopping Cart ✅
- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Update item quantities
- ✅ Clear entire cart
- ✅ Cart count badge in navbar
- ✅ Calculate subtotal, shipping, total
- ✅ Empty cart state
- ✅ Cart persists in localStorage

**Limitations:**
- No backend cart synchronization
- Cart is per-device (not synced across devices)
- No checkout/payment integration

### Search & Filtering ✅
- ✅ Search products by title/description
- ✅ Filter by genre (8 genres)
- ✅ Filter by decade (5 decades)
- ✅ Filter by condition (6 conditions)
- ✅ Filter by price range (slider)
- ✅ Multiple filters can be combined
- ✅ Clear individual filters
- ✅ Clear all filters
- ✅ URL search parameters

**Limitations:**
- Searches only mock data
- No backend search API
- No fuzzy search or typo tolerance

### User Profile ✅
- ✅ Display user information
- ✅ Show username and email
- ✅ Edit mode toggle
- ✅ Profile form fields

**Limitations:**
- Profile edit doesn't save changes
- No profile update API
- Phone/address fields are placeholders

### Notifications ✅
- ✅ Toast notifications for actions
- ✅ Success, error, info types
- ✅ Auto-dismiss after 3 seconds
- ✅ Multiple notifications support
- ✅ Fade in/out animations

**Limitations:**
- No notification history
- No persistent notifications

### UI/UX ✅
- ✅ Responsive design
- ✅ Vinyl-themed design
- ✅ Loading states
- ✅ Error messages
- ✅ Form validation
- ✅ Smooth animations
- ✅ Material Icons integration

---

## 6. NON-WORKING/INCOMPLETE FEATURES

### Partially Implemented 🔶

1. **Profile Editing** 🔶
   - Form exists and displays
   - Submit button present
   - ❌ Save functionality not implemented
   - ❌ No API endpoint to update profile

2. **Product Categories** 🔶
   - Categories displayed on home page
   - Category links present
   - ❌ Category pages don't exist (404)
   - ❌ No routes for `/records`, `/turntables`, `/accessories`, `/trade-in`

3. **Checkout Process** 🔶
   - Cart has "Proceed to Checkout" button
   - ❌ Simulated checkout only (no real processing)
   - ❌ No payment integration
   - ❌ No order confirmation backend
   - Shows mock confirmation, then clears cart

4. **Product Details** 🔶
   - Product cards link to `/product/:id`
   - ❌ Product detail page doesn't exist (404)
   - ❌ No individual product view

### Planned but Not Started ❌

1. **Database Integration** ❌
   - Need to implement MongoDB/PostgreSQL
   - Create user model/schema
   - Create product model/schema
   - Create order model/schema
   - Migrate from in-memory to persistent storage

2. **Real Product API** ❌
   - Backend product endpoints needed
   - CRUD operations for products
   - Product search API
   - Product filtering API

3. **Order Management** ❌
   - No order history
   - No order tracking
   - No order database

4. **Admin Panel** ❌
   - No admin interface
   - No product management
   - No user management
   - No order management

5. **User Wishlist** ❌
   - No wishlist feature
   - No save for later

6. **Reviews & Ratings** ❌
   - Ratings displayed but static
   - No review system
   - No user-generated ratings

7. **Email Notifications** ❌
   - No email verification
   - No order confirmations
   - No password reset emails

8. **Payment Processing** ❌
   - No Stripe/PayPal integration
   - No payment gateway
   - No transaction handling

### Broken/Buggy 🐛

1. **Session Persistence** 🐛
   - Sessions lost on Netlify function cold start
   - Users get logged out unexpectedly
   - Need database session storage

2. **Category Navigation** 🐛
   - Clicking category links → 404 error
   - Categories are decorative only

3. **Profile Updates** 🐛
   - Form submission does nothing
   - Changes not saved

---

## 7. DEPENDENCIES

### Frontend Dependencies (`client/package.json`)

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.30.0",
  "react-scripts": "5.0.1"
}
```

### Backend Dependencies (`package.json`)

```json
{
  "accepts": "^1.3.8",
  "array-flatten": "^1.1.1",
  "base64id": "^2.0.0",
  "body-parser": "^1.20.3",
  "bytes": "^3.1.2",
  "call-bind": "^1.0.7",
  "content-disposition": "^0.5.4",
  "content-type": "^1.0.5",
  "cookie": "^0.6.0",
  "cookie-signature": "^1.0.6",
  "cors": "^2.8.5",
  "debug": "^2.6.9",
  "express": "^4.21.2",
  "serverless-http": "^3.2.0",
  "ws": "^8.11.0"
  // ... (50+ more dependencies)
}
```

### Development Dependencies

```json
{
  "concurrently": "^8.2.2"
}
```

---

## 8. DEPLOYMENT STATUS

### Deployment Platform
- **Netlify** ✅ Configured for deployment

### Deployment Configuration

**Build Settings** (from `netlify.toml`):
- Base directory: `.`
- Build command: 
  ```bash
  rm -rf client/node_modules client/.cache && 
  npm --prefix client install && 
  chmod +x client/node_modules/.bin/react-scripts && 
  npm --prefix client run build
  ```
- Publish directory: `client/build`
- Functions directory: `netlify/functions`
- Node version: 18
- NPM version: 9

**Redirects**:
- SPA routing: `/*` → `/index.html` (200)
- API proxy: `/api/*` → `/.netlify/functions/:splat` (200)

### Environment Variables Needed

Currently **no environment variables** are required, but for production you should add:

**Recommended Environment Variables:**
```env
# Database
MONGODB_URI=your_mongodb_connection_string
# or
DATABASE_URL=your_postgres_connection_string

# JWT Secret
JWT_SECRET=your_secure_random_string

# API Configuration
NODE_ENV=production
API_URL=/.netlify/functions/api

# Email (future)
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@vinylvault.com

# Payment Gateway (future)
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

### Deployment Scripts

```bash
# Start backend server (local)
npm run start:server

# Start frontend (local)
npm run start:client

# Run both concurrently (development)
npm run dev

# Build for production
cd client && npm run build
```

---

## 9. KNOWN ISSUES

### Critical Issues 🔴

1. **No Persistent Data Storage** 🔴
   - All user data lost on server restart
   - Sessions expire on function cold start
   - Need database implementation

2. **No Password Security** 🔴
   - Passwords stored in plain text
   - No hashing/encryption (bcrypt needed)
   - Major security vulnerability

3. **No Authentication Tokens** 🔴
   - Using basic session IDs
   - No JWT implementation
   - Sessions not secure

### Major Issues 🟠

4. **Session Management** 🟠
   - In-memory sessions don't scale
   - Lost on serverless cold starts
   - Need Redis or database sessions

5. **No API Rate Limiting** 🟠
   - API endpoints unprotected
   - Vulnerable to abuse
   - Need rate limiting middleware

6. **CORS Wide Open** 🟠
   - `origin: '*'` allows all domains
   - Security risk in production
   - Should restrict to specific domains

### Minor Issues 🟡

7. **Mock Data Only** 🟡
   - No real product inventory
   - Static data doesn't reflect reality
   - Need product management system

8. **No Error Logging** 🟡
   - Console.log only
   - No centralized error tracking
   - Should add Sentry or similar

9. **No Input Sanitization** 🟡
   - User input not sanitized
   - Potential XSS vulnerabilities
   - Need validation library (validator.js)

10. **No API Documentation** 🟡
    - Endpoints not documented
    - Should add Swagger/OpenAPI

### Technical Debt 💳

11. **No Tests** 💳
    - Zero test coverage
    - No unit tests
    - No integration tests
    - Need Jest/React Testing Library

12. **No TypeScript** 💳
    - JavaScript only
    - No type safety
    - Should migrate to TypeScript

13. **Bundle Size** 💳
    - No code splitting
    - Large bundle size
    - Should implement lazy loading

14. **No CI/CD Pipeline** 💳
    - Manual deployments only
    - No automated testing
    - Should add GitHub Actions

---

## 10. MISSING FUNCTIONALITY

### Database Layer (Critical) 🔴

**Needs to be built from scratch:**

1. **Database Setup**
   - Choose database: MongoDB or PostgreSQL
   - Set up connection pooling
   - Create database configuration file
   - Environment variables for connection

2. **User Schema/Model**
   ```javascript
   // Example structure needed
   {
     _id: ObjectId,
     username: String,
     email: String (unique, indexed),
     password: String (hashed with bcrypt),
     phone: String,
     address: String,
     createdAt: Date,
     updatedAt: Date,
     orders: [OrderId]
   }
   ```

3. **Product Schema/Model**
   ```javascript
   // Example structure needed
   {
     _id: ObjectId,
     title: String,
     description: String,
     price: Number,
     images: [String],
     category: String,
     genre: String,
     decade: String,
     condition: String,
     stock: Number,
     createdAt: Date,
     updatedAt: Date
   }
   ```

4. **Order Schema/Model**
   ```javascript
   // Example structure needed
   {
     _id: ObjectId,
     userId: ObjectId,
     items: [{
       productId: ObjectId,
       title: String,
       price: Number,
       quantity: Number
     }],
     subtotal: Number,
     shipping: Number,
     total: Number,
     status: String,
     createdAt: Date,
     updatedAt: Date
   }
   ```

5. **Session Schema/Model**
   ```javascript
   // For persistent sessions
   {
     _id: String (sessionId),
     userId: ObjectId,
     expiresAt: Date
   }
   ```

### API Endpoints (Critical) 🔴

**Need to create these endpoints:**

#### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/products/search` - Search products
- `GET /api/products/filter` - Filter products

#### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Change password
- `POST /api/user/forgot-password` - Request password reset
- `POST /api/user/reset-password` - Reset password

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order details
- `PUT /api/orders/:id/status` - Update order status (admin)

#### Cart (Backend Sync)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

#### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/stats` - Get dashboard stats

### Authentication Improvements (High Priority) 🟠

**Needs to be implemented:**

1. **JWT Token Authentication**
   - Replace session-based auth with JWT
   - Access token + refresh token pattern
   - Token expiration handling

2. **Password Security**
   - Install bcrypt: `npm install bcrypt`
   - Hash passwords on signup
   - Compare hashed passwords on login
   - Password strength requirements

3. **Email Verification**
   - Send verification email on signup
   - Create verification token
   - Email verification endpoint

4. **Password Reset**
   - Forgot password functionality
   - Reset token generation
   - Email reset link
   - Reset password endpoint

### Payment Integration (High Priority) 🟠

**Needs to be built:**

1. **Payment Gateway Setup**
   - Choose: Stripe or PayPal
   - Install SDK: `npm install stripe` or `npm install @paypal/checkout-server-sdk`
   - Set up API keys
   - Create payment configuration

2. **Checkout Flow**
   - Payment intent creation
   - Card input form (Stripe Elements)
   - Payment processing
   - Order confirmation

3. **Webhooks**
   - Handle payment success
   - Handle payment failure
   - Update order status

### UI Pages (Medium Priority) 🟡

**Need to create:**

1. **Product Detail Page**
   - Route: `/product/:id`
   - Component: `ProductDetail.jsx`
   - Features: Full product info, add to cart, related products

2. **Category Pages**
   - Route: `/category/:name`
   - Component: `CategoryPage.jsx`
   - Display products by category

3. **Order History Page**
   - Route: `/orders`
   - Component: `OrderHistory.jsx`
   - List user's past orders

4. **Order Detail Page**
   - Route: `/orders/:id`
   - Component: `OrderDetail.jsx`
   - Show order information

5. **Admin Dashboard**
   - Route: `/admin`
   - Component: `AdminDashboard.jsx`
   - Manage products, orders, users

6. **404 Page**
   - Currently just text
   - Needs proper styling and navigation

### Additional Features (Low Priority) 🟢

1. **Wishlist**
   - Save items for later
   - Wishlist page
   - Add/remove from wishlist

2. **Product Reviews**
   - Leave reviews
   - Star ratings
   - Review moderation

3. **Advanced Search**
   - Autocomplete
   - Search suggestions
   - Recent searches

4. **User Dashboard**
   - Order tracking
   - Account settings
   - Purchase history

5. **Email Notifications**
   - Order confirmation emails
   - Shipping notifications
   - Marketing emails (opt-in)

---

## Summary

VinylVault is a functional prototype with working authentication, product browsing, cart management, and search/filtering. However, it requires significant work to become production-ready:

**Immediate Priorities:**
1. ✅ Implement database (MongoDB recommended)
2. ✅ Add password hashing (bcrypt)
3. ✅ Create product API endpoints
4. ✅ Implement JWT authentication
5. ✅ Add persistent session storage

**Short-term Goals:**
- Complete profile editing
- Build product detail pages
- Create checkout/payment flow
- Add order management
- Implement category pages

**Long-term Goals:**
- Admin panel
- Email notifications
- Reviews and ratings
- Advanced analytics
- Mobile app

**Current State:** 
- **Frontend:** ~70% complete
- **Backend:** ~30% complete
- **Database:** 0% complete
- **Production Ready:** ❌ No

---

*Last Updated: December 24, 2025*
