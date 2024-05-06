
const express = require('express');

const bodyParser = require('body-parser');
 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
 
const products = [

    { id: 1, name: 'Product 1', price: 5.00 },

    { id: 2, name: 'Product 2', price: 10.00 },

    { id: 3, name: 'Product 3', price: 15.00 }

];
 
// Serve the checkout form

app.get('/checkout', (req, res) => {

    res.sendFile(__dirname + '/checkout.html');  // Assuming checkout.html is in the same directory as server.js

});
 
// Process the form data and calculate total

app.post('/process-checkout', (req, res) => {

    const { item1Quantity, item2Quantity, item3Quantity } = req.body;
 
    if (parseInt(item1Quantity) < 0 || parseInt(item2Quantity) < 0 || parseInt(item3Quantity) < 0) {

        return res.status(400).send('Quantities should be positive.');

    }
 
    const totalAmount = (products[0].price * parseInt(item1Quantity)) +

                        (products[1].price * parseInt(item2Quantity)) +

                        (products[2].price * parseInt(item3Quantity));
 
    res.redirect(`/confirmation?total=${totalAmount}`);

});
 
// Serve the confirmation page with the total amount

app.get('/confirmation', (req, res) => {

    const totalAmount = req.query.total;

    res.send(`<h1>Checkout Complete</h1><p>Total Amount: $${totalAmount}</p>`);

});
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});
