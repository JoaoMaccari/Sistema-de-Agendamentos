const express = require("express")
//componnete pra criar rotas em arquivos seprados
//express.Router é um método nativo do express que exporta um modulo contentdo um grupo de rotas
const router = express.Router()

router.get('/' , (req, res) =>{
    res.render("admin/index")
});


router.get('/posts', (req , res) =>{
    res.send("pagina posts")
})

router.get('/categorias' , (req, res) =>{
    res.send('pagina de categorias')
})


module.exports = router;