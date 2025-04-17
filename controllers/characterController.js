const pool = require('../db');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { Character } = require('../models');

const getAllCharacters = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM characters');
    res.json(rows);
});

const getCharacterById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM characters WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Character not found' });
    }
    res.json(rows[0]);
});

const getCharacterImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByPk(id);
  
    if (!character) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
  
    if (!character.image) {
      return res.status(404).json({ error: 'Personagem não possui imagem' });
    }
  
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'characters', String(character.image));
  
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

const createNewCharacter = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const { rows } = await pool.query(
        'INSERT INTO characters (name, description, image) VALUES ($1, $2, $3) RETURNING *',
        [name, description, image]
    );

    res.status(201).json(rows[0]);
});

const updateCharacter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const { rows } = await pool.query(
        'UPDATE characters SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *',
        [name, description, image, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Character not found' });
    }
    res.json(rows[0]);
});

const deleteCharacter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Character not found' });
    }
    res.json({ message: 'Character successfully deleted' });
});

module.exports = {
    getAllCharacters,
    getCharacterById,
    getCharacterImage,
    createNewCharacter,
    updateCharacter,
    deleteCharacter
};
