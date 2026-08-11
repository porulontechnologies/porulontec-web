import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Blog = sequelize.define(
  'Blog',
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.TEXT,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING(100),
      defaultValue: 'Porulon Engineering',
    },
    authorRole: {
      type: DataTypes.STRING(100),
      defaultValue: 'Technical Architecture Team',
    },
    authorAvatar: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    authorBio: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    category: {
      type: DataTypes.STRING(100),
      defaultValue: 'AI & Machine Learning',
    },
    coverImage: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    readTime: {
      type: DataTypes.STRING(50),
      defaultValue: '5 min read',
    },
    publishedAt: {
      type: DataTypes.STRING(100),
      defaultValue: '2026-08-05',
    },
    icon: {
      type: DataTypes.STRING(100),
      defaultValue: 'FiCpu',
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: ['AI', 'Engineering', 'Architecture'],
    },
    takeaways: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    clarifications: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
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

export default Blog;
