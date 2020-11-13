//************************************************************************* */
//criação do servidor com roteamento pelo express
//************************************************************************* */
const express = require("express");
const app = express();
const porta = 8080;
app.listen(porta);
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//************************************************************************* */



//************************************************************************* */
//templates handlebars
//************************************************************************* */
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate:(date)=>{//formatação de data
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars')
//************************************************************************* */



//************************************************************************* */
//bodyParser para receber os dados do formulário
//************************************************************************* */
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())
//************************************************************************* */



//************************************************************************* */
//moment - formatação para datas
//************************************************************************* */
const moment = require('moment') //formatação
//************************************************************************* */



//************************************************************************* */
//componente interno para Pagamento
//************************************************************************* */
const Pagamento = require("./models/Pagamento")

const Tutorial = require("./models/Tutorial")



//*************************************************************************
//rotas express-handlebars body-parser
//*************************************************************************
app.get("/",function(req, res){
    res.send("Página Principal")
})

//rotas para pagamento
app.get("/formularioAdicionarPagamento",function(req, res){
    res.render('formularioAdicionarPagamento');
})
app.get("/listarPagamento",function(req, res){
    //listagem sem parâmetros
    /*Pagamento.findAll().then(function(pagamentos){
        res.render('listarPagamento',
        {pagamentos: pagamentos})
    })*/

    Pagamento.findAll({
            order: [['id', 'ASC']],
            atributes: ['nome','valor']//*********** */
        }).then(function(pagamentos){
            res.render('listarPagamento',
            {
                pagamentos: pagamentos
            })
    })
    
})
app.post("/adicionarPagamento",function(req, res){
   /* //para teste 
   res.send("<br>Nome: " + req.body.nome + "<br> Valor: "
    + req.body.valor + "<br>Descrição" + req.body.descricao)
    */
   //recebe as informações do formulário
    Pagamento.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/listarPagamento')
        //res.send("Pagamento Cadastrado com sucesso")
    }).catch(function(erro){
        res.send("Erro a cadastrar o pagamento" + erro)
    })
})
app.get("/deletarPagamento/:id",function(req, res){
    
     Pagamento.destroy({
         where: {'id': req.params.id
        }
     }).then(function(){
         res.send("Pagamento deletado com sucesso")
         //res.redirect('/listarPagamento')
     }).catch(function(erro){
         res.send("Erro a excluir o pagamento" + erro)
     })
 })
 //https://sequelize.org/master/manual/model-instances.html#updating-an-instance
 app.get('/update/:id', function(req, res){
    id = req.params.id;
    
    res.cookie(
        'id', id, 
        {
            expire: new Date()+10*60*1000
        });//10 minutos

    Pagamento.findOne({
        where:{id:id}
    }).then(function(result){
        if(!result){
            res.end("id não encontrado")
        }else{
            res.render('formularioEditarPagamento',{result: result})
        }
    })
 })
 app.post('/update', function(req, res, next){//update
    id = req.cookies.id; //npm install cookie-parser --save
    
    nome = req.body.nome;
    descricao = req.body.descricao;
    valor = req.body.valor;
    
    if (nome && descricao && valor){
        Pagamento.update({
            nome: nome,
            descricao: descricao,
            valor: valor
        },
        {
            where : {
                id:id
            }
        });
        res.clearCookie('id');
        res.redirect('/listarPagamento');
    }else{
        message = "Os campos estão vázios";
        res.render('formularioEditarPagamento',{message: message, result: req.body})
    }
 })
/************************************************************ */
 //rotas para Tutoriais
