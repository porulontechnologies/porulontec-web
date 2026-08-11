import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Training = sequelize.define(
  'Training',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    kicker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    processSteps: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    faqs: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      defaultValue: '/images/service-ai.jpg',
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: 'psychology',
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default Training;
