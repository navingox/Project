const router = require('express').Router();
const pool = require('../../config/database');

router.get('/', (req, res) => {
      
    const lastusername = "navin@gmail.com";
    const recommendItemQuery = `select * from products where productName IN (select distinct lastSearch from recommendations where username = '${lastusername}')`;

    pool.getConnection((err, connection) => {

        if (err) console.log(err);
        connection.query(recommendItemQuery, (err, result) => {

            if (err) { console.log(err); }

            if ((result.length > 0)) {
                res.status(200).json({
                    data: result
                })
            } else {
                res.status(404).json({ "data": "notFound" });
            }
            connection.release();
        })
    })
})

module.exports = router;