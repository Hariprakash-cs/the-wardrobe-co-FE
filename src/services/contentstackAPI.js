// Contentstack CMS API Service for E-commerce
// Documentation: https://www.contentstack.com/docs/developers/apis/content-delivery-api/

import { config } from "../config";
import assetMapping from "../data/assetMapping.json";

const CONTENTSTACK_CONFIG = {
  baseURL: "https://cdn.contentstack.io/v3",
  apiKey: config.contentstack.apiKey,
  accessToken: config.contentstack.accessToken,
  environment: config.contentstack.environment || "production",
};

// Helper function to make API calls
const contentstackFetch = async (endpoint, options = {}) => {
  try {
    const url = `${CONTENTSTACK_CONFIG.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        api_key: CONTENTSTACK_CONFIG.apiKey,
        access_token: CONTENTSTACK_CONFIG.accessToken,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Contentstack API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Contentstack API Error:", error);
    return { success: false, error: error.message };
  }
};

// ============================================
// CONTENTSTACK API METHODS
// ============================================

export const contentstackAPI = {
  /**
   * Get all entries for a specific content type
   * @param {string} contentTypeUid - Content type UID (e.g., 'products')
   * @param {object} query - Additional query parameters
   */
  getEntriesByContentType: async (contentTypeUid, query = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();

      // Add limit parameter if provided
      if (query.limit !== undefined) {
        queryParams.append("limit", query.limit);
      }

      // Add skip parameter if provided
      if (query.skip !== undefined) {
        queryParams.append("skip", query.skip);
      }

      // Add include_count parameter to get total count
      queryParams.append("include_count", "true");

      // Add environment
      if (CONTENTSTACK_CONFIG.environment) {
        queryParams.append("environment", CONTENTSTACK_CONFIG.environment);
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";

      const result = await contentstackFetch(
        `/content_types/${contentTypeUid}/entries${queryString}`
      );

      if (result.success && result.data.entries) {
        return {
          success: true,
          data: result.data.entries,
          count: result.data.count || result.data.entries.length,
          total: result.data.count || result.data.entries.length,
        };
      }

      return result;
    } catch (error) {
      console.error(`Error fetching entries for ${contentTypeUid}:`, error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get a specific entry by UID
   * @param {string} contentTypeUid - Content type UID
   * @param {string} entryUid - Entry UID
   */
  getEntryByUid: async (contentTypeUid, entryUid) => {
    try {
      const queryParams = new URLSearchParams();

      // Add environment
      if (CONTENTSTACK_CONFIG.environment) {
        queryParams.append("environment", CONTENTSTACK_CONFIG.environment);
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";

      const result = await contentstackFetch(
        `/content_types/${contentTypeUid}/entries/${entryUid}${queryString}`
      );

      if (result.success && result.data.entry) {
        return {
          success: true,
          data: result.data.entry,
        };
      }

      return result;
    } catch (error) {
      console.error(`Error fetching entry ${entryUid}:`, error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Search entries by field value
   * @param {string} contentTypeUid - Content type UID
   * @param {string} field - Field name to query
   * @param {string} value - Field value to match
   */
  getEntryByField: async (contentTypeUid, field, value) => {
    try {
      const query = {
        query: JSON.stringify({
          [field]: value,
        }),
      };

      const queryParams = new URLSearchParams(query);

      // Add environment
      if (CONTENTSTACK_CONFIG.environment) {
        queryParams.append("environment", CONTENTSTACK_CONFIG.environment);
      }

      const queryString = queryParams.toString();
      const result = await contentstackFetch(
        `/content_types/${contentTypeUid}/entries?${queryString}`
      );

      if (
        result.success &&
        result.data.entries &&
        result.data.entries.length > 0
      ) {
        return {
          success: true,
          data: result.data.entries[0], // Return first matching entry
        };
      }

      return { success: false, error: "No matching entry found" };
    } catch (error) {
      console.error(`Error fetching entry by ${field}:`, error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Search entries with text search
   * @param {string} contentTypeUid - Content type UID
   * @param {string} searchQuery - Search term
   * @param {string} searchField - Field to search in (default: 'title')
   */
  searchEntries: async (contentTypeUid, searchQuery, searchField = "title") => {
    try {
      const query = {
        query: JSON.stringify({
          [searchField]: { $regex: searchQuery, $options: "i" },
        }),
      };

      const queryParams = new URLSearchParams(query);

      // Add environment
      if (CONTENTSTACK_CONFIG.environment) {
        queryParams.append("environment", CONTENTSTACK_CONFIG.environment);
      }

      const queryString = queryParams.toString();
      const result = await contentstackFetch(
        `/content_types/${contentTypeUid}/entries?${queryString}`
      );

      if (result.success && result.data.entries) {
        return {
          success: true,
          data: result.data.entries,
          count: result.data.entries.length,
        };
      }

      return result;
    } catch (error) {
      console.error("Error searching entries:", error);
      return { success: false, error: error.message };
    }
  },
};

// ============================================
// DATA TRANSFORMATION UTILITIES
// ============================================

/**
 * Transform Contentstack product entry to app format
 * Expected CMS fields:
 * - title (or name): Product name
 * - description: Product description
 * - price: Product price
 * - image: Product image (can be nested as image.url)
 * - category: Product category
 * - stock (or countInStock or count_in_stock): Available stock
 * - rating: Product rating (optional)
 */
export const transformProductEntry = (entry) => {
  // Extract image URL from nested structure
  let imageUrl = null;
  if (
    entry.product_image &&
    typeof entry.product_image === "object" &&
    entry.product_image.url
  ) {
    // First check product_image (your actual field name)
    imageUrl = entry.product_image.url;
  } else if (
    entry.image &&
    typeof entry.image === "object" &&
    entry.image.url
  ) {
    imageUrl = entry.image.url;
  } else if (typeof entry.image === "string") {
    imageUrl = entry.image;
  } else if (typeof entry.product_image === "string") {
    imageUrl = entry.product_image;
  } else if (entry.thumbnail && typeof entry.thumbnail === "object") {
    imageUrl = entry.thumbnail.url;
  }

  // Keep original image URL from CMS (no conversion needed for display)

  // Handle multiple possible field names for stock
  const countInStock =
    entry.stock_count ||
    entry.countInStock ||
    entry.count_in_stock ||
    entry.stock ||
    entry.quantity ||
    0;

  // Handle product name
  const productName =
    entry.title || entry.name || entry.product_name || "Untitled Product";

  // Handle category - could be array or string
  let category = entry.category || "Uncategorized";
  if (Array.isArray(category)) {
    category = category[0] || "Uncategorized";
  }

  const transformed = {
    _id: entry.uid, // Use Contentstack UID as product ID
    name: productName,
    description: entry.description || "",
    price: entry.price || 0,
    image: imageUrl,
    category: category,
    countInStock: countInStock,
    rating: entry.ratings || entry.rating || 0, // Handle both 'ratings' and 'rating'
    reviews: entry.reviews || [],
    // Additional fields from your Contentstack
    available_sizes: entry.available_sizes || [],
    stock_count: entry.stock_count || 0,
    product_image: entry.product_image || null,
    ratings: entry.ratings || entry.rating || 0, // Preserve original field
    // Preserve all original CMS fields
    ...entry,
    // Ensure we keep the original UID for reference
    uid: entry.uid,
    cmsEntry: true, // Flag to indicate this is from CMS
  };

  console.log("🔄 Transformed entry:", {
    uid: transformed.uid,
    name: transformed.name,
    image: transformed.image,
    price: transformed.price,
    countInStock: transformed.countInStock,
  });

  return transformed;
};

/**
 * Bulk transform product entries
 */
export const transformProductEntries = (entries) => {
  if (!Array.isArray(entries)) return [];
  return entries.map(transformProductEntry);
};

/**
 * Fetch asset details including visual markups from Asset Management API
 * @param {string} bltUid - The blt asset UID from the image URL
 */
export const getAssetDetails = async (bltUid) => {
  try {
    // Look up the AM UID from the mapping
    const amUid = getAmUidFromMapping(bltUid);

    if (!amUid) {
      console.warn(`No AM mapping found for blt UID: ${bltUid}`);
      return { success: false, error: `No AM mapping found for ${bltUid}` };
    }

    const spaceUid = config.contentstack.spaceUid;
    const organizationUid = config.contentstack.organizationUid;
    const accessToken = config.contentstack.assetAccessToken;
    const workspace = config.contentstack.workspace || "main";

    const url = `https://am-api.contentstack.com/api/spaces/${spaceUid}/assets/${amUid}?locale=en-us&workspace=${workspace}`;

    console.log(`Fetching visual markups for blt:${bltUid} -> am:${amUid}`);

    const response = await fetch(url, {
      headers: {
        accept: "application/json, text/plain, */*",
        access_token: accessToken,
        organization_uid: organizationUid,
        "x-cs-api-version": "4",
      },
    });

    if (!response.ok) {
      throw new Error(`Asset API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data: data.asset };
  } catch (error) {
    console.error("Error fetching asset details:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Extract blt asset UID from Contentstack CDN image URL
 * @param {string} url - Image URL (e.g., https://images.contentstack.io/v3/assets/{stack_uid}/{blt_asset_uid}/...)
 */
export const extractAssetUid = (url) => {
  if (!url || typeof url !== "string") return null;

  // Match pattern for Contentstack CDN URL: /assets/{stack_uid}/{blt_asset_uid}/
  // Example: https://images.contentstack.io/v3/assets/blt1234.../blt3a0427aa1530248b/...
  const cdnPattern = /\/assets\/[^/]+\/(blt[a-z0-9]+)\//i;
  const match = url.match(cdnPattern);
  return match ? match[1] : null;
};

/**
 * Get the AM (Asset Management) UID from a blt UID using the mapping file
 * @param {string} bltUid - The blt asset UID from Contentstack
 */
export const getAmUidFromMapping = (bltUid) => {
  if (!bltUid || !assetMapping.mappings) return null;
  return assetMapping.mappings[bltUid] || null;
};

export default contentstackAPI;
