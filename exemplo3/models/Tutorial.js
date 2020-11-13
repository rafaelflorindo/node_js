const db = require('./db')

//criação da tabela
const Tutorial = db.sequelize.define('tutoriais',{
    titulo:{
        type: db.Sequelize.STRING
    },
    autor:{
        type: db.Sequelize.STRING
    },
    texto:{
        type: db.Sequelize.TEXT
    },
    categoria:{
        type: db.Sequelize.STRING
    }
})
//Tutorial.sync({force:true})//executa apenas uma vez

module.exports = Tutorial