app.get("/formularioAdicionarTutorial",function(req, res){
    res.render('formularioAdicionarTutorial');
})
app.get("/listarTutorial",function(req, res){
    Tutorial.findAll({
            order: [['id', 'ASC']],
            atributes: ['titulo','autor']
        }).then(function(tutoriais){
            res.render('listarTutoriais',
            {
                tutoriais: tutoriais
            })
    })
    
})
app.post("/adicionarTutorial",function(req, res){
   Tutorial.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        texto: req.body.texto,
        categoria: req.body.categoria
    }).then(function(){
        res.redirect('/listarTutorial')
    }).catch(function(erro){
        res.send("Erro a cadastrar o tutorial" + erro)
    })
})
app.get("/deletarTutorial/:id",function(req, res){
    
    Tutorial.destroy({
         where: {'id': req.params.id
        }
     }).then(function(){
         res.send("Tutorial deletado com sucesso")
         //res.redirect('/listarTutoriais')
     }).catch(function(erro){
         res.send("Erro a excluir o tutorial" + erro)
     })
 })
 
 app.get('/updateTutorial/:id', function(req, res){
    id = req.params.id;
    
    res.cookie(
        'id', id, 
        {
            expire: new Date()+10*60*1000
        });//10 minutos

        Tutorial.findOne({
        where:{id:id}
    }).then(function(result){
        if(!result){
            res.end("id não encontrado")
        }else{
            res.render('formularioEditarTutorial',{result: result})
        }
    })
 })
 app.post('/updateTutorial', function(req, res, next){//update
    id = req.cookies.id; //npm install cookie-parser
    titulo = req.body.titulo;
    autor = req.body.autor;
    texto = req.body.texto;
    categoria = req.body.categoria;
    if (titulo && autor && texto && categoria){
        Tutorial.update({
            titulo: titulo,
            autor: autor,
            texto: texto,
            categoria: categoria
        },
        {
            where : {
                id:id
            }
        });
        res.clearCookie('id');
        res.redirect('/listarTutorial');
    }else{
        message = "Os campos estão vazios";
        res.render('formularioEditarTutorial',{message: message, result: req.body})
    }
 })
 app.get('/apresentarTutorial/:id', function(req, res){
    id = req.params.id;
    
    res.cookie(
        'id', id, 
        {
            expire: new Date()+10*60*1000
        });//10 minutos

        Tutorial.findOne({
        where:{id:id}
    }).then(function(result){
        if(!result){
            res.end("id não encontrado")
        }else{
            res.render('apresentarTutorial',{result: result})
        }
    })
 })
//************************************************************************* */



//************************************************************************* */
//conexão com mysql
//************************************************************************* */
/*const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'node_js'
})
connection.connect(function(err){
    if(err){
        console.error('error connect' + err.strack);
        return;
    }
})

//realizando um select
/*
connection.query('SELECT * FROM tutoriais', function(err, rows, fields){
    if(!err){
        console.log('Resultado:' , rows);
    }else{
        console.log('Erro a realizar a consulta');
    }
});

//inserindo registro
/*connection.query(
    "INSERT INTO tutoriais (titulo, texto, autor, categoria, dataPublicacao) VALUES ('teste', 'teste','Rafael', 'react', '2020-11-04 21:28:33')", 
    function(err, results){
        if(!err) {
            console.log('Tutorial cadastrado com sucesso!!!');
        }else{
            console.log('Erro ao cadastrar o tutorial');
        } 
})

//alterando registro
/*
connection.query(
    "UPDATE tutoriais SET titulo = 'PHP', texto='Linguagem de programação', autor='Rafael', categoria='php' where id = 11",
    function(err, results){
        if(!err) {
            console.log('Tutorial alterado com sucesso!!!');
        }else{
            console.log('Erro ao alterar o tutorial');
        } 
    }
)

//deletando registro
/*
connection.query(
    "DELETE FROM tutoriais where id = 11",
    function(err, results){
        if(!err) {
            console.log('Tutorial DELETADO com sucesso!!!');
        }else{
            console.log('Erro ao DELETAR o tutorial');
        } 
    }
)
*/

//************************************************************************* */
//trabalhando com SEQUELIZE
//************************************************************************* */
//conectando com banco utilizando o sequelize
/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_js', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
sequelize.authenticate().
  then(function(){
    console.log('Conexao realizada com sucesso');
  }).catch(function(){
    console.log('Erro ao realizar a conexão' + err);
  });
*/

//criando (modelando) tabela com sequelize
/*
const Pagamento = sequelize.define('pagamentos',{
    //atributos
    nome: {
        type: Sequelize.STRING,
    },
    descricao:{
        type: Sequelize.STRING,
    },
    valor: {
        type: Sequelize.DOUBLE
    }
});
*/
//Pagamento.sync({force:true});//função que cria a tabela e deve ser executada apenas 1 vez.

//inserindo registros
/*Pagamento.create({
    nome: 'Rafael Alves Florindo',
    descricao: 'Curso 1',
    valor: 150
})
Pagamento.create({
    nome: 'Ricardo Alves Florindo',
    descricao: 'Curso 1',
    valor: 150
})
*/
//************************************************************************* */
//rotas que no momento estão inativas
//*************************************************************************
/*app.get("/",function(req, res){
    res.sendFile(__dirname + "/src/index.html");
})
app.get("/sobre",function(req, res){
    res.sendFile(__dirname + "/src/sobre.html");
})
app.get("/tutoriais",function(req, res){
    res.sendFile(__dirname + "/src/tutoriais.html");
})
app.get("/img",function(req, res){
    res.send("Teste");
})
app.get("/teste",function(req, res){
    res.send("Teste");
})
app.get("/tutorialPHP",function(req, res){
    res.sendFile(__dirname + "/src/tutorialPHP.html");
})
app.get("/tutorialReact",function(req, res){
    res.sendFile(__dirname + "/src/tutorialReact.html");
})
app.get("/tutorialNode",function(req, res){
    res.sendFile(__dirname + "/src/tutorialNode.html");
})
app.use(express.static('src'));
*/

