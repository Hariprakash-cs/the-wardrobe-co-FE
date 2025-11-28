# 🔗 Product Details Flow - Complete Guide

## 📋 How It Works

### Flow Overview:

```
User clicks product card (Home Page)
         ↓
Navigate to: /product/{uid}
         ↓
Productdescscreen component loads
         ↓
Calls: getProductById(uid)
         ↓
Fetches from: Contentstack CMS "home" content type
         ↓
Gets specific entry by UID
         ↓
Transforms data to app format
         ↓
Displays product details with all fields
```

---

## 🎯 Complete Data Flow

### 1. **Home Page - Product Card Click**

**File:** `src/components/Product.js`

```javascript
<Link to={`product/${product._id}`}>
  {" "}
  // ← Uses UID from Contentstack
  <img src={product.image} />
  <h1>{product.name}</h1>
  <Rating initialRating={product.rating} />
  <h1>Price : {product.price}</h1>
</Link>
```

**What Happens:**

- User clicks on product card
- React Router navigates to: `/product/bltb94e6c18131ae07a`
- The `bltb94e6c18131ae07a` is the UID from Contentstack

---

### 2. **Product Details Page Loads**

**File:** `src/screens/Productdescscreen.js`

```javascript
useEffect(() => {
  dispatch(getProductById(params.id)); // ← Fetches product by UID
}, []);
```

**What Happens:**

- Component reads UID from URL params
- Dispatches Redux action to fetch product

---

### 3. **Redux Action Fetches from CMS**

**File:** `src/actions/productActions.js`

```javascript
export const getProductById = (productid) => async (dispatch) => {
  // Fetch from Contentstack CMS
  const result = await contentstackAPI.getEntryByUid(
    "home", // ← Content type
    productid // ← Entry UID
  );

  // Transform to app format
  const product = transformProductEntry(result.data);

  // Update Redux store
  dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: product });
};
```

**API Call:**

```
GET https://cdn.contentstack.io/v3/content_types/home/entries/bltb94e6c18131ae07a
Headers:
  api_key: blt2920829618faa573
  access_token: cs735d2fa1012c15bdfc708585
  environment: prod
```

---

### 4. **Data Transformation**

**File:** `src/services/contentstackAPI.js`

Your Contentstack structure is transformed to match the app's expected format:

#### **Your Contentstack Fields:**

```json
{
  "uid": "bltb94e6c18131ae07a",
  "title": "Light Weight Flannel Plaid Shirt",
  "description": "Vibrant plaid pattern...",
  "price": 999,
  "product_image": {
    "url": "https://images.contentstack.io/.../4mss4480-01_1.webp"
  },
  "category": "Men's Clothing",
  "stock_count": 50,
  "rating": 9,
  "available_sizes": ["S", "M", "L", "XL", "XXL"]
}
```

#### **Transformed to App Format:**

```json
{
  "_id": "bltb94e6c18131ae07a",
  "name": "Light Weight Flannel Plaid Shirt",
  "description": "Vibrant plaid pattern...",
  "price": 999,
  "image": "https://images.contentstack.io/.../4mss4480-01_1.webp",
  "category": "Men's Clothing",
  "countInStock": 50,
  "rating": 9,
  "available_sizes": ["S", "M", "L", "XL", "XXL"],
  "cmsEntry": true
}
```

---

## 🔄 Field Mapping Reference

| Contentstack Field  | App Field         | Transformation           |
| ------------------- | ----------------- | ------------------------ |
| `uid`               | `_id`             | Direct mapping           |
| `title`             | `name`            | Direct mapping           |
| `description`       | `description`     | Direct mapping           |
| `price`             | `price`           | Direct mapping           |
| `product_image.url` | `image`           | Extracts URL from object |
| `category`          | `category`        | Direct mapping           |
| `stock_count`       | `countInStock`    | Renamed field            |
| `rating`            | `rating`          | Direct mapping           |
| `available_sizes`   | `available_sizes` | Preserved as-is          |

---

## 🎨 Product Details Page Display

### What Gets Displayed:

1. **Product Image** (large view)
2. **Product Name** (heading)
3. **Price** (with tax info)
4. **Available Sizes** (NEW! Badges showing S, M, L, XL, XXL)
5. **Quantity Selector** (dropdown)
6. **Service Icons:**
   - Cash on Delivery
   - Fast Delivery
   - 7 Days Replacement
   - 1 Year Warranty
7. **Add to Cart Button** (disabled if out of stock)
8. **Product Description** (full details)
9. **Reviews Section** (if available)

---

## 💡 New Features Added

### Available Sizes Display

Your product entries can now show available sizes!

**In Product Details Page:**

```javascript
{
  product.available_sizes && product.available_sizes.length > 0 && (
    <div>
      <p>
        <b>Available Sizes:</b>
      </p>
      <div className="d-flex gap-2">
        {product.available_sizes.map((size) => (
          <span className="badge bg-secondary">{size}</span>
        ))}
      </div>
    </div>
  );
}
```

**Displays as:**

```
Available Sizes:  [ S ]  [ M ]  [ L ]  [ XL ]  [ XXL ]
```

