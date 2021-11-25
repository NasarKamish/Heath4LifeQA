// Update with your config settings.
const creds = require('./config/db');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME || creds.DATA,
      user: process.env.POSTGRES_USER || creds.USER,
      password: process.env.POSTGRES_USER_PW || creds.PASS,
      port: process.env.POSTGRES_PORT || creds.PORT,
      host: process.env.POSTGRES_HOST || creds.HOST
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    ssl: {
      rejectUnauthorized: false
    }
  }
};
