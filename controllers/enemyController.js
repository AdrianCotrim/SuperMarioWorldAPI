const pool = require('../db');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { Enemy } = require('../models');

const getAllEnemies = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM enemies');
    res.json(rows);
});

const getEnemyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM enemies WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Enemy not found' });
    }
    res.json(rows[0]);
});

const getEnemyImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const enemy = await Enemy.findByPk(id);
  
    if (!enemy) {
      return res.status(404).json({ error: 'Inimigo não encontrado' });
    }
  
    if (!enemy.image) {
      return res.status(404).json({ error: 'Inimigo não possui imagem' });
    }
  
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'enemies', String(enemy.image));
  
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }
  
    res.sendFile(imagePath, err => {
      if (err) {
        console.error('Erro ao enviar imagem:', err);
        return res.status(err.status || 500).end();
      }
    });
  });

const createNewEnemy = asyncHandler(async (req, res) => {
    const { name, description, image, hp, behaviour } = req.body;
    const { rows } = await pool.query(
        'INSERT INTO enemies (name, description, image, hp, behaviour) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, image, hp, behaviour]
    );

    res.status(201).json(rows[0]);
});

const updateEnemy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, image, hp, behaviour } = req.body;
    const { rows } = await pool.query(
        'UPDATE enemies SET name = $1, description = $2, image = $3, hp = $4, behaviour = $5 WHERE id = $6 RETURNING *',
        [name, description, image, hp, behaviour, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Enemy not found' });
    }
    res.json(rows[0]);
});

const deleteEnemy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM enemies WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Enemy not found' });
    }
    res.json({ message: 'Enemy successfully deleted' });
});

module.exports = {
    getAllEnemies,
    getEnemyById,
    getEnemyImage,
    createNewEnemy,
    updateEnemy,
    deleteEnemy
};
