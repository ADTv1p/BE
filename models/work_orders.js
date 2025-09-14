import { DataTypes } from "sequelize";

export default (sequelize) => {
  const WorkOrder = sequelize.define(
    "WorkOrder",
    {
      work_order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      description: DataTypes.TEXT,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("pending", "in_progress", "completed", "cancelled"),
        defaultValue: "pending",
      },
    },
    { tableName: "work_orders", timestamps: true }
  );

  WorkOrder.associate = (models) => {
    WorkOrder.hasMany(models.WorkRecord, { foreignKey: "work_order_id", as: "work_records" });
  };

  return WorkOrder;
};
