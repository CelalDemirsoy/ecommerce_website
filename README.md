# ShopHub - Modern E-Commerce Website

A beautiful, fully-functional e-commerce website built with Next.js, React, and Tailwind CSS. Features a modern minimalist design with black, white, and gray color scheme.

## 🎯 Features

### Pages
- **Home Page** - Hero banner with call-to-action and featured products
- **Products Page** - Full product catalog with category filtering and search
- **Product Detail Page** - Detailed product view with quantity selector
- **Shopping Cart** - Add, remove, and update quantities
- **Checkout Page** - Complete checkout form (UI only, no payment processing)
- **About Page** - Company information
- **Contact Page** - Contact form and business details

### Functionality
- ✅ Add products to cart
- ✅ Update quantities in cart
- ✅ Remove items from cart
- ✅ Category filtering
- ✅ Product search
- ✅ Cart persistence (localStorage)
- ✅ Responsive design (mobile & desktop)
- ✅ Modern minimalist UI

## 🚀 Getting Started

The application is already running! Access it at:
- **Local:** http://localhost:3000

### Restarting the Application

If you need to restart the services:
```bash
sudo supervisorctl restart nextjs
```

### Check Service Status
```bash
sudo supervisorctl status
```

## 📦 Technologies Used

- **Frontend:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** React Context API
- **Data Storage:** localStorage (client-side)

## 🎨 Customization Guide

### 1. Replacing Demo Products

Edit the `PRODUCTS` array in `/app/app/page.js` (starting at line ~15):

```javascript
const PRODUCTS = [
  {
    id: 1,
    name: 'Your Product Name',
    category: 'Category Name',
    price: 99.99,
    description: 'Product description here',
    image: 'https://your-image-url.com/image.jpg',
    featured: true,  // Show on home page
    rating: 4.5
  },
  // Add more products...
]
```

### 2. Updating Categories

Edit the `CATEGORIES` array in `/app/app/page.js`:

```javascript
const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports']
```

### 3. Changing Colors/Theme

The site uses a modern minimalist theme. To customize colors, edit Tailwind classes in `/app/app/page.js`:

- **Primary buttons:** `bg-black hover:bg-gray-800` → Change to your color
- **Navigation:** `bg-white border-b border-gray-200`
- **Hero section:** `bg-gray-900`

### 4. Updating Branding

Replace "ShopHub" throughout `/app/app/page.js`:
- Line ~78: Logo text in Navigation component
- Line ~106: Footer branding
- Line ~273: Home page hero text

### 5. Adding Product Images

Replace placeholder images with real images:
1. Host your images online (e.g., Cloudinary, AWS S3)
2. Update the `image` field in the PRODUCTS array with your image URLs

## 📱 Pages Overview

### Home Page (`/`)
- Hero banner with "Discover Your Next Favorite Product"
- Featured products grid (4 products)
- Category quick links
- Responsive layout

### Products Page (`/products`)
- Sidebar with category filters
- Search bar for product search
- Product grid (all 12 demo products)
- Product count display

### Product Detail Page
- Large product image
- Product name, category, and rating
- Price display
- Quantity selector
- Add to Cart button
- Product description and features
- Related products section

### Shopping Cart
- List of cart items with images
- Quantity controls (+ / -)
- Remove item button
- Order summary with subtotal, shipping, and tax
- Proceed to Checkout button
- Empty cart state

### Checkout Page
- Shipping information form (First name, Last name, Email, Address, City, ZIP)
- Payment information form (Card number, Expiry, CVV)
- Order summary sidebar
- Place Order button
- Success confirmation page

### About Page
- Company mission and values
- What we offer section
- Professional content layout

### Contact Page
- Contact information (Email, Phone, Address)
- Contact form (Name, Email, Subject, Message)
- Form submission confirmation

## 🛠️ Future Enhancements

When you're ready to add backend functionality, you can:

1. **Add Authentication**
   - User registration and login
   - User profiles and order history

2. **Connect to Real Database**
   - MongoDB is already available at `process.env.MONGO_URL`
   - Replace mock products with database queries

3. **Implement Payment Processing**
   - Integrate Stripe or PayPal
   - Process real payments

4. **Add Admin Panel**
   - Manage products
   - View orders
   - Update inventory

5. **Order Management**
   - Save orders to database
   - Order tracking
   - Email notifications

## 📂 Project Structure

```
/app/
├── app/
│   ├── page.js              # Main application (all pages)
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global styles
│   └── api/
│       └── [[...path]]/
│           └── route.js     # API routes (ready for backend)
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── utils.js             # Utility functions
├── tests/                   # Test screenshots
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎯 Demo Data

The site includes 12 demo products across 4 categories:
- **Electronics:** Headphones, Smart Watch, Monitor, Wireless Mouse
- **Fashion:** Leather Jacket, Laptop Backpack, Denim Jeans
- **Home:** Coffee Maker, Desk Lamp
- **Sports:** Running Shoes, Yoga Mat, Dumbbells Set

All products have:
- Placeholder images
- Realistic prices
- Star ratings
- Product descriptions

## 💡 Tips

1. **Cart persists across page refreshes** - Data is stored in localStorage
2. **All navigation is client-side** - Fast, smooth transitions
3. **Responsive design** - Works on mobile, tablet, and desktop
4. **No backend required** - Pure frontend application
5. **Easy to customize** - All code in single file for now

## 📝 Notes

- No authentication or user accounts (frontend only)
- Checkout form doesn't process payments (UI demonstration)
- Product data is hardcoded (easy to replace later)
- Cart data stored in browser localStorage
- All images are placeholders (ready for real images)

---

**Ready to customize?** Start by updating the PRODUCTS array with your own products and images!

For questions or issues, check the Next.js logs:
```bash
tail -f /var/log/supervisor/nextjs.out.log
```
