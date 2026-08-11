import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SiteSetting = sequelize.define(
  'SiteSetting',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    siteName: {
      type: DataTypes.STRING,
      defaultValue: 'Porulon Technologies',
    },
    tagline: {
      type: DataTypes.STRING,
      defaultValue: 'Engineering Intelligent Futures',
    },
    logoText: {
      type: DataTypes.STRING,
      defaultValue: 'Porulon',
    },
    logoSubtext: {
      type: DataTypes.STRING,
      defaultValue: 'Technologies',
    },
    contactPhone: {
      type: DataTypes.STRING,
      defaultValue: '+1 (555) 019-2834',
    },
    contactEmail: {
      type: DataTypes.STRING,
      defaultValue: 'hello@porulon.tech',
    },
    contactAddress: {
      type: DataTypes.TEXT,
      defaultValue: '100 Innovation Way, Tech District, CA 94107',
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      defaultValue: '+15550192834',
    },
    socialLinks: {
      type: DataTypes.JSONB,
      defaultValue: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        facebook: '',
      },
    },
    footerText: {
      type: DataTypes.TEXT,
      defaultValue: 'Engineering intelligent futures through custom AI solutions, ML platforms, and enterprise automation.',
    },
    copyrightText: {
      type: DataTypes.STRING,
      defaultValue: 'Porulon Technologies Inc. All rights reserved.',
    },
  },
  {
    timestamps: true,
  }
);

export default SiteSetting;
