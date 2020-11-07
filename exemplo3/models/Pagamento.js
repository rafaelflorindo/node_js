const db = require('./db')

//criação da tabela
const Pagamento = db.sequelize.define('pagamentos',{
    nome:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.STRING
    },
    valor:{
        type: db.Sequelize.DOUBLE
    }
})
//Pagamento.sync({force:true})//executa apenas uma vez

module.exports = Pagamento