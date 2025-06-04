import { Sequelize } from "sequelize";

const db = new Sequelize("gpu", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
