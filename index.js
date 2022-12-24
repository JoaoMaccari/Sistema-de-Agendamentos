const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();


app.use(express.urlencoded({extended:false}))
app.use(express.json())

//uso dos arquivos estaticos que estão na pasta public
app.use(express.static("public"))

app.set('view engine', 'ejs')

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/agendamento",{useNewUrlParser:true, useUnifiedTopology:true})

app.get("/", (req, res) =>{
    res.send("oi");
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.listen(8080, () =>{});