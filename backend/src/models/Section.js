import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Section = sequelize.define(
  'Section',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'home',
    },
    sectionKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
    },
    subtitle: {
      type: DataTypes.TEXT,
    },
    kicker: {
      type: DataTypes.STRING,
    },
    badge: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    mediaUrl: {
      type: DataTypes.TEXT,
    },
    secondaryMediaUrl: {
      type: DataTypes.TEXT,
    },
    points: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    stats: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    buttons: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    items: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    slides: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    layoutStyle: {
      type: DataTypes.STRING,
      defaultValue: 'grid',
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    archivedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

export default Section;
