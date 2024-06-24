const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

let products = [];
let errors = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { products, errors });
});

app.post('/add-product', (req, res) => {
    const { name, price, description, index } = req.body;
    if (name && price) {
        if (index) {
            // Update existing product
            products[index] = { name, price, description };
        } else {
            // Add new product
            products.push({ name, price, description });
        }
        errors = [];
    } else {
        errors = ['Product name and price are required'];
    }
    res.redirect('/');
});

app.post('/remove-product', (req, res) => {
    const { index } = req.body;
    products.splice(index, 1);
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('error', { message: '404 Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});