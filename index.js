const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const AppointmentService = require("./services/AppointmentService")


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


//metodo post que vai pegar os dados inseridos pelo usuario no fomulario
// var status recebe o metodo do create da classe AppointmentService
app.post("/create", async (req,res)=>{
   var status= await AppointmentService.Create(
    req.body.name,
    req.body.email,
    req.body.description,
    req.body.cpf,
    req.body.date,
    req.body.time
   )

   if(status){
    res.redirect("/") //se tudo ok redireciona para pagina inicial
   }else{
    res.send("ocorreu um erro")
   }
})

app.listen(8080, () =>{});