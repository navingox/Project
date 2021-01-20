const router = require('express').Router();
const pool = require('../../config/database');

router.get('/:searchItem',(req,res)=>{

    const searchItem = req.params.searchItem;
    const searchItemQuery = `select * from products where productName LIKE '%${searchItem}%' or categoryName LIKE '%${searchItem}%' `;

    //user email embedded
    const userEmail="navin@gmail.com";

    pool.getConnection((err, connection) => {

        if (err) {console.log(err); res.status(404).json({ "error": "Error" }); }
        connection.query(searchItemQuery, (err, result) => {

            if (err) { console.log(err); res.status(404).json({ "error": "Error" }); }

            if ((result.length > 0)) {
                insertSearchItem(userEmail,result[0].productName);
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


const insertSearchItem=(username,item)=>{
    const insertSearchItemQuery = `insert into recommendations values ('${username}','${item}')`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(insertSearchItemQuery, (err, result) => {
            if (err) { console.log(err); res.status(404).json({ "data": "unableToInsert" })}
            connection.release();
        })
    })
}
module.exports = router;