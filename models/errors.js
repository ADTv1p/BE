import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Error = sequelize.define(
    "Error",
    {
      error_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "errors", timestamps: true }
  );

  Error.associate = (models) => {
    Error.hasMany(models.WorkRecord, {
      foreignKey: "error_id",
      as: "work_records",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  };

  return Error;
};
