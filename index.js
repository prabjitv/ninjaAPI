const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//setup

const app = express();
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//init routes
app.use('/api', router);

//error handling middleware

app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message})
})


//listen for requests

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests')
});