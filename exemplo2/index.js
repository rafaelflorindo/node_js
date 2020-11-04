//criando servidor http
//navegador

const http = require('http');
const porta = 8080;

const tituloApp ="Sistema Financeiro"

http.createServer(function(req, res){
    res.end(tituloApp);
}).listen(porta);

//nodemon
//npm install express --save
//npm install -g nodemon