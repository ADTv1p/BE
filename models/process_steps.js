import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ProcessStep = sequelize.define(
    "ProcessStep",
    {
      process_step_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      process_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "processes", key: "process_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      accessory_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // tùy nhu cầu có bắt buộc hay không
        references: { model: "accessories", key: "accessory_id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      step_order: { type: DataTypes.INTEGER, allowNull: false },
      step_name: { type: DataTypes.STRING(100), allowNull: false },
      instruction: { type: DataTypes.TEXT, allowNull: true },
      tool_required: { type: DataTypes.STRING(255), allowNull: true },
      accessories_used: { type: DataTypes.STRING(255), allowNull: true },
    },
    { tableName: "process_steps", timestamps: true }
  );

  ProcessStep.associate = (models) => {
    ProcessStep.belongsTo(models.Process, { foreignKey: "process_id", as: "process" });
   ProcessStep.belongsTo(models.Accessory, { foreignKey: "accessory_id", as: "accessory" });
  };

  return ProcessStep;
};