---

## 🧪 Testing the Flow

### Step 1: Start Your App

```bash
npm start
```

### Step 2: Navigate to Home Page

```
http://localhost:3000/
```

You should see your product:

- Title: "Light Weight Flannel Plaid Shirt"
- Price: 999
- Rating: 9 stars
- Image: Plaid shirt

### Step 3: Click on Product Card

URL changes to:

```
http://localhost:3000/product/bltb94e6c18131ae07a
```

### Step 4: Product Details Page Loads

You should see:

- ✅ Large product image
- ✅ Product name
- ✅ Price: ₹ 999
- ✅ **Available Sizes: S M L XL XXL** (NEW!)
- ✅ Quantity selector
- ✅ Add to Cart button
- ✅ Product description
- ✅ Service icons

### Step 5: Check Console (DevTools)

You should see:

```javascript
✅ Loaded product from Contentstack: {
  _id: "bltb94e6c18131ae07a",
  name: "Light Weight Flannel Plaid Shirt",
  price: 999,
  image: "https://images.contentstack.io/...",
  countInStock: 50,
  available_sizes: ["S", "M", "L", "XL", "XXL"]
}
```

### Step 6: Check Network Tab

You should see:

```
Request: GET https://cdn.contentstack.io/v3/content_types/home/entries/bltb94e6c18131ae07a
Status: 200 OK
Response: { "entry": { "uid": "blt...", "title": "...", ... } }
```

---

## 🔍 Debugging

### Console Logs to Watch For:

**When clicking product:**

```javascript
🔄 Transformed entry: {
  uid: "bltb94e6c18131ae07a",
  name: "Light Weight Flannel Plaid Shirt",
  image: "https://images.contentstack.io/...",
  price: 999,
  countInStock: 50
}

✅ Loaded product from Contentstack: {...}
```

### Common Issues:

#### Issue 1: Product Not Found (404)

```
Error: Contentstack API Error: Not Found
```

**Cause:** Entry UID doesn't exist or isn't published

**Solution:**

- Check the entry exists in Contentstack
- Ensure it's published (not just saved)
- Verify the UID matches

---

#### Issue 2: Image Not Showing

```
Console: 🔄 Transformed entry: { image: null }
```

**Cause:** Field name mismatch

**Solution:**
Your field should be named `product_image` (not `image`)

**Verify in Contentstack:**

- Field UID: `product_image`
- Field Type: File (Image)

---

#### Issue 3: Stock Shows as 0

```
Console: countInStock: 0
```

**Cause:** Field name mismatch

**Solution:**
Your field should be named `stock_count` (not `countInStock`)

**Verify in Contentstack:**

- Field UID: `stock_count`
- Field Type: Number

---

## 📊 Complete Route Flow

```
Home Page (/)
  → Product.js component
    → Link: /product/{uid}
      → React Router matches route
        → Loads: Productdescscreen.js
          → useEffect runs
            → dispatch(getProductById(uid))
              → API call to Contentstack
                → GET /content_types/home/entries/{uid}
                  → Response with entry data
                    → transformProductEntry()
                      → Redux store updated
                        → Component re-renders
                          → Display product details!
```

---

## ✅ Verification Checklist

Test these scenarios:

- [ ] Click product card from home page
- [ ] URL changes to `/product/{uid}`
- [ ] Product details page loads
- [ ] Image displays correctly
- [ ] Product name shows
- [ ] Price displays as ₹ 999
- [ ] Available sizes show (S, M, L, XL, XXL)
- [ ] Quantity selector works (1-50)
- [ ] Add to Cart button is enabled
- [ ] Product description shows full text
- [ ] Console shows success messages
- [ ] Network tab shows API call to Contentstack
- [ ] No errors in console

---

## 🎯 Summary

### What's Working:

✅ **Home Page:**

- Loads all products from "home" content type
- Displays product cards with image, name, price, rating
- Click product card navigates to details

✅ **Product Details Page:**

- Loads specific entry from "home" content type by UID
- Fetches from Contentstack CMS (not backend)
- Transforms data to match app format
- Displays all product information
- Shows available sizes (NEW!)
- Add to cart functionality works

✅ **Field Mapping:**

- `product_image` → `image` (extracts URL)
- `stock_count` → `countInStock`
- `title` → `name`
- All other fields preserved

✅ **API Calls:**

- Home page: GET /content_types/home/entries
- Details page: GET /content_types/home/entries/{uid}
- Both use your Contentstack credentials

---

## 🚀 Next Steps

1. **Add More Products:**

   - Create more entries in Contentstack
   - Publish them
   - They'll automatically appear on home page

2. **Test Different Categories:**

   - Add products in different categories
   - Test the filter functionality
   - Verify category filtering works

3. **Test Search:**

   - Use the search bar
   - Search by product name
   - Verify results appear correctly

4. **Enhance Product Details:**
   - Add more custom fields in Contentstack
   - They'll be preserved in transformation
   - Access via `product.your_field_name`

---

**Everything is now loading from Contentstack CMS!** 🎉

Click on any product card and it will load the full details from the CMS automatically!
