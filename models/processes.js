import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Process = sequelize.define(
		"Process",
		{
			process_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			name: { type: DataTypes.STRING(100), allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: true },
		},
		{ tableName: "processes", timestamps: true }
	);

	Process.associate = (models) => {
        Process.hasMany(models.Position, { foreignKey: "process_id", as: "positions" });
        Process.hasMany(models.ProcessStep, { foreignKey: "process_id", as: "steps" });
    };

	return Process;
};
