const pool = require('../db');
const asyncHandler = require('../middleware/asyncHandler');

const getAllCollectables = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM collectables');
    res.json(rows);
});

const getCollectableById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM collectables WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Collectable not found' });
    }
    res.json(rows[0]);
});

const createNewCollectable = asyncHandler(async (req, res) => {
    const { name, type, description, image, value } = req.body;
    const { rows } = await pool.query(
        'INSERT INTO collectables (name, type, description, image, value) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, type, description, image, value]
    );

    res.status(201).json(rows[0]);
});

const updateCollectable = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, type, description, image, value } = req.body;
    const { rows } = await pool.query(
        'UPDATE collectables SET name = $1, type = $2, description = $3, image = $4, value = $5 WHERE id = $6 RETURNING *',
        [name, type, description, image, value, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Collectable not found' });
    }
    res.json(rows[0]);
});

const deleteCollectable = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM collectables WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Collectable not found' });
    }
    res.json({ message: 'Collectable successfully deleted' });
});

module.exports = {
    getAllCollectables,
    getCollectableById,
    createNewCollectable,
    updateCollectable,
    deleteCollectable
};
