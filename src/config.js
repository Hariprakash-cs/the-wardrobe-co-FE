export const config = {
  api: "http://localhost:5001",
  // api:"https://pixel-shops.herokuapp.com"
  // api:"https://pixel-ecommerce-backend.vercel.app"

  // Contentstack CMS Configuration
  contentstack: {
    apiKey: "blt3435e7e7f3e56dcc", // Add your Contentstack API Key here
    accessToken: "cseab624052afe37759c0de021", // Add your Contentstack Delivery Token here
    environment: "main", // or your environment name
    spaceUid: "amb10a029ae0e10001", // Asset Management space UID
    organizationUid: "blt9a324a7f77db1ef9", // Organization UID
    assetAccessToken: "bltfa7b223de9dce42e", // Asset Management access token
    workspace: "main", // Workspace name
  },
};
