export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
});
