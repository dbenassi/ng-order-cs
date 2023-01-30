'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('orderdb.db', (err) => { if (err) throw err; });

/*TABLE: ORDINE*/

//Get all orders
exports.getAllOrders = () => {
    const SQL_GETALL = `SELECT ORDINE.ID AS ID, NOME, DAY, TIME, TOTALE, COMPLETATO
                        FROM CLIENTE JOIN ORDINE ON CLIENTE.ID = ORDINE.ID_CLIENTE`

    return new Promise((resolve, reject) => {
        db.all(SQL_GETALL, (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'Empty DB!' });
            else
                resolve(rows);
        })
    })
}

//Get orders by date
exports.getOrdersByDate = (day) => {
    const SQL_GETBYDATE = `SELECT ORDINE.ID AS ID, NOME, DAY, TIME, TOTALE, COMPLETATO
                           FROM CLIENTE JOIN ORDINE ON CLIENTE.ID = ORDINE.ID_CLIENTE
                           WHERE DAY=?`

    return new Promise((resolve, reject) => {
        db.all(SQL_GETBYDATE, [day], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'There are no orders for the selected date.' });
            else
                resolve(rows);
        })
    })
}

//Get order by ID
exports.getOrderById = (id) => {
    const SQL_GETBYID = `SELECT ORDINE.ID, CLIENTE.NOME, ORDINE.DAY, ORDINE.TIME, ORDINE.TOTALE, ORDINE.COMPLETATO,
                         FROM CLIENTE JOIN ORDINE ON CLIENTE.ID=ORDINE.ID_CLIENTE
                         WHERE ORDINE.ID=?`

    return new Promise((resolve, reject) => {

        db.get(SQL_GETBYID, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'Order not found' })
            else
                resolve(rows)
        })
    })
}


//Set order completed
exports.setCompleted = (id) => {
    const SQL_SETCOMPLETED = `UPDATE ORDINE
                              SET COMPLETATO=1
                              WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_SETCOMPLETED, [id], (err) => {
            if (err)
                reject(err);
            else
                resolve(true)
        })
    })
}

//Delete order by id
exports.deleteOrder = (id) => {
    const SQL_DELETE = `DELETE FROM ORDINE WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_DELETE, [id], (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        })
    })
}

//Edit order
exports.editOrder = (id, new_day, new_time) => {
    const SQL_EDIT = `UPDATE ORDINE
                      SET DAY=?, TIME=?
                      WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_EDIT, [new_day, new_time, id], (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
    

}

exports.createOrder = (day, time, id_cliente) => {
    const SQL_CREATEORDER = `INSERT INTO ORDINE(ID_CLIENTE, DAY, TIME)
                             VALUES(?, ?, ?)`

    return new Promise((resolve, reject) => {
        db.run(SQL_CREATEORDER, [id_cliente, day, time], (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
}

/********************************************/

/*TABLE: RIGA*/

//Get order rows
exports.getRows = (order_id) => {
    const SQL_GETROWS = `SELECT DESCRIZIONE, QUANTITA, OPTIONS
                         FROM RIGA JOIN ARTICOLO ON RIGA.ID_ARTICOLO=ARTICOLO.ID
                         WHERE RIGA.ID_ORDINE=?`

    return new Promise((resolve, reject) => {
        db.all(SQL_GETROWS, [order_id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'Empry order' });
            else
                resolve(rows);
        })
    })

}

//Edit row
exports.editRow = (id, new_amount, new_options) => {
    const SQL_EDITAMOUNT = `UPDATE RIGA
                            SET QUANTITA=?, OPTIONS=?
                            WHERE ID=?`
    return new Promise((resolve, reject) => {
        db.run(SQL_EDITAMOUNT, [new_amount, new_options, id], (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
}

//Create row
exports.createRow = (order_id, article_id, amount, options) => {
    const SQL_CREATEROW = `INSERT INTO RIGA(ID_ORDINE, ID_ARTICOLO, QUANTITA, OPTIONS) 
                           VALUES(?, ?, ?, ?)`

    return new Promise((resolve, reject) => {
        db.run(SQL_CREATEROW, [order_id, article_id, amount, options], (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        })
    })
    
}

//Delete row
exports.deleteRow = (row_id) => {
    const SQL_DELETEROW = `DELETE FROM RIGA WHERE RIGA.ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_DELETEROW, [row_id], (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
    
}

/********************************************/

/*TABLE: ARTICOLO*/

//Get all articles
exports.getAllArticles = () => {
    const SQL_GETROWS = `SELECT *
                         FROM ARTICOLO`

    return new Promise((resolve, reject) => {
        db.all(SQL_GETROWS, (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'No articles in memory' });
            else
                resolve(rows);
        })
    })
    
}

//Get article by ID
exports.getArticleById = (id) => {
    const SQL_GETROWS = `SELECT *
                         FROM ARTICOLO
                         WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.get(SQL_GETROWS, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                reject({ error: 'Article not found' });
            else
                resolve(rows);
        })
    })
}

//Delete article
exports.deleteArticle = (id) => {
    const SQL_DELETEARTICLE = `DELETE FROM ARTICOLO WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_DELETEARTICLE, [id], (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        })
    })
}

//Edit article
exports.editArticle = (id, desc, price) => {
    const SQL_EDITNAME = `UPDATE ARTICOLO
                          SET DESCRIZIONE=?, PREZZO=?
                          WHERE ID=?`

    return new Promise((resolve, reject) => {
        db.run(SQL_EDITNAME, [desc, price, id], (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
    
}

//Create new article
exports.createArticle = (desc, price) => {
    const SQL_CREATE = `INSERT INTO ARTICOLO(DESCRIZIONE, PREZZO) VALUES(?, ?)`;

    return new Promise((resolve, reject) => {
        db.run(SQL_CREATE, [desc, price], (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        })
    })
}