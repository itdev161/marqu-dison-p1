// Object with env varibles that will be used throughout the web app
module.exports = {
    ENV: process.env.NODE_ENV ||'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 
    'mongodb+srv://proxystudent:proxystu@cluster0.imzkb.mongodb.net/Cluster0?retryWrites=true&w=majority'
}