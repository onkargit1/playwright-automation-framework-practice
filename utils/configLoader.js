import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // loads .env variables

export function loadConfig() {
  const env = process.env.ENV || 'dev';
  const data = fs.readFileSync(`./config/${env}.json`);
  return JSON.parse(data);
}
