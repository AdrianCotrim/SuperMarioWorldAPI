module.exports = (sequelize, DataTypes) => {
    const World = sequelize.define('World', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'worlds',
        timestamps: false
    });

    World.associate = function (models) {
        World.hasMany(models.WorldBoss, { foreignKey: 'world_id' });
        World.hasMany(models.WorldEnemy, { foreignKey: 'world_id' });
    };

    return World;
};
