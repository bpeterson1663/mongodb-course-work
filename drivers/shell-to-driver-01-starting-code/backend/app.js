const path = require('path');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);

const uri = "mongodb+srv://daily-user:"+process.env.MONGO_PASSWORD+"@cluster0.ybtum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("ERROR", err)
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
})

app.listen(3100);
