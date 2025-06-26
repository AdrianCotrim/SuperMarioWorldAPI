const pool = require('../db');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { Item } = require('../models');

const getAllItems = asyncHandler(async (req, res) => {
    const { name } = req.query;

    let query = 'SELECT * FROM items';
    const values = [];

    if(name){
        query += ' WHERE name ILIKE $1';
        values.push(`%${name}%`)
    }

    const { rows } = await pool.query(query, values);
    res.json(rows);
});

const getItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
});

const getItemImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByPk(id);
  
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
  
    if (!item.image) {
      return res.status(404).json({ error: 'Item não possui imagem' });
    }
  
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'items', String(item.image));
  
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

const createNewItem = asyncHandler(async (req, res) => {
    const { name, type, description, image, value } = req.body;
    const { rows } = await pool.query(
        'INSERT INTO items (name, type, description, image, value) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, type, description, image, value]
    );

    res.status(201).json(rows[0]);
});

const updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, type, description, image, value } = req.body;
    const { rows } = await pool.query(
        'UPDATE items SET name = $1, type = $2, description = $3, image = $4, value = $5 WHERE id = $6 RETURNING *',
        [name, type, description, image, value, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
});

const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item successfully deleted' });
});

module.exports = {
    getAllItems,
    getItemById,
    getItemImage,
    createNewItem,
    updateItem,
    deleteItem
};
