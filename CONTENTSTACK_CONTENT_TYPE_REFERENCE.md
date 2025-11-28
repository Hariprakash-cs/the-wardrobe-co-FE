# Contentstack Content Type Reference Guide

## 📋 Quick Reference for Content Type Creation

### Content Type Configuration

**Display Name:** Products  
**UID:** `products`  
**Description:** E-commerce product catalog

---

## 🔧 Field Definitions (Copy-Paste Ready)

### Field 1: Product Name ⭐ REQUIRED

```
Display Name: Product Name
UID: title
Field Type: Single Line Textbox
Mandatory: Yes
Unique: No
Multiple: No
Help Text: Enter the product name (e.g., "Wireless Bluetooth Headphones")
```

---

### Field 2: Description ⭐ REQUIRED

```
Display Name: Description
UID: description
Field Type: Multi Line Textbox
Mandatory: Yes
Rich Text Editor: No (or Yes if you want formatting)
Help Text: Enter detailed product description
```

---

### Field 3: Price ⭐ REQUIRED

```
Display Name: Price
UID: price
Field Type: Number
Mandatory: Yes
Min: 0
Max: (leave empty)
Help Text: Enter product price (e.g., 2999 for ₹2,999)
```

---

### Field 4: Product Image ⭐ REQUIRED

```
Display Name: Product Image
UID: image
Field Type: File
Mandatory: Yes
Multiple: No
File Size: Maximum 5MB
Allowed File Types: Images only (jpg, png, webp)
Help Text: Upload product image (recommended size: 800x800px)
```

---

### Field 5: Category ⭐ REQUIRED

```
Display Name: Category
UID: category
Field Type: Single Line Textbox
Mandatory: Yes
Help Text: Enter product category (e.g., "Electronics", "Clothing", "Accessories")
```

**Alternative (for predefined categories):**

```
Display Name: Category
UID: category
Field Type: Select
Mandatory: Yes
Options:
  - Electronics
  - Clothing
  - Accessories
  - Home & Garden
  - Sports
  - Books
  - Toys
  - Food & Beverages
  - Other
Help Text: Select product category
```

---

### Field 6: Stock Count ⭐ REQUIRED

```
Display Name: Stock Count
UID: countInStock
Field Type: Number
Mandatory: Yes
Min: 0
Default Value: 0
Help Text: Enter available stock quantity (e.g., 50)
```

---

### Field 7: Rating (Optional)

```
Display Name: Rating
UID: rating
Field Type: Number
Mandatory: No
Min: 0
Max: 5
Default Value: 0
Help Text: Product rating from 0 to 5 (e.g., 4.5)
```

---

## 🎨 Optional Fields for Enhanced Product Management

### Field 8: Brand

```
Display Name: Brand
UID: brand
Field Type: Single Line Textbox
Mandatory: No
Help Text: Product brand name (e.g., "Samsung", "Nike")
```

---

### Field 9: SKU

```
Display Name: SKU
UID: sku
Field Type: Single Line Textbox
Mandatory: No
Unique: Yes
Help Text: Stock Keeping Unit / Product Code (e.g., "PRD-001")
```

---

### Field 10: Tags

```
Display Name: Tags
UID: tags
Field Type: Tags
Mandatory: No
Help Text: Add searchable tags (e.g., "wireless", "bluetooth", "audio")
```

---

### Field 11: Featured Product

```
Display Name: Featured Product
UID: featured
Field Type: Boolean
Mandatory: No
Default Value: false
Help Text: Mark this product as featured on home page
```

---

### Field 12: Sale Price

```
Display Name: Sale Price
UID: sale_price
Field Type: Number
Mandatory: No
Min: 0
Help Text: Discounted price (leave empty if no sale)
```

---

### Field 13: Product Images Gallery

```
Display Name: Product Images
UID: product_images
Field Type: File
Mandatory: No
Multiple: Yes (Allow multiple files)
File Size: Maximum 5MB
Allowed File Types: Images only
Help Text: Upload additional product images for gallery
```

---

### Field 14: Specifications

```
Display Name: Specifications
UID: specifications
Field Type: Group
Mandatory: No
Help Text: Add product specifications

Sub-fields:
  - Specification Name (Single Line Textbox)
  - Specification Value (Single Line Textbox)

Allow Multiple: Yes
```

