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

    WorldEnemy.associate = function (models) {
        WorldEnemy.belongsTo(models.World, { foreignKey: 'world_id' });
        WorldEnemy.belongsTo(models.Enemy, { foreignKey: 'enemy_id' });
    };

    return WorldEnemy;
};
