import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ContactMessage = sequelize.define(
  'ContactMessage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    company: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    interest: {
      type: DataTypes.STRING,
      defaultValue: 'General Inquiry',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

export default ContactMessage;
