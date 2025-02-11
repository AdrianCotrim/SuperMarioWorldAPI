module.exports = (sequelize, DataTypes) => {
    const Enemy = sequelize.define('Enemy', { 
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
        behaviour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'enemies', 
        timestamps: false 
    });

    return Enemy;
};
