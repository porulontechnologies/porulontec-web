import { Sequelize } from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.PG_DB || 'porulonstack';
const dbUser = process.env.PG_USER || 'postgres';
const dbPassword = process.env.PG_PASSWORD || '1221';
const dbHost = process.env.PG_HOST || 'localhost';
const dbPort = process.env.PG_PORT || 5432;

const ensureDatabaseExists = async () => {
  const client = new pg.Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres',
  });
  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`[PostgreSQL] Database "${dbName}" created successfully!`);
    }
  } catch (err) {
    console.warn(`[PostgreSQL Check] Notice: ${err.message}`);
  } finally {
    await client.end().catch(() => {});
  }
};

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log(`[PostgreSQL] Connected successfully to database: ${dbName}`);
    return true;
  } catch (error) {
    console.error(`[PostgreSQL Error] Connection failed: ${error.message}`);
    return false;
  }
};
