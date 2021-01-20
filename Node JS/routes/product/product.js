const router = require('express').Router();
const pool = require('../../config/database');

router.get('/:groupId', (req, res) => {   
    const groupProductId=req.params.groupId;
    const productItemQuery = `select * from products where groupId = '${groupProductId}';`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(productItemQuery, (err, result) => {

            if (err) { console.log(err); }
            if ((result.length > 0)) {
                res.status(200).json({
                    data: result,
                })
            } else {
                res.status(404).json({ "data": "notFound" });
            }
            connection.release();
        })
    })
})



module.exports=router;