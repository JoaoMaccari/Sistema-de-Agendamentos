// módulos
const bodyParser = require("body-parser");
const express = require("express");

const { engine } = require ('express-handlebars');
const handlebars = require("express-handlebars")

const { default: mongoose } = require("mongoose");
const app = express();
const admin = require("./routes/admin")

const path = require("path")

//    CONFIGURAÇÕES

//body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// handlebars

 app.engine('handlebars', engine({ extname: 'handlebars', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'handlebars');

// config string conexão
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/agendamento",{useNewUrlParser:true, useUnifiedTopology:true})

//public
//avida pra aplicação que quem guarda os arquivos estaticos é a pasta public
app.use(express.static(path.join(__dirname,"/public")))


//  Rotas

//rota sem prefixo via index
app.get('/index', (req, res) =>{
    res.send("rota principal")
})

//rota utilizando o router
app.use('/admin', admin)

app.listen(8080, () =>{
    console.log("Rodadno")
});