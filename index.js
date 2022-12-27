// módulos
const bodyParser = require("body-parser");
const express = require("express");

const { engine } = require ('express-handlebars');
const handlebars = require("express-handlebars")

const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin")

const path = require("path")

//    CONFIGURAÇÕES

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// handlebars

 app.engine('handlebars', engine({ extname: 'handlebars', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'handlebars');

// config string conexão
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/blogapp",{useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
    console.log("conectado")
}).catch((err) => {
    console.log("erro ao conectar" + err)
})

//public
//avisa pra aplicação que quem guarda os arquivos estaticos é a pasta public
app.use(express.static(path.join(__dirname,"/public")))


//  Rotas

//rota sem prefixo via index
app.get('/index', (req, res) =>{
    res.send("rota principal")
})

//rota utilizando o router. Passo um prefixo pra rota
app.use('/admin', admin)

app.listen(8080, () =>{
    console.log("Rodadno")
});