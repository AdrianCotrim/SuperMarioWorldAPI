const express = require('express');
const app = express();
const port = 3000;
const db = require('./models'); // Importa os modelos do Sequelize

const characterRoutes = require('./routes/characterRoutes')

app.use(express.json());
app.use('/characters', characterRoutes)

app.get('/', (req, res) => {
  res.send('Super Mario API está no ar!');
});

// Sincronização com o banco de dados
db.sequelize.sync({ force: false }) // force: false para preservar os dados existentes
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
