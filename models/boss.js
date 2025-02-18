module.exports = (sequelize, DataTypes) => {
    const Boss = sequelize.define('Boss', { 
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
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'bosses', 
        timestamps: false 
    });

    Boss.associate = function(models) {
        Boss.hasMany(models.WorldBoss, { foreignKey: 'boss_id' });
    };

    return Boss;
};
