
const express = require("express");
const app = express(); //instancia do módulo

const porta = 8080;
app.listen(porta);

//************************************* */
//trabalhando com rotas

//rota principal
app.get("/",function(req, res){ //página inicial recebe
    //res.send("Página Pessoal");
    res.sendFile(__dirname + "/src/index.html");
})
//rota sobre
app.get("/sobre",function(req, res){
    //res.send("Rafael Alves Florindo");
    res.sendFile(__dirname + "/src/sobre.html");
})
//rota aulas
app.get("/tutoriais",function(req, res){
    //res.send("Conteúdo de tutorias");
    res.sendFile(__dirname + "/src/tutoriais.html");
})
//rota teste
app.get("/img",function(req, res){
    res.send("Teste");
})
//rota teste
app.get("/teste",function(req, res){
    res.send("Teste");
})
//rota tutorialPHP
app.get("/tutorialPHP",function(req, res){
    res.sendFile(__dirname + "/src/tutorialPHP.html");
})
//rota tutorialReact
app.get("/tutorialReact",function(req, res){
    res.sendFile(__dirname + "/src/tutorialReact.html");
})
//rota tutorialNode
app.get("/tutorialNode",function(req, res){
    res.sendFile(__dirname + "/src/tutorialNode.html");
})

app.use(express.static('src'));