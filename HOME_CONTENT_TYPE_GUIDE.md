# 🏠 Home Content Type Setup Guide

## Overview

Your e-commerce home page now loads products from the **`home`** content type in Contentstack CMS with clothing-specific categories.

---

## 📋 Content Type Configuration

### Content Type Details:
- **Name:** Home (or any display name you prefer)
- **UID:** `home` ⚠️ **MUST be exactly "home"**
- **Purpose:** Store products to display on the home page

---

## 🔧 Required Fields

Create these fields in your **`home`** content type in Contentstack:

### Core Fields (Required):

| # | Field Name | UID | Type | Required | Description |
|---|------------|-----|------|----------|-------------|
| 1 | Product Name | `title` | Single Line Textbox | ✅ Yes | Name of the product |
| 2 | Description | `description` | Multi Line Textbox | ✅ Yes | Product description |
| 3 | Price | `price` | Number | ✅ Yes | Product price in ₹ |
| 4 | Product Image | `image` | File (Image) | ✅ Yes | Product image |
| 5 | Category | `category` | Select | ✅ Yes | Product category |
| 6 | Stock Count | `countInStock` | Number | ✅ Yes | Available stock |
| 7 | Rating | `rating` | Number | ⭕ No | Rating (0-5) |

---

## 🎽 Category Field Setup

The **Category** field should be configured as a **Select** dropdown with these exact options:

```
Display Name: Category
UID: category
Field Type: Select
Mandatory: Yes

Options:
  - Men's Clothing
  - Women's Clothing
  - Accessories
  - Footwear
```

⚠️ **Important:** Use the exact category names as shown above (with apostrophes and proper capitalization) for the filter to work correctly.

---

## 🛍️ Category Descriptions

### 1. Men's Clothing
Products for men including:
- T-Shirts, Shirts
- Jeans, Trousers, Shorts
- Jackets, Hoodies
- Ethnic Wear (Kurtas)
- Suits & Blazers

### 2. Women's Clothing
Products for women including:
- Tops, Blouses, Dresses
- Jeans, Trousers, Skirts
- Ethnic Wear (Sarees, Kurtis, Salwar Suits)
- Jackets, Coats
- Leggings

### 3. Accessories
Fashion accessories including:
- Belts
- Bags & Backpacks
- Scarves, Stoles
- Sunglasses
- Watches
- Jewelry

### 4. Footwear
All types of footwear:
- Formal Shoes
- Casual Shoes
- Sneakers
- Sandals
- Slippers
- Boots

---

## 📄 Sample Product Entries

### Example 1: Men's T-Shirt
```json
{
  "title": "Cotton Crew Neck T-Shirt",
  "description": "Premium 100% cotton t-shirt with comfortable fit. Perfect for casual wear.",
  "price": 799,
  "image": {
    "url": "https://images.contentstack.io/.../mens-tshirt.jpg"
  },
  "category": "Men's Clothing",
  "countInStock": 100,
  "rating": 4.5
}
```

### Example 2: Women's Kurti
```json
{
  "title": "Floral Print Cotton Kurti",
  "description": "Beautiful printed kurti with comfortable fit. Ideal for daily wear.",
  "price": 1299,
  "image": {
    "url": "https://images.contentstack.io/.../womens-kurti.jpg"
  },
  "category": "Women's Clothing",
  "countInStock": 75,
  "rating": 4.7
}
```

### Example 3: Leather Belt (Accessory)
```json
{
  "title": "Genuine Leather Belt",
  "description": "Premium quality leather belt with metal buckle. Suitable for formal and casual wear.",
  "price": 599,
  "image": {
    "url": "https://images.contentstack.io/.../belt.jpg"
  },
  "category": "Accessories",
  "countInStock": 150,
  "rating": 4.4
}
```

### Example 4: Sports Shoes (Footwear)
```json
{
  "title": "Running Sports Shoes",
  "description": "Lightweight running shoes with excellent cushioning and grip. Perfect for workouts.",
  "price": 2499,
  "image": {
    "url": "https://images.contentstack.io/.../sports-shoes.jpg"
  },
  "category": "Footwear",
  "countInStock": 60,
  "rating": 4.6
}
```

---

## 🔄 How It Works

### 1. Home Page Load:
```javascript
// src/screens/Homescreen.js
dispatch(getAllProducts()); // Fetches all entries from "home" content type
```

### 2. API Call:
```javascript
// src/actions/productActions.js
const PRODUCTS_CONTENT_TYPE = "home"; // Changed from "products" to "home"
const result = await contentstackAPI.getEntriesByContentType(PRODUCTS_CONTENT_TYPE);
```

### 3. Filter Component:
The filter now shows 4 clothing categories:
- Men's Clothing
- Women's Clothing
- Accessories
- Footwear

### 4. Search & Filter:
Users can:
- **Search** by product name
- **Sort** by Popular / High to Low / Low to High (price)
- **Filter** by category

