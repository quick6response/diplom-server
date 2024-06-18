export const db = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'SystemEducation',
};
export const auth = {
  secret: 'secret',
  // 60s
  assessTokenTime: 60 * 60,
  // 30d
  refreshTokenTime: 60 * 60 * 24 * 30,
};
