module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define('Character', { 
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
        tableName: 'characters', 
        timestamps: false 
    });

    return Character;
};
