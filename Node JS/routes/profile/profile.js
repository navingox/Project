const router = require('express').Router();
const pool = require('../../config/database');

router.get('/', (req, res) => {
    const getProfileQuery = `select * from profile`;
    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(getProfileQuery, (err, result) => {

            if (err) { console.log(err); res.status(400).json({ "status": "notFound" }) }

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