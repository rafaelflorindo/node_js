const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_js', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
/*sequelize.authenticate().
  then(function(){
    console.log('Conexao realizada com sucesso');
  }).catch(function(){
    console.log('Erro ao realizar a conexão' + err);
  });
  */
  module.exports={
      Sequelize: Sequelize,
      sequelize: sequelize
  }