const { WorldEnemy, Enemy } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

const createWorldEnemy = asyncHandler(async (req, res) => {
    const { world_id, enemy_id } = req.body;

    // Verifica se os IDs foram fornecidos
    if (!world_id || !enemy_id) {
        return res.status(400).json({ error: 'world_id and enemy_id are required.' });
    }

    // Verifica se o relacionamento já existe
    const existingRelation = await WorldEnemy.findOne({ where: { world_id, enemy_id } });
    if (existingRelation) {
        return res.status(400).json({ error: 'This relationship already exists.' });
    }

    // Cria o novo relacionamento
    const newWorldEnemy = await WorldEnemy.create({ world_id, enemy_id });
    res.status(201).json(newWorldEnemy);
});

const getEnemyByWorld = asyncHandler(async (req, res) => {
    const { world_id } = req.params;

    // Verifica se world_id foi fornecido
    if (!world_id) {
        return res.status(400).json({ error: 'world_id is required.' });
    }

    const worldEnemies = await WorldEnemy.findAll({
        where: { world_id },
        include: [{
            model: Enemy,
            attributes: ['id', 'name'] // Retorna apenas id e name do inimigo
        }]
    });

    if (worldEnemies.length === 0) {
        return res.status(404).json({ error: 'No enemies found for this world.' });
    }

    // Retorna apenas a lista de inimigos
    const enemies = worldEnemies.map(we => we.Enemy);
    res.status(200).json(enemies);
});

const deleteWorldEnemy = asyncHandler(async (req, res) => {
    const { world_id, enemy_id } = req.params;

    // Verifica se world_id e enemy_id foram fornecidos
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
    getEnemyByWorld,
    deleteWorldEnemy
};
