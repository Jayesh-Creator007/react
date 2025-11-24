const express = require('express');
const app = express();
const PORT = 5000;

const products = require('./views/layout/product');

const services = require('./views/layout/data')
app.set('view engine', 'ejs');
app.use(express.static('views/layout'));


app.get('/', (req, res) => {
    res.render("pages/index", {
        title: "home"
    })
})


app.get('/about', (req, res) => {
    res.render("pages/about", {
        title: "about",
        services
    })
})

app.get('/product', (req, res) => {
    res.render("pages/product", {
        title: "product",
        products
    })
})

app.get('/contact', (req, res) => {
    res.render("pages/contact", {
        title: "Contact"
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
