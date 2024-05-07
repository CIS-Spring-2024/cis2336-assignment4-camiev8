const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTP; set to true for HTTPS
}));

// Initialize cart in session
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Routes to serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/blogs', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blogs.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'views', 'products.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/mission', (req, res) => res.sendFile(path.join(__dirname, 'views', 'mission.html')));
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

// Handle cart updates
app.post('/update-cart', (req, res) => {
    const { productId, action } = req.body;
    const productIndex = req.session.cart.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        if (action === 'increment') {
            req.session.cart[productIndex].quantity += 1;
        } else if (action === 'decrement' && req.session.cart[productIndex].quantity > 0) {
            req.session.cart[productIndex].quantity -= 1;
        }
        res.json({ success: true, message: "Cart updated", cart: req.session.cart });
    } else {
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

// Get total price
app.get('/cart-total', (req, res) => {
    const total = req.session.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    res.json({ total });
});

// Route to process checkout
app.post('/checkout', (req, res) => {
    const total = req.session.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    req.session.cart = []; // Optionally clear cart after checkout
    res.json({ message: "Order processed", total: total });
});

app.get('/order-confirmation', (req, res) => res.sendFile(path.join(__dirname, 'views', 'order-confirmation.html')));
app.use((req, res) => res.status(404).send("Page not found"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
