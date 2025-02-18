const express = require('express');
const app = express();
const port = 3000;
const db = require('./models'); 

const characterRoutes = require('./routes/characterRoutes')
const bossRoutes = require('./routes/bossRoutes')
const collectableRoutes = require('./routes/collectableRoutes')
const enemyRoutes = require('./routes/enemyRoutes');
const worldRoutes = require('./routes/worldRoutes')
const world_bossRoutes = require('./routes/world_bossRoutes')

app.use(express.json());
app.use('/images', express.static('public/images'));
app.use('/characters', characterRoutes)
app.use('/bosses', bossRoutes)
app.use('/collectables', collectableRoutes)
app.use('/enemies', enemyRoutes)
app.use('/worlds', worldRoutes)
app.use('/world_boss', world_bossRoutes)


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
