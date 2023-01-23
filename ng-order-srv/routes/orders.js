var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const Orders = require('./schema/Order')

const dao = require('./dao');
const { Router } = require('express');

mongoose.connect("mongodb://127.0.0.1:27017/ordersdb", {
  useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
  if (err)
    console.log(err);
  else
    console.log("DB connected")
})

const articles = [
  'Penne all\'arrabbiata',
  'Risotto alla marinara',
  'Fritto di pesce',
  'Scaloppine al limone',
  'Spinaci',
  'Patate fritte',
  'Panna cotta'
];

//WORKS!!
async function createOrders(nome, num, t) {

  const order = await Orders.create({ 
    id: num, 
    name: nome,
    items: [
      { item: articles[0], amount: 3 },
      { item: articles[2], amount: 1 },
      { item: articles[4], amount: 2 },
      { item: articles[6], amount: 1 },
    ],
    date: "11/01/23",
    time: t,
    completed: false
   })
}

async function readOrders(){
  const ordList = await Orders.find();
  return ordList;
}

/* GET orders listing. */
/*router.get('/list', function (req, res, next) {

  //let jsonResDB = readOrders().then(list);
  readOrders().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })

});*/

//GET ALL ORDERS
router.get('/list', async (req, res) => {
  dao.getAllOrders()
     .then((orders) => res.json(orders))
     .catch((error) => res.status(500).json(error))
})

//GET ORDER BY DATE
router.get('/:date', async (req, res) => {
  const date = req.params.date;
  dao.getOrdersByDate(date)
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json(err))
})

//TO-DO : CREATE NEW ORDER


module.exports = router;
