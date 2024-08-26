import { Dialect } from 'sequelize/types';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig(); // Load environment variables from .env

export const development = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_DEVELOPMENT,
  port: Number(process.env.DB_PORT),
};

export const test = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_TEST,
  port: Number(process.env.DB_PORT),
};

export const production = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_PRODUCTION,
  port: Number(process.env.DB_PORT),
};
