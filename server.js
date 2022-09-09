const http = require('http')
var express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const server = http.createServer(app)

// -------- Config ------------//
require('dotenv').config()
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const jsonParser = bodyParser.json();

// MONGODB
const dbpass = process.env.DB_PASS
const dbComposer = 'mongodb+srv://tupi:'+dbpass+'@feedback-jovens-cluster.5j4whs8.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient;
const url = dbComposer

// Pasta Estatica
app.use(express.static('public'));

app.get('/', async function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("miau")
        var dbo = db.db("feedback-jovens");
        dbo.collection("feedback").find({}).toArray(function(err, result) {
          if (err) throw err;
          var feedback = result
          db.close();
          res.render('feedback', {feedback:feedback});
        })
    });
});

app.post('/add-comentario', jsonParser, async function(req, res) {
    var Comentario = req.body.Comentario
    var Data = req.body.Data
    MongoClient.connect(url, function(err, db) {
        console.log("")
        console.log("Salvando na Database...")
        if (err) throw err;
        var dbo = db.db("feedback-jovens");
        dbo.collection("feedback").insertOne({Comentario,Data}, function(err, res) {
          if (err) throw err;
          console.log("CONFIRMADO!")
          console.log(Comentario+" Inserido com sucesso!");
          db.close();
          console.log("Database Fechada")
          console.log("====================================================")
        });
    });
    return res.status(200).json({ msg: "Comentario adicionado" })
});



// INIT
server.listen(process.env.PORT)