module.exports = (sequelize, DataTypes) => {
    const WorldBoss = sequelize.define('WorldBoss', { 
        world_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'worlds',
                key: 'id'
            }
        },
        boss_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bosses',
                key: 'id'
            }
        }
    }, {
        tableName: 'world_boss', 
        timestamps: false 
    });

    return WorldBoss;
};
