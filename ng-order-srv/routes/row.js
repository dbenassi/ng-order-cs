var express = require('express');
const { response } = require('../app');
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

//GET ROWS BY ORDER ID
router.get('/:id', async (req,res) => {
    const order_id = req.params.id;

    dao.getRows(order_id)
        .then((rows) => res.json(rows))
        .catch((err) => res.status(500).json(err))
})

//EDIT ROW
router.put('/:id', async (req, res) => {
    const row_id = req.params.id;
    const new_amount = req.body.amount;
    const new_options = req.body.options;
    
    dao.editRow(row_id, new_amount, new_options)
        .then(() => res.end())
        .catch((err) => res.status(500).json(err))
})

module.exports = router;