---

## 📊 Data Flow

```
Contentstack CMS ("home" content type)
         ↓
contentstackAPI.getEntriesByContentType("home")
         ↓
transformProductEntries() - Convert to app format
         ↓
Redux Store (getAllProductsReducer)
         ↓
Homescreen Component + Filter Component
         ↓
Display Products with Search & Filter
```

---

## 🎨 Filter Features

### Search:
- Search products by name
- Case-insensitive
- Real-time filtering

### Sort:
- **Popular** - Default order
- **High to Low** - Price descending
- **Low to High** - Price ascending

### Category Filter:
- **All** - Show all products
- **Men's Clothing** - Only men's items
- **Women's Clothing** - Only women's items
- **Accessories** - Only accessories
- **Footwear** - Only footwear

---

## ⚙️ Setup Steps

### Step 1: Create Content Type in Contentstack

1. Go to **Content Models** in Contentstack
2. Click **Add Content Type**
3. Enter:
   - **Display Name:** Home
   - **UID:** `home` (must be exactly this)
4. Click **Create**

### Step 2: Add Fields

Add all 7 fields listed above with exact UIDs:
- `title` (Product Name)
- `description` (Description)
- `price` (Price)
- `image` (Product Image)
- `category` (Category - Select field)
- `countInStock` (Stock Count)
- `rating` (Rating - optional)

### Step 3: Configure Category Field

For the **category** field:
1. Select **Select** as field type
2. Click **Add Option** for each category:
   - Men's Clothing
   - Women's Clothing
   - Accessories
   - Footwear
3. Make it **Mandatory**

### Step 4: Add Product Entries

1. Go to **Entries**
2. Select **home** content type
3. Click **Add Entry**
4. Fill in all required fields
5. Select appropriate category from dropdown
6. Click **Save & Publish**

### Step 5: Add Multiple Products

Create at least 8-12 products:
- 3-4 in Men's Clothing
- 3-4 in Women's Clothing
- 2-3 in Accessories
- 2-3 in Footwear

### Step 6: Test Your Store

```bash
cd /Users/hari.prakash/Documents/personal/ecom/pixel-ecommerce-frontend
npm start
```

Test:
1. ✅ Products load on home page
2. ✅ Filter component is visible
3. ✅ Search works
4. ✅ Category filter works
5. ✅ Price sorting works
6. ✅ Product details page works

---

## 🐛 Troubleshooting

### Products not loading?
```
✓ Check content type UID is exactly "home"
✓ Verify entries are published (not just saved)
✓ Check browser console for errors
✓ Verify API credentials in src/config.js
```

### Filter not showing correct categories?
```
✓ Check category values match exactly: "Men's Clothing" (with apostrophe)
✓ Verify category field UID is "category"
✓ Clear browser cache and reload
```

### Search not working?
```
✓ Ensure product has a "title" field
✓ Check that entries are published
✓ Try exact product name first
```

---

## 🎯 Quick Checklist

Before testing:
- [ ] Content type "home" created in Contentstack
- [ ] All 7 fields added with correct UIDs
- [ ] Category field configured as Select dropdown
- [ ] At least 8-10 product entries created
- [ ] All entries are published (not just saved)
- [ ] API credentials added to src/config.js
- [ ] App is running: `npm start`

---

## 📝 Important Notes

1. **Content Type UID:** Must be exactly `home` (lowercase)
2. **Category Values:** Must match exactly (including apostrophes):
   - `Men's Clothing`
   - `Women's Clothing`
   - `Accessories`
   - `Footwear`
3. **Publishing:** Always click "Publish" after saving entries
4. **Image Format:** Use JPG, PNG, or WebP (recommended size: 800x800px)
5. **Price:** Enter as number without currency symbol (e.g., 2999 for ₹2,999)

---

## 🔄 What Changed?

### Before:
- Content Type: `products`
- Categories: Electronics, Fashion, Mobiles, Games
- Filter: Commented out

### After:
- Content Type: `home` ✨
- Categories: Men's Clothing, Women's Clothing, Accessories, Footwear ✨
- Filter: Active and visible ✨

---

## 📞 Need Help?

If you encounter issues:

1. **Check the content type UID:**
   ```javascript
   // In src/actions/productActions.js
   const PRODUCTS_CONTENT_TYPE = "home"; // Should be "home"
   ```

2. **Verify category values in Contentstack** match exactly what's in Filter.js

3. **Check browser console** for detailed error messages

4. **Ensure entries are published** in Contentstack

---

## 🎉 You're All Set!

Once you've created the content type and added entries, your clothing e-commerce store will:
- ✅ Load products from "home" content type
- ✅ Show search bar for finding products
- ✅ Display 4 clothing categories in filter
- ✅ Allow sorting by price
- ✅ Support clicking products for details

Happy selling! 🛍️

