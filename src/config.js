export const config = {
  api: process.env.REACT_APP_API_URL || "http://localhost:5001",

  // Contentstack CMS Configuration
  contentstack: {
    apiKey: process.env.REACT_APP_CONTENTSTACK_API_KEY,
    accessToken: process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN,
    environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT || "main",
    spaceUid: "amb10a029ae0e10001",
    organizationUid: "blt9a324a7f77db1ef9",
    assetAccessToken: "bltfa7b223de9dce42e",
    workspace: "main",
  },
};
