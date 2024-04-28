const { request } = require('express');
const express = require('express')
const app = express()


//database connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ProductsDB'
});
 try {
connection.connect();
console.log('connection successful');
 } catch (error) {
    console.log('error connecting');s
 };


// r
app.get('/api/products/', (req, res) => {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
  res.json(result);
    });
});

// GET method route
app.get('/api/products/', (req, res) => {
  res.send('GET request to the homepage')
})

// GET by id method route
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    connection.query("SELECT * FROM products WHERE id =?", [id], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  res.json(result); 
})
});

// POST method route
app.post('/api/products/', (req, res) => {
    const prod = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        active: req.body.active
    }
    connection.query("INSERT products SET ?", prod, function (err,result, fields) {
        if (err) throw err;
        console.log(result);
  res.json(prod);
})

})

// PATCH method route
app.patch('/api/products/', (req, res) => {

  const id = req.body.id;
    const prod = { 
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        active: req.body.active
    }
    connection.query("UPDATE products SET ? WHERE id=?",  [prod,id], function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows + "Updated");
        console.log(result);
  res.json(prod);
})
});

// DELETE method route
app.delete('/api/products/:id', (req, res) => {
  res.send('DELETE request to the homepage')
})

app.listen(8080);