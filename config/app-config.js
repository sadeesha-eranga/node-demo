module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || `mongodb://admin:KPS2qtz5upvRVMe3@localhost:27017/donation?authSource=admin`,
    JWT_SECRET: process.env.JWT_SECRET || '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
};
