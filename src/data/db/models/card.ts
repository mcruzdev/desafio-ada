import { DataTypes } from "sequelize";

import database from "../../../config/sequelize/database";

export default database.define("cards", {
  id: {
    type: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  listName: {
    type: DataTypes.STRING,
  },
});
