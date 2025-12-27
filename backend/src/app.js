const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');

// Routes imports
const mainRoutes = require('./routes/main');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/shop/wishlistRoutes');

const app = express();

// Static files
app.use(express.static(path.resolve(__dirname, '../public')));

// Template Engine - REMOVED

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(require('cors')());

// Session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET_1 || 'S3cr3t01', process.env.SESSION_SECRET_2 || 'S3cr3t02'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Routes
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/wishlist', wishlistRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found', message: 'The requested resource could not be found.' });
});

// Error Handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
