const pool = require('../db');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { Boss } = require('../models');

const getAllBosses = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM bosses');
    res.json(rows);
});

const getBossById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM bosses WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Boss not found' });
    }

    res.json(rows[0]);
});

const getBossImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const boss = await Boss.findByPk(id);
  
    if (!boss) {
      return res.status(404).json({ error: 'Boss não encontrado' });
    }
  
    if (!boss.image) {
      return res.status(404).json({ error: 'Boss não possui imagem' });
    }
  
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'bosses', String(boss.image));
  
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

const createNewBoss = asyncHandler(async (req, res) => {
    const { name, description, image, hp } = req.body;

    if (!name || !description || !hp) {
        return res.status(400).json({ error: 'Name, description and HP are required' });
    }

    const { rows } = await pool.query(
        'INSERT INTO bosses (name, description, image, hp) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, image || null, hp]
    );

    res.status(201).json(rows[0]);
});

const updateBoss = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, image, hp } = req.body;

    const { rows } = await pool.query(
        'UPDATE bosses SET name = $1, description = $2, image = $3, hp = $4 WHERE id = $5 RETURNING *',
        [name, description, image, hp, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Boss not found for update' });
    }

    res.json(rows[0]);
});

const deleteBoss = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM bosses WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Boss not found for delete' });
    }

    res.json({ message: 'Boss successfully deleted' });
});

module.exports = {
    getAllBosses,
    getBossById,
    getBossImage,
    createNewBoss,
    updateBoss,
    deleteBoss
};
