module.exports = (sequelize, DataTypes) => {
    const WorldEnemy = sequelize.define('WorldEnemy', { 
        world_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'worlds',
                key: 'id'
            }
        },
        enemy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'enemies',
                key: 'id'
            }
        }
    }, {
        tableName: 'world_enemy', 
        timestamps: false 
    });

    return WorldEnemy;
};
