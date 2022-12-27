const express = require("express")

//importa mongoose
const mongoogse = require("mongoose")
//chama arquivo do model
require("../models/Categoria")
//chama uma função do mongoose que passa a referencia da model para dentro de uma variavel. A partir desta variavel que se usa as funções do banco
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
    //
    Categoria.find().sort({date:'desc'}).lean().then((categorias) =>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) =>{
        req.flash('error_msg', "houve um erro ao lista as categorias")
        res.redirect("/admin")
    })
    
})

router.get('/categorias/add' , (req, res) =>{
    res.render('admin/addcategorias')
})

//rota que recebe os dados do form e cadastra no bd
router.post('/categorias/nova', (req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "nome inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.nome == null){
        erros.push({texto: "slug invalido"})
    }

    if(erros.length > 0) {
        res.render("admin/addcategorias", {erros: erros})
    }else{
        const novaCategoria ={
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() =>{
            req.flash('success_msg', "Categoria criada com sucesso")
            res.redirect("/admin/categorias")
        }).catch(() =>{
            req.flash('error_msg', "Erro ao cadastrar categoria")
            res.redirect("/admin")
        })

    }
    
})


router.get("/categorias/edit/:id",(req, res) =>{
    Categoria.findOne({_id:req.params.id}).then((Categoria) =>{ 
        res.render("/admin/editcategorias", {categoria: categoria})
    }).catch((err) =>{
        req.flash('error_msg', "Esta categoria não exite")
        res.redirect("/admin/categorias")
    })
    
})



module.exports = router;