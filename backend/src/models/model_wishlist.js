const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/conn');
const User = require('./model_user');
const { product } = require('./model_product');

const Wishlist = sequelize.define('Wishlist', {
    wishlist_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    tableName: 'wishlist',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id']
        }
    ]
});

Wishlist.belongsTo(User, { foreignKey: 'user_id' });
Wishlist.belongsTo(product, { foreignKey: 'product_id' });
User.hasMany(Wishlist, { foreignKey: 'user_id' });

module.exports = { wishlist: Wishlist };
