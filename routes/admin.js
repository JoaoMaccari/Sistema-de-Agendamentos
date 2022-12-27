const express = require("express")

//importa mongoose
const mongoogse = require("mongoose")
//chama arquivo do model
require("../models/Categoria")
//chama uma função do mongoose que passa a referencia da model para dentro de uma variavelç
const Categoria = mongoogse.model("categorias")


//componnete pra criar rotas em arquivos seprados
//express.Router é um método nativo do express que exporta um modulo contentdo um grupo de rotas
const router = express.Router()


//para renderizar as paginas, eu passo o nome da pasta que esta dentro da VIEW seguida pelo nome do arquivo

router.get('/' , (req, res) =>{
    res.render("admin/index")
});


router.get('/posts', (req , res) =>{
    res.send("pagina posts")
})

router.get('/categorias' , (req, res) =>{
    res.render('admin/categorias')
})

router.get('/categorias/add' , (req, res) =>{
    res.render('admin/addcategorias')
})

//rota que recebe os dados do form e cadastra no bd
router.post('/categorias/nova', (req, res)=>{
    const novaCategoria ={
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() =>{
        console.log("categoria salva com sucesso")
    }).catch(() =>{
        console.log("erro ao salvar")
    })
})



module.exports = router;