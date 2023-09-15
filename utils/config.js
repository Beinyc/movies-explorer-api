require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const DEV_SECRET = 'dev-secret';
const KEY_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  PORT,
  DB,
  KEY_SECRET,
};
