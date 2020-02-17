module.exports = { 
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/wine-vinyard',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/wine-vinyard-test',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    API_KEY: process.env.REACT_APP_API_KEY,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||'https://wine-vinyard-app.now.sh/'
  }