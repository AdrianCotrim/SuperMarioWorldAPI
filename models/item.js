module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', { 
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
        tableName: 'items', 
        timestamps: false 
    });

    return Item;
};
