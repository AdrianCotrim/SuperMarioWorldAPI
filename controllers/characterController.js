const pool = require('../db');

const getAllCharacters = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM characters')
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar personagens' });
    }
}

const getCharacterById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM characters WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Personagem não encontrado' })
        }
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar personagem' });
    }
}

const createNewCharacter = async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const result = await pool.query('INSERT INTO characters (name, description, image) VALUES ($1, $2, $3) RETURNING *', [name, description, image]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar personagem'})
    }
}

const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
    try {
        const result = await pool.query('UPDATE characters SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *', [name, description, image, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Personagem não encontrado'})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar personagem'})
    }
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Personagem não encontrado'})
        }
        res.json({ message: 'Personagem deletado com sucesso'})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar personagem'})
    }
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    createNewCharacter,
    updateCharacter,
    deleteCharacter
};