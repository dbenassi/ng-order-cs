var express = require('express');
var router = express.Router();

const dao = require('./dao');

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

//GET ORDER BY ID
router.get('/id/:id', async (req, res) => {
  const date = req.params.id;
  dao.getOrdersById(date)
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json(err))
})

//CREATE ORDER
router.post('/', async (req, res) => {
  const day = req.body.day;
  const time = req.body.time;
  const id_cliente = req.body.id_cliente;

  dao.createOrder(day, time, id_cliente)
    .then(() => res.end())
    .catch((err) => res.status(500).json(err))
})

//DELETE ORDER BY ID
router.delete('/:id', async(req, res) => {
  const order_id = req.params.id;

  dao.deleteOrder(order_id)
    .then(() => res.end())
    .catch((err) => res.status(500).json(err))
})

//SET ORDER COMPLETED
router.put('/:id', async (req, res) => {
  const order_id = req.params.id;

  dao.setCompleted(order_id)
    .then(() => res.end())
    .catch((err) => res.status(500).json(err))
})

//EDIT ORDER 
router.put('/edit/:id', async (req, res) => {
  const order_id = req.params.id;

  dao.setCompleted(order_id)
    .then(() => res.end())
    .catch((err) => res.status(500).json(err))
})

module.exports = router;
