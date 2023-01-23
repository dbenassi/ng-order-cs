var express = require('express');
var router = express.Router();

const dao = require('./dao');

//INSERT ROW
router.post('/', async (req, res) => {
    const order_id = req.body.order_id;
    const article_id = req.body.article_id;
    const amount = req.body.amount;
    const options = req.body.options;

    dao.createRow(order_id, article_id, amount, options)
        .then(() => res.end())
        .catch((err) => res.status(500).json(err))
    
})