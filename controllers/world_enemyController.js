const { WorldEnemy, Enemy } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

const createWorldEnemy = asyncHandler(async (req, res) => {
    const { world_id, enemy_id } = req.body;

    if (!world_id || !enemy_id) {
        return res.status(400).json({ error: 'world_id and enemy_id are required.' });
    }

    const existingRelation = await WorldEnemy.findOne({ where: { world_id, enemy_id } });
    if (existingRelation) {
        return res.status(400).json({ error: 'This relationship already exists.' });
    }

    const newWorldEnemy = await WorldEnemy.create({ world_id, enemy_id });
    res.status(201).json(newWorldEnemy);
});

const getAllWorldEnemies = asyncHandler(async (req, res) => {
    const worldEnemies = await WorldEnemy.findAll();
    res.json(worldEnemies);
});

const getEnemyByWorld = asyncHandler(async (req, res) => {
    const { world_id } = req.params;

    if (!world_id) {
        return res.status(400).json({ error: 'world_id is required.' });
    }

    const worldEnemies = await WorldEnemy.findAll({
        where: { world_id },
        include: [{
            model: Enemy,
            attributes: ['id', 'name']
        }]
    });

    if (worldEnemies.length === 0) {
        return res.status(404).json({ error: 'No enemies found for this world.' });
    }

    const enemies = worldEnemies.map(we => we.Enemy);
    res.status(200).json(enemies);
});

const deleteWorldEnemy = asyncHandler(async (req, res) => {
    const { world_id, enemy_id } = req.params;

    if (!world_id || !enemy_id) {
        return res.status(400).json({ error: 'world_id and enemy_id are required.' });
    }

    const deletedCount = await WorldEnemy.destroy({
        where: { world_id, enemy_id }
    });

    if (deletedCount === 0) {
        return res.status(404).json({ error: 'Relationship not found.' });
    }

    res.status(200).json({ message: 'Relationship successfully deleted.' });
});

module.exports = {
    createWorldEnemy,
    getAllWorldEnemies,
    getEnemyByWorld,
    deleteWorldEnemy
};
