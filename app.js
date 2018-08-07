const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database')

mongoose.connect(config.database,{useNewUrlParser: true});
let db = mongoose.connection;


db.once('open',() => {
  console.log('server connected');
});

db.on('error',(err) => {
  console.log(err);
});

const app = express();

const port = 3000;

const users = require('./routes/users');


app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initiaize());
app.use(passport.session());

app.use('/users',users);

app.get('/', (req,res) => {
  res.send('Invalid endpoint');
});


app.listen(port, () => {
  console.log('Server started on port '+port);
});
