

console.log("Gerenciador Estudantil");

let cliente = "Rafael Alves Florindo"

console.log("Cliente: " + cliente);

let valorHoraTrabalho = 125.48;
let quantidadeHoraTrabalho = 40;

let calculaSalario = require("./modules/calculoSalarioMes");

let novoSalario = calculaSalario(valorHoraTrabalho, quantidadeHoraTrabalho)

console.log("Valor da Hora: R$ " + valorHoraTrabalho);
console.log("Quantidade de Horas trabalhadas: " + quantidadeHoraTrabalho + " horas");
console.log("Novo Salário: R$ " + novoSalario);