module.exports = { 
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    //CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://wine-vinyard-app.now.sh/",
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/wine-vinyard',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }