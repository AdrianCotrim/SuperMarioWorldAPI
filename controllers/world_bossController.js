const { WorldBoss, Boss } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

const createWorldBoss = asyncHandler(async (req, res) => {
    const { world_id, boss_id } = req.body;

    if (!world_id || !boss_id) {
        return res.status(400).json({ error: 'world_id and boss_id are required.' });
    }

    const existingRelation = await WorldBoss.findOne({ where: { world_id, boss_id } });
    if (existingRelation) {
        return res.status(400).json({ error: 'This relationship already exists.' });
    }

    const newWorldBoss = await WorldBoss.create({ world_id, boss_id });
    res.status(201).json(newWorldBoss);
});

const getAllWorldBosses = asyncHandler(async (req, res) => {
    const worldBosses = await WorldBoss.findAll();
    res.json(worldBosses);
});


const getBossesByWorld = asyncHandler(async (req, res) => {
    const { world_id } = req.params;

    if (!world_id) {
        return res.status(400).json({ error: 'world_id is required.' });
    }

    const worldBosses = await WorldBoss.findAll({
        where: { world_id },
        include: [{ model: Boss, attributes: ['id', 'name'] }] 
    });

    if (worldBosses.length === 0) {
        return res.status(404).json({ error: 'No bosses found for this world' });
    }

    res.json(worldBosses);
});

const deleteWorldBoss = asyncHandler(async (req, res) => {
    const { world_id, boss_id } = req.params;

    if (!world_id || !boss_id) {
        return res.status(400).json({ error: 'world_id and boss_id are required.' });
    }

    const deletedCount = await WorldBoss.destroy({ where: { world_id, boss_id } });

    if (deletedCount === 0) {
        return res.status(404).json({ error: 'Relationship not found.' });
    }

    res.json({ message: 'Relationship successfully deleted.' });
});

module.exports = {
    createWorldBoss,
    getAllWorldBosses,
    getBossesByWorld,
    deleteWorldBoss
};
