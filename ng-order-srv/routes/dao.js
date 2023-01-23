'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('orderdb.db', (err) => {if (err) throw err;});

/*TABLE: ORDINE*/

//Get all orders
exports.getAllOrders = () => {
    const SQL_GETALL = `SELECT ORDINE.ID, CLIENTE.NOME, DAY, TIME, TOTALE, COMPLETATO
                        FROM CLIENTE JOIN ORDINE ON CLIENTE.ID = ORDINE.ID_CLIENTE`

    return new Promise((resolve, reject) => {
        db.all(SQL_GETALL, (err, rows) => {
            if(err)
                reject(err);
            else if(rows === undefined)
                reject({ error: 'Empty DB!'});
            else
                resolve(rows);
        })
    })
}

//Get orders by date
exports.getOrdersByDate = (day) => {
    const SQL_GETBYDATE = `SELECT ORDINE.ID, CLIENTE.NOME, DAY, TIME, TOTALE, COMPLETATO
                           FROM CLIENTE JOIN ORDINE ON CLIENTE.ID = ORDINE.ID_CLIENTE
                           WHERE DAY=?`
    
    return new Promise((resolve, reject) => {
        db.get(SQL_GETBYDATE, [day], (err, rows) => {
            if(err)
                reject(err);
            else if(rows === undefined)
                reject({error: 'There are no orders for the selected date.'});
            else
                resolve(rows);
        })
    })
}

//Set order completed
exports.setCompleted = (id) => {
    const SQL_SETCOMPLETED = `UPDATE ORDINE
                              SET COMPLETATO=1
                              WHERE ID=?`
    
    db.run(SQL_SETCOMPLETED, [id], (err) => {
        if(err)
            reject(err);
        else
            resolve(true)
    })
}

//Delete order by id
exports.deleteOrder = (id) => {
    const SQL_DELETE = `DELETE FROM ORDINE WHERE ID=?`

    db.run(SQL_DELETE, [id], (err) => {
        if(err)
            reject(err);
        else
            resolve(true);
    })
}

//Edit order date
exports.editOrderDate = (id, new_day) => {
    const SQL_EDIT = `UPDATE ORDINE
                      SET DAY=?
                      WHERE ID=?`

    db.run(SQL_EDIT, [new_day, id], (err) => {
        if(err)
            reject(err)
        else    
            resolve(true)
    })

}

//Edit order time
exports.editOrderTime = (id, new_time) => {
    const SQL_EDIT = `UPDATE ORDINE
                      SET TIME=?
                      WHERE ID=?`
    
    db.run(SQL_EDIT, [new_time, id], (err) => {
        if(err)
            reject(err);
        else
            resolve(true);
    })
}

/********************************************/

/*TABLE: RIGA*/

//Get order rows
exports.getRows = (order_id) => {
    const SQL_GETROWS = `SELECT ARTICOLO.DESCRIZIONE, QUANTITA, OPTIONS
                         FROM RIGA JOIN ARTICOLO ON RIGA.ID_ARTICOLO=ARTICOLO.ID
                         WHERE RIGA.ID_ORDINE=?`

    db.get(SQL_GETROWS, [order_id], (err, rows) => {
        if(err)
            reject(err);
        else if(rows === undefined)
            reject({error: 'Empry order'});
        else
            resolve(rows);
    })
}

//Edit row amount
exports.editAmount = (id, new_amount) => {
    const SQL_EDITAMOUNT = `UPDATE RIGA
                            SET QUANTITA=?
                            WHERE ID=?`

    db.run(SQL_EDITAMOUNT, [new_amount, id], (err) => {
        if(err)
            reject(err)
        else
            resolve(true)
    })
}

//Edit row options
exports.setOptions = (id, options) => {
    const SQL_SETOPTIONS = `UPDATE RIGA
                            SET OPTIONS=?
                            WHERE ID=?`

    db.run(SQL_SETOPTIONS, [options, id], (err) => {
        if(err)
            reject(err);
        else
            resolve(true);
    })
}

//Create row
exports.createRow = (order_id, article_id, amount, options) => {
    const SQL_CREATEROW = `INSERT INTO RIGA(ID_ORDINE, ID_ARTICOLO, QUANTITA, OPTIONS) 
                           VALUES(?, ?, ?, ?)`
    
    db.run(SQL_CREATEROW, [order_id, article_id, amount, options], (err) => {
        if(err)
            reject(err);
        else    
            resolve(true);
    })
}



/********************************************/

/*TABLE: ARTICOLO*/

//Get all articles
exports.getAllArticles = () => {
    const SQL_GETROWS = `SELECT *
                         FROM ARTICOLO`

    db.get(SQL_GETROWS, (err, rows) => {
        if(err)
            reject(err);
        else if(rows === undefined)
            reject({error: 'No articles in memory'});
        else
            resolve(rows);
    })
}

//Get article by ID
exports.getArticleById = (id) => {
    const SQL_GETROWS = `SELECT *
                         FROM ARTICOLO
                         WHERE ID=?`

    db.get(SQL_GETROWS, [id], (err, rows) => {
        if(err)
            reject(err);
        else if(rows === undefined)
            reject({error: 'Article not found'});
        else
            resolve(rows);
    })
}

//Delete article
exports.deleteArticle = (id) => {
    const SQL_DELETEARTICLE = `DELETE FROM ARTICOLO WHERE ID=?`

    db.run(SQL_DELETEARTICLE, [id], (err) => {
        if(err)
            reject(err);
        else    
            resolve(true);
    })
}

//Edit article
exports.editArticle = (id, desc, price) => {
    const SQL_EDITNAME = `UPDATE ARTICOLO
                          SET DESCRIZIONE=?, PREZZO=?
                          WHERE ID=?`
    
    db.run(SQL_EDITNAME, [desc, price, id], (err) => {
        if(err)
            reject(err)
        else
            resolve(true)
    })
}

//Create new article
exports.createArticle = (desc, price) => {
    const SQL_CREATE = `INSERT INTO ARTICOLO(DESCRIZIONE, PREZZO) VALUES(?, ?)`;

    db.run(SQL_CREATE, [desc, price], (err) => {
        if(err)
            reject(err);
        else
            resolve(true);
    })
}