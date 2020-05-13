export const config = {
  DAY_PATTERN: 'YYYY-MM-DD',
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGO_URL: process.env.MONGO_URL,
  BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
  PORT: process.env.PORT || 4000,
  TZ: 'America/Lima'
}
