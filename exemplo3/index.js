
const express = require("express");
const app = express(); //instancia do módulo

const porta = 8080;
app.listen(porta);

//************************************* */
//trabalhando com rotas
//rota principal
app.get("/",function(req, res){ //página inicial recebe
    res.send("Página Pessoal - Olá");
})
//rota sobre
app.get("/sobre",function(req, res){
    res.send("Rafael Alves Florindo");
})
//rota aulas
app.get("/tutoriais",function(req, res){
    res.send("Conteúdo de tutorias");
})
//rota teste
app.get("/teste",function(req, res){
    res.send(`
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Olá Mundo</h1>
        </body>
    </html>
    `);
})

