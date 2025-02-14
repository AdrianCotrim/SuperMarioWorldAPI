const pool = require('../db');

const getAllCollectables = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM collectables');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar coletáveis', details: error.message });
    }
}

const getCollectableById = async (req, res) => { 
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM collectables WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Coletável não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar coletável', details: error.message });
    }
}

const createNewCollectable = async (req, res) => {
    const { name, type, description, image, value } = req.body;
    try {
        const result = await pool.query('INSERT INTO collectables (name, type, description, image, value) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, type, description, image, value]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar coletável', details: error.message });
    }
}

const updateCollectable = async (req, res) => {
    const { id } = req.params;
    const { name, type, description, image, value } = req.body;
    try {
        const result = await pool.query('UPDATE collectables SET name = $1, type = $2, description = $3, image = $4, value = $5 WHERE id = $6 RETURNING *', [name, type, description, image, value, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Coletável não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar coletável', details: error.message });
    }
}

const deleteCollectable = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM collectables WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Coletável não encontrado' });
        }
        res.json({ message: 'Coletável deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar coletável', details: error.message });
    }
}

module.exports = {
    getAllCollectables,
    getCollectableById,
    createNewCollectable,
    updateCollectable,
    deleteCollectable
};
