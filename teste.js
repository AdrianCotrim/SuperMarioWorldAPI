const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('super_mario_db', 'postgres', 'Admin1234', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
})();
