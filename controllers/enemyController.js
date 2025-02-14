const pool = require('../db');

const getAllEnemies = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM enemies')
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar inimigos' });
    }
}

const getEnemyById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM enemies WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Inimigo não encontrado' })
        }
        res.send(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Inimigo' });
    }
}

const createNewEnemy = async (req, res) => {
    const { name, description, image, hp, behaviour } = req.body;
    try {
        const result = await pool.query('INSERT INTO enemies (name, description, image, hp, behaviour) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, image, hp, behaviour]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar inimigo'})
    }
}

const updateEnemy = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, hp, behaviour } = req.body;
    try {
        const result = await pool.query('UPDATE enemies SET name = $1, description = $2, image = $3, hp = $4, behaviour = $5 WHERE id = $6 RETURNING *', [name, description, image, hp, behaviour, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inimigo não encontrado'})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Inimigo'})
    }
}

const deleteEnemy = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM enemies WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inimigo não encontrado'})
        }
        res.json({ message: 'Inimigo deletado com sucesso'})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Inimigo'})
    }
}

module.exports = {
    getAllEnemies,
    getEnemyById,
    createNewEnemy,
    updateEnemy,
    deleteEnemy
};