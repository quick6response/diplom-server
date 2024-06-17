export const ApplicationConfig = {
  db: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'SystemEducation',
  },
  auth: {
    secret: 'secret',
    // 60s
    assessTokenTime: 60,
    // 30d
    refreshTokenTime: 60 * 60 * 24 * 30,
  },
};
