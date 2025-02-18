const pool = require('../db');
const { WorldBoss, World, Boss } = require('../models');

const createWorldBoss = async (req, res) => {
    const { world_id, boss_id } = req.body;

    try {
        // Verifica se o relacionamento já existe
        const existingRelation = await WorldBoss.findOne({ where: { world_id, boss_id } });
        if (existingRelation) {
            return res.status(400).json({ message: 'Este relacionamento já existe.' });
        }

        // Cria o novo relacionamento
        const newWorldBoss = await WorldBoss.create({ world_id, boss_id });

        return res.status(201).json(newWorldBoss);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o relacionamento.' });
    }
};

const getBossesByWorld = async (req, res) => {
    const { world_id } = req.params;

    try {
        const worldBosses = await WorldBoss.findAll({
            where: { world_id },
            include: [
                {
                    model: Boss,
                    attributes: ['id', 'name']  // Retorna apenas o id e name do boss
                }
            ]
        });

        if (worldBosses.length === 0) {
            return res.status(404).json({ message: 'Nenhum boss encontrado para esse mundo.' });
        }

        return res.status(200).json(worldBosses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar os bosses.' });
    }
};

const deleteWorldBoss = async (req, res) => {
    const { world_id, boss_id } = req.params;

    try {
        const deletedCount = await WorldBoss.destroy({
            where: { world_id, boss_id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Relacionamento não encontrado.' });
        }

        return res.status(200).json({ message: 'Relacionamento excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir o relacionamento.' });
    }
};

module.exports = {
    createWorldBoss,
    getBossesByWorld,
    deleteWorldBoss
};