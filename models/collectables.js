module.exports = (sequelize, DataTypes) => {
    const Collectable = sequelize.define('Collectable', { 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
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
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'collectables', 
        timestamps: false 
    });

    return Collectable;
};