---

### Field 15: Product Variants

```
Display Name: Product Variants
UID: variants
Field Type: Group
Mandatory: No
Help Text: Add product variants (size, color, etc.)

Sub-fields:
  - Variant Name (e.g., "Size", "Color")
  - Variant Options (e.g., "Small, Medium, Large")
  - Price Adjustment (Number)
  - Stock (Number)

Allow Multiple: Yes
```

---

### Field 16: Video URL

```
Display Name: Product Video
UID: video_url
Field Type: Link
Mandatory: No
Help Text: YouTube or Vimeo video URL
```

---

### Field 17: Meta Title (SEO)

```
Display Name: Meta Title
UID: meta_title
Field Type: Single Line Textbox
Mandatory: No
Character Limit: 60
Help Text: SEO title for search engines
```

---

### Field 18: Meta Description (SEO)

```
Display Name: Meta Description
UID: meta_description
Field Type: Multi Line Textbox
Mandatory: No
Character Limit: 160
Help Text: SEO description for search engines
```

---

## 📊 Content Type Settings (Advanced)

### Publishing Settings

```
Workflow: (Optional) Create approval workflow
Publishing Rules: Define who can publish
Versioning: Enable to track changes
```

### Display Settings

```
Title Field: Set "title" as the entry title
URL Pattern: /products/{title}
Preview URL: Your frontend URL + /product/{uid}
```

### Localization (Optional)

```
Enable Localization: Yes (if multi-language support needed)
Languages: en-us (English), es (Spanish), etc.
```

---

## 🎯 Example Product Entry

Here's an example of a complete product entry:

```
Title: Premium Wireless Headphones
Description: High-quality Bluetooth headphones with active noise cancellation...
Price: 2999
Image: [Upload image file]
Category: Electronics
Stock Count: 50
Rating: 4.5
Brand: AudioTech
SKU: PRD-WH-001
Tags: wireless, bluetooth, headphones, audio, noise-cancelling
Featured: Yes
Sale Price: 2499
```

---

## ✅ Validation Rules

Recommended validation for each field:

- **Title:** 3-100 characters
- **Description:** 10-5000 characters
- **Price:** Greater than 0
- **Category:** Must be selected
- **Stock:** Must be 0 or greater
- **Rating:** 0-5 range

---

## 🔄 Workflow Suggestions

### For Small Teams:

```
Draft → Review → Publish
```

### For Larger Teams:

```
Draft → Content Review → SEO Review → Final Approval → Publish
```

---

## 📱 Mobile App Support

If you plan to use this for mobile apps, consider adding:

- Deep link URL
- App-specific images (different sizes)
- Push notification settings
- In-app purchase ID

---

## 🌐 Multi-Language Setup

If you need multi-language support:

1. Enable localization in stack settings
2. Set fallback language (usually en-us)
3. Mark localizable fields:
   - Title ✓
   - Description ✓
   - Category ✓
   - (Price usually not localized)

---

## 🎨 UI Display Priority

Suggested field order in Contentstack editor:

1. Product Name (title)
2. Category
3. Price
4. Sale Price (if applicable)
5. Product Image
6. Description
7. Stock Count
8. Rating
9. Brand
10. SKU
11. Tags
12. Featured
13. (Other optional fields)

---

## 📝 Notes

- **UID Importance:** Field UIDs must match exactly what's defined in the transformation function
- **Image URLs:** Contentstack returns full CDN URLs automatically
- **Required Fields:** Ensure all required fields have values before publishing
- **Publishing:** Entries must be published to be visible in the app

---

## 🚀 Quick Start Steps

1. Log in to Contentstack
2. Go to Content Models
3. Click "Add Content Type"
4. Name it "Products" with UID `products`
5. Add fields in order (start with required fields)
6. Save content type
7. Go to Entries
8. Click "Add Entry" to create first product
9. Fill in all fields
10. Click "Save & Publish"

---

**Need Help?** Refer to:

- `CONTENTSTACK_SETUP.md` for detailed setup
- `CMS_INTEGRATION_CHECKLIST.md` for step-by-step checklist
- `PRODUCT_ENTRY_EXAMPLE.json` for data structure examples
