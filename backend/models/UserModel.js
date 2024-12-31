const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.hasMany(Message, { as: 'ReceivedMessages', foreignKey: 'recipientId' });
User.hasMany(Message, { as: 'SentMessages', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Recipient', foreignKey: 'recipientId' });
Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });

module.exports = { User, Message };
