// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;




// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    // Render the order form
    res.sendFile(__dirname + '/order-form.html'); // Assuming order-form.html is in the same directory as server.js
});
// Route for handling the checkout process
app.get('/checkout', (req, res) => {
    const totalAmount = req.query.totalAmount; // Extract total amount from URL parameter

    // Render the order confirmation page with the total amount
    res.render('orderConfirmation', { totalAmount: totalAmount });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/checkout.html', (req, res) => {
    const { item1Quantity, item2Quantity } = req.body;
    // Validation
    if (parseInt(item1Quantity) < 0 || parseInt(item2Quantity) < 0) {
        res.status(400).send('Quantities should be positive');
        return;
    }
    // Redirect to checkout.html page
    res.redirect('/checkout.html');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    window.location.href = "checkout.html"; // Redirect to checkout.html
  });