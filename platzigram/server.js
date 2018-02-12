var express = require('express');

var app = express();

app.set('view engine', 'pug');//Para desirle a express utilizando node que nuestra aplicacion va utilizar un motor de vistas

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})
