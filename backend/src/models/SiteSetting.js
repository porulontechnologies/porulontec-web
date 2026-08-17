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
    logoUrl: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    salesPhone: {
      type: DataTypes.STRING,
      defaultValue: '+91 90470 99277',
    },
    generalPhone: {
      type: DataTypes.STRING,
      defaultValue: '+91 90470 99277',
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      defaultValue: '+91 422 714 1668',
    },
    contactPhone: {
      type: DataTypes.STRING,
      defaultValue: '+91 90470 99277',
    },
    contactEmail: {
      type: DataTypes.STRING,
      defaultValue: 'info@porulontech.com',
    },
    contactAddress: {
      type: DataTypes.TEXT,
      defaultValue: 'Porulon Technologies, Coimbatore, Tamil Nadu, India',
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      defaultValue: '+919047099277',
    },
    newsletterHeading: {
      type: DataTypes.STRING,
      defaultValue: 'Stay Updated',
    },
    socialLinks: {
      type: DataTypes.JSONB,
      defaultValue: {
        linkedin: 'https://www.linkedin.com/company/porulon-technologies/',
        facebook: 'https://www.facebook.com/share/1H1t8X4oKd/',
        instagram: 'https://www.instagram.com/porulon_technologies',
        twitter: '',
        github: '',
      },
    },
    footerText: {
      type: DataTypes.TEXT,
      defaultValue: 'Architecting enterprise AI, cloud systems, and intelligent software ecosystems that accelerate digital transformation.',
    },
    copyrightText: {
      type: DataTypes.STRING,
      defaultValue: '© 2026 Porulon Technologies Pvt. Ltd. All rights reserved.',
    },
    fontFamily: {
      type: DataTypes.STRING,
      defaultValue: 'Plus Jakarta Sans',
    },
    primaryColor: {
      type: DataTypes.STRING,
      defaultValue: '#7c3aed',
    },
    secondaryColor: {
      type: DataTypes.STRING,
      defaultValue: '#3cddc7',
    },
    themePreset: {
      type: DataTypes.STRING,
      defaultValue: 'Quantum Violet',
    },
  },
  {
    timestamps: true,
  }
);

export default SiteSetting;
