import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'mvc_mock.sqlite')
});

export { sequelize as default };
