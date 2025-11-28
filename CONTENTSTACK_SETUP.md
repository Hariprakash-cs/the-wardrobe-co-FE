# Contentstack CMS Setup Guide for E-commerce Products

This guide will help you set up Contentstack CMS to manage your e-commerce products.

## 📋 Overview

Your e-commerce frontend now loads products from Contentstack CMS instead of the backend API. This allows you to manage products through a user-friendly CMS interface.

## 🔧 Configuration Steps

### Step 1: Add Contentstack Credentials

1. Open `/src/config.js`
2. Add your Contentstack credentials:

```javascript
contentstack: {
  apiKey: "YOUR_API_KEY_HERE",
  accessToken: "YOUR_DELIVERY_TOKEN_HERE",
  environment: "production", // or your environment name
}
```

**How to get your credentials:**

- Log in to your Contentstack account
- Go to Settings → Stack → API Credentials
- Copy the **API Key** and **Delivery Token**

### Step 2: Create Content Type in Contentstack

Create a new Content Type with UID: **`products`** (you can change this in `/src/actions/productActions.js` if needed)

#### Required Fields for Products Content Type:

| Field Name    | Field Type                    | UID                       | Required | Description          |
| ------------- | ----------------------------- | ------------------------- | -------- | -------------------- |
| Product Name  | Single Line Textbox           | `title` or `name`         | Yes      | Name of the product  |
| Description   | Multi Line Textbox            | `description`             | Yes      | Product description  |
| Price         | Number                        | `price`                   | Yes      | Product price        |
| Product Image | File (Image)                  | `image`                   | Yes      | Product image        |
| Category      | Single Line Textbox or Select | `category`                | Yes      | Product category     |
| Stock         | Number                        | `countInStock` or `stock` | Yes      | Available quantity   |
| Rating        | Number                        | `rating`                  | No       | Product rating (0-5) |

#### Field Details:

1. **Product Name** (`title` or `name`)

   - Type: Single Line Textbox
   - Display Name: "Product Name"
   - UID: `title` (preferred) or `name`
   - Mandatory: Yes

2. **Description** (`description`)

   - Type: Multi Line Textbox
   - Display Name: "Description"
   - UID: `description`
   - Mandatory: Yes

3. **Price** (`price`)

   - Type: Number
   - Display Name: "Price"
   - UID: `price`
   - Mandatory: Yes

4. **Product Image** (`image`)

   - Type: File
   - Display Name: "Product Image"
   - UID: `image`
   - Mandatory: Yes
   - Allowed File Types: Images only

5. **Category** (`category`)

   - Type: Single Line Textbox (or Select for predefined categories)
   - Display Name: "Category"
   - UID: `category`
   - Mandatory: Yes

6. **Stock** (`countInStock`, `stock`, or `quantity`)

   - Type: Number
   - Display Name: "Stock Count"
   - UID: `countInStock` (preferred), `stock`, or `quantity`
   - Mandatory: Yes
   - Default Value: 0

7. **Rating** (`rating`)
   - Type: Number
   - Display Name: "Rating"
   - UID: `rating`
   - Mandatory: No
   - Default Value: 0
   - Min: 0, Max: 5

### Step 3: Create Product Entries

1. Go to your **products** Content Type
2. Click "Add Entry"
3. Fill in all required fields:

   - Product Name
   - Description
   - Price (numeric value)
   - Upload Product Image
   - Select/Enter Category
   - Enter Stock Count
   - (Optional) Enter Rating

4. Click "Save" and then "Publish" to make the product available

### Step 4: Test the Integration

1. Make sure your Contentstack credentials are added in `config.js`
2. Start your React app:
   ```bash
   npm start
   ```
3. The home page should now load products from Contentstack CMS
4. Click on a product to view its details (loaded from CMS)

## 🎯 How It Works

### Home Page (Product Listing)

- Fetches all entries from the `products` content type
- Displays products in a grid layout
- Each product shows: image, name, rating, and price

### Product Detail Page

- When you click on a product, it uses the product's UID from Contentstack
- Fetches the specific entry details from CMS
- Displays full product information including description

### Data Flow

```
Contentstack CMS → contentstackAPI → transformProductEntry → Redux Store → React Components
```

## 📝 Content Type UID Configuration

The default content type UID is `products`. To change it:

1. Open `/src/actions/productActions.js`
2. Change the value of `PRODUCTS_CONTENT_TYPE`:
   ```javascript
   const PRODUCTS_CONTENT_TYPE = "your_content_type_uid";
   ```

## 🔄 Data Transformation

The CMS data is automatically transformed to match your app's format. The transformation handles:

- Different field naming conventions (e.g., `title` → `name`)
- Nested image objects (extracts URL from `image.url`)
- Stock field variations (`countInStock`, `stock`, `quantity`)
- Default values for optional fields

## 🎨 Optional Fields & Customization

You can add additional custom fields to your Contentstack content type:

- Product Variants (size, color)
- Brand
- Tags
- Featured Product (boolean)
- Sale Price
- Product Specifications (group field)

These fields will be preserved in the product object and accessible in your components.

## 🐛 Troubleshooting

### Products not loading?

1. Check browser console for error messages
2. Verify your API credentials in `config.js`
3. Ensure your content type UID matches `PRODUCTS_CONTENT_TYPE`
4. Make sure entries are published (not just saved)
5. Check that the environment name matches your Contentstack environment

### Images not displaying?

1. Verify the image field UID is `image` or `product_image`
2. Ensure images are uploaded and saved in Contentstack
3. Check that the image URL is accessible (not restricted)

### "No matching entry found" error?

1. The product UID might be incorrect
2. Ensure the product entry exists and is published
3. Check the environment configuration

## 📚 API Reference

### Available API Methods

```javascript
import { contentstackAPI } from "./services/contentstackAPI";

// Get all products
const result = await contentstackAPI.getEntriesByContentType("products");

// Get specific product by UID
const product = await contentstackAPI.getEntryByUid("products", "product_uid");

// Search products by field
const results = await contentstackAPI.searchEntries(
  "products",
  "search_term",
  "title"
);
```

## 🎉 Next Steps

1. ✅ Add Contentstack credentials to config
2. ✅ Create the products content type
3. ✅ Add product entries
4. ✅ Publish entries
5. ✅ Test the application
6. Consider adding more fields as needed
7. Set up content workflows in Contentstack for better content management

## 📞 Support

If you encounter any issues:

1. Check Contentstack API documentation: https://www.contentstack.com/docs/developers/apis/content-delivery-api/
2. Review the browser console for detailed error messages
3. Verify all required fields are properly configured in your content type

---

**Note:** The cart, checkout, orders, and user management still use the backend API. Only product display and details are loaded from Contentstack CMS.
