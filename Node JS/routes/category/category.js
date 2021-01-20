const router = require('express').Router();
const pool = require('../../config/database');


router.get('/', (req, res) => {
    const getAllCategoryItems = `select * from category`;
    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(getAllCategoryItems, (err, result) => {

            if (err) { console.log(err); res.status(400).json({ "status": "notFound" });  }

            if ((result.length > 0)) {
                res.status(200).json({
                    data:result
                })
            } else {
                res.status(404).json({ "data": "notFound" });
            }

                connection.release();
        })
    })
})



router.get('/get/:imageId', (req, res) => {

    const searchCategoryItem = req.params.imageId;
    const searchSpecificQuery = `select * from products where categoryName= '${searchCategoryItem}';`;

    pool.getConnection((err, connection) => {

        if (err) console.log(err);
        connection.query(searchSpecificQuery, (err, result) => {

            if (err) { console.log(err); }

            if ((result.length > 0)) {
                res.status(200).json({
                    data:result
                })
            } else {
                res.status(404).json({ "data": "notFound" });
                
            }
            connection.release();
        })
    })
})


router.get('/getItems', (req, res) => {

    const getItemsQuery = `select categoryName from category;`;

    pool.getConnection((err, connection) => {

        if (err) console.log(err);
        connection.query(getItemsQuery, (err, result) => {

            if (err) { console.log(err); }

            if ((result.length > 0)) {
                res.status(200).json({
                    data:result
                })
            } else {
                res.status(404).json({ "data": "notFound" });
                
            }
            connection.release();
        })
    })
})


module.exports = router;