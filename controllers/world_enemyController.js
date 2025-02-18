const { WorldEnemy, Enemy } = require('../models');

const createWorldEnemy = async (req, res) => {
    const { world_id, enemy_id } = req.body;

    // Verifica se os IDs foram fornecidos
    if (!world_id || !enemy_id) {
        return res.status(400).json({ message: 'world_id e enemy_id são obrigatórios.' });
    }

    try {
        // Verifica se o relacionamento já existe
        const existingRelation = await WorldEnemy.findOne({ where: { world_id, enemy_id } });
        if (existingRelation) {
            return res.status(400).json({ message: 'Este relacionamento já existe.' });
        }

        // Cria o novo relacionamento
        const newWorldEnemy = await WorldEnemy.create({ world_id, enemy_id });

        return res.status(201).json(newWorldEnemy);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o relacionamento.' });
    }
};

const getEnemyByWorld = async (req, res) => {
    const { world_id } = req.params;

    if (!world_id) {
        return res.status(400).json({ message: 'world_id é obrigatório.' });
    }

    try {
        const worldEnemies = await WorldEnemy.findAll({
            where: { world_id },
            include: [{
                model: Enemy,
                attributes: ['id', 'name']  // Retorna apenas o id e name do inimigo
            }]
        });

        if (worldEnemies.length === 0) {
            return res.status(404).json({ message: 'Nenhum inimigo encontrado para esse mundo.' });
        }

        // Retorna apenas a lista de inimigos, não os detalhes da relação
        const enemies = worldEnemies.map(we => we.Enemy);

        return res.status(200).json(enemies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar os inimigos.' });
    }
};

const deleteWorldEnemy = async (req, res) => {
    const { world_id, enemy_id } = req.params;

    if (!world_id || !enemy_id) {
        return res.status(400).json({ message: 'world_id e enemy_id são obrigatórios.' });
    }

    try {
        const deletedCount = await WorldEnemy.destroy({
            where: { world_id, enemy_id }
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
    createWorldEnemy,
    getEnemyByWorld,
    deleteWorldEnemy
};
