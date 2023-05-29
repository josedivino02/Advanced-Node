export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1390544478456133',
    clientSecret:
      process.env.FB_CLIENT_SECRET ?? '9210dceb724ad8e5610e7d14a91383e6',
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '38cdxhnf30',
};
