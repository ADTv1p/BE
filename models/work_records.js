import { DataTypes } from "sequelize";

export default (sequelize) => {
  const WorkRecord = sequelize.define(
    "WorkRecord",
    {
      work_record_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      work_order_id: { type: DataTypes.INTEGER, allowNull: false },
      position_id: { type: DataTypes.INTEGER, allowNull: false },
      error_id: { type: DataTypes.INTEGER, allowNull: false },
      note: { type: DataTypes.TEXT, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "work_records", timestamps: false }
  );

  WorkRecord.associate = (models) => {
    WorkRecord.belongsTo(models.Error, { foreignKey: "error_id", as: "error" });
    WorkRecord.belongsTo(models.Position, { foreignKey: "position_id", as: "position" });
    WorkRecord.belongsTo(models.WorkOrder, { foreignKey: "work_order_id", as: "work_order" });
  };

  return WorkRecord;
};