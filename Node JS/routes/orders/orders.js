const router = require('express').Router();
const pool = require('../../config/database');


const userProductId = 1;

router.get('/', (req, res) => {

    const orderGetItemQuery = `select * from cart_items where cartId = ' ${userProductId}' and personId = '${userProductId}' `;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(orderGetItemQuery, (err, result) => {

            if (err) { console.log(err); }

            if ((result.length > 0)) {
                res.status(200).json({
                    data: result
                })
            } else {
                res.status(200).json({ "data": "NoOrders" });
            }
            connection.release();
        })
    })
})



router.post('/addToCart', (req, res) => {

    const { imageId, categoryName, productImagePath, productName, categoryItems, productDescription, groupId, imageColor,price} = req.body.orderData;

    const defaultQuantity = 1;


    const searchItemQuery = `select * from cart_items where productId = ' ${imageId}'`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(searchItemQuery, (err, result) => {

            if (err) { console.log(err); }

            if (result.length == 0) {

                const orderItemQuery = `insert into cart_items values ('${userProductId}','${userProductId}','${imageId}','${categoryName}','${productImagePath}','${productName}','${categoryItems}','${productDescription}','${groupId}','${imageColor}','${defaultQuantity}','${price}','${price}')`;
                pool.getConnection((err, connection) => {
                    if (err) console.log(err);
                    connection.query(orderItemQuery, (err, result) => {

                        if (err) { console.log(err); }

                        res.status(200).json({
                            data: "Added To Cart"
                        })
                        connection.release();
                    })
                })
            } else {
                res.status(200).json({
                    data: "Already in cart"
                })
            }
            connection.release();
        })
    })

})


router.delete('/deleteItems/:id', (req, res) => {

    const deleteProductId = req.params.id;

    const deleteItemQuery = `delete from  cart_items where productId =' ${deleteProductId}' and personId = '${userProductId}' and cartId= '${userProductId}'`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(deleteItemQuery, (err, result) => {

            if (err) { console.log(err); }

            res.status(200).json({
                data: "Product Removed"
            })
            connection.release();
        })
    })
})


router.post('/updateQuantity', (req, res) => {

    const { UpdateProductId, Quantitycount, UpdatedPrice } = req.body;

    const updateQuantityQuery = `update cart_items set quantity= '${Quantitycount}', price='${UpdatedPrice}' where personId ='${userProductId}' and productId='${UpdateProductId}' `;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(updateQuantityQuery, (err, result) => {

            if (err) { console.log(err); }

            res.status(200).json({
                data: "Quantity and Price Chanaged"
            })
            connection.release();
        })
    })
})




module.exports = router;