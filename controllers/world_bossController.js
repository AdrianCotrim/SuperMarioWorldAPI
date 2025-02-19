const { WorldBoss, Boss } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

const createWorldBoss = asyncHandler(async (req, res) => {
    const { world_id, boss_id } = req.body;

    // Verifica se o relacionamento já existe
    const existingRelation = await WorldBoss.findOne({ where: { world_id, boss_id } });
    if (existingRelation) {
        return res.status(400).json({ error: 'This relationship already exists.' });
    }

    // Cria o novo relacionamento
    const newWorldBoss = await WorldBoss.create({ world_id, boss_id });
    res.status(201).json(newWorldBoss);
});

const getBossesByWorld = asyncHandler(async (req, res) => {
    const { world_id } = req.params;

    const worldBosses = await WorldBoss.findAll({
        where: { world_id },
        include: [{ model: Boss, attributes: ['id', 'name'] }] // Retorna apenas o id e nome do boss
    });

    if (worldBosses.length === 0) {
        return res.status(404).json({ error: 'No bosses found for this world.' });
    }

    res.json(worldBosses);
});

const deleteWorldBoss = asyncHandler(async (req, res) => {
    const { world_id, boss_id } = req.params;

    const deletedCount = await WorldBoss.destroy({ where: { world_id, boss_id } });

    if (deletedCount === 0) {
        return res.status(404).json({ error: 'Relationship not found.' });
    }

    res.json({ message: 'Relationship successfully deleted.' });
});

module.exports = {
    createWorldBoss,
    getBossesByWorld,
    deleteWorldBoss
};
