const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoute = require('./routes/category/category');
const ordersRoute = require('./routes/orders/orders');
const recommendedRoute = require('./routes/recommended/recommended');
const searchRoute = require('./routes/search/search');
const profileRoute = require('./routes/profile/profile');
const productAddRoute = require('./routes/productInsert/productAdd');
const productRoute = require('./routes/product/product');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("uploads"));


app.use('/category', categoryRoute);
app.use('/orders', ordersRoute);
app.use('/recommended', recommendedRoute);
app.use('/search', searchRoute);
app.use('/profile', profileRoute);
app.use('/addProduct', productAddRoute);
app.use('/product', productRoute);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server Running port : ${PORT}`);
})