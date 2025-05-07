const pool = require('../db');
const asyncHandler = require('../middleware/asyncHandler');

const getAllItems = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM items');
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
    createNewItem,
    updateItem,
    deleteItem
};
