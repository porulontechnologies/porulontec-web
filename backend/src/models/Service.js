import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Service = sequelize.define(
  'Service',
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
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    img: {
      type: DataTypes.TEXT,
      defaultValue: '/images/service-ai.jpg',
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: 'smart_toy',
    },
    processSteps: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    faqs: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

export default Service;
