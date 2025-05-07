const pool = require('../db');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { World } = require('../models');

const getAllWorlds = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM worlds')
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mundos' });
    }
}

const getWorldById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM worlds WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Mundo não encontrado' })
        }
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Mundo' });
    }
}

const getWorldImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const world = await World.findByPk(id);
  
    if (!world) {
      return res.status(404).json({ error: 'Mundo não encontrado' });
    }
  
    if (!world.image) {
      return res.status(404).json({ error: 'Mundo não possui imagem' });
    }
  
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'worlds', String(world.image));
  
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

const createNewWorld = async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const result = await pool.query('INSERT INTO worlds (name, description, image) VALUES ($1, $2, $3) RETURNING *', [name, description, image]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar mundo'})
    }
}

const updateWorld = async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
    try {
        const result = await pool.query('UPDATE worlds SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *', [name, description, image, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Mundo não encontrado'})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Mundo'})
    }
}

const deleteWorld = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM worlds WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Mundo não encontrado'})
        }
        res.json({ message: 'Mundo deletado com sucesso'})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Mundo'})
    }
}

module.exports = {
    getAllWorlds,
    getWorldById,
    getWorldImage,
    createNewWorld,
    updateWorld,
    deleteWorld
}