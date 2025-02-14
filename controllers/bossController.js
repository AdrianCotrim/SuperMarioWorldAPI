const pool = require('../db');

const getAllBosses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bosses')
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar chefes' });
    }
}

const getBossById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM bosses WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Chefe não encontrado' })
        }
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar boss' });
    }
}

const createNewBoss = async (req, res) => {
    const { name, description, image, hp } = req.body;
    try {
        const result = await pool.query('INSERT INTO bosses (name, description, image, hp) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, image, hp]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar chefe'})
    }
}

const updateBoss = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, hp } = req.body;
    try {
        const result = await pool.query('UPDATE bosses SET name = $1, description = $2, image = $3, hp = $4 WHERE id = $5 RETURNING *', [name, description, image, hp, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Chefe não encontrado'})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar chefe'})
    }
}

const deleteBoss = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM bosses WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Chefe não encontrado'})
        }
        res.json({ message: 'Chefe deletado com sucesso'})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar chefe'})
    }
}

module.exports = {
    getAllBosses,
    getBossById,
    createNewBoss,
    updateBoss,
    deleteBoss
};
