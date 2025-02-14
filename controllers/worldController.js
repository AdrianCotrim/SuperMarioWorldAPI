const pool = require('../db');

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
    createNewWorld,
    updateWorld,
    deleteWorld
}