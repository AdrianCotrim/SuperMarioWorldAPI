require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect()
  .then(() => console.log('✅ Conectado ao Supabase com sucesso!'))
  .catch(err => console.error('❌ Erro na conexão com o Supabase:', err));

module.exports = pool;
