var express = require('express');
var router = express.Router();

const dao = require('./dao');

//GET ALL ARTICLES
router.get('/', async (req, res) => {
    dao.getAllArticles()
        .then((articles) => res.json(articles))
        .catch((err) => res.status(500).json(err))
})

//GET ARTICLE BY ID
router.get('/:id', async (req, res) => {
    const key = req.params.id;
    dao.getArticleById(key)
        .then((art) => res.json(art))
        .catch((err) => res.status(500).json(err))
})

//CREATE ARTICLE
router.post('/', async(req, res) => {
    let desc = req.body.description;
    let price = req.body.price;

    dao.createArticle(desc, price)
        .then(() => res.end())
        .catch((err) => res.status(500).json(err))
})

//DELETE ARTICLE
router.delete('/:id', async (req, res) => {
    let key = req.params.id;
    
    dao.deleteArticle(key)
        .then(() => res.end())
        .catch((err) => res.status(500).json(err))
})

//EDIT ARTICLE NAME
router.put('/', async (req,res) => {
    let id = req.body.id;
    let desc = req.body.description;
    let price = req.body.price;

    dao.editArticle(id, desc, price)
        .then(() => res.end())
        .catch((err) => res.status(500).json(err))
})


