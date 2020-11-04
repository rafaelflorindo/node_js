//criando módulos


var salario = function(valorHora, quantidadeHora){
    return valorHora * quantidadeHora;
}

//exportando módulos utilizando a palavra reservada modules
module.exports = salario;