const router = require('express').Router();
const pool = require('../../config/database');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage })


router.post('/', upload.single('photo'), (req, res) => {

    const fileName = "http://localhost:8000/" + req.file.filename;
    const { CategoryName, productName, categoryItems , productDescription ,price, groupId , imageColor} = req.body;

    const insertQuery = `insert into products (CategoryName,productImagePath,productName,categoryItems,productDescription,price,groupId,imageColor) values('${CategoryName}','${fileName}','${productName}','${categoryItems}','${productDescription}','${price}','${groupId}','${imageColor}');`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        connection.query(insertQuery, (err, result) => {

            if (err) { console.log(err); res.status(404).json({ "data": "notFound" }) }

            if ((result)) {
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