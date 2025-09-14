import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Accessory = sequelize.define(
		"Accessory",
		{
			accessory_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			name: { type: DataTypes.STRING(100), allowNull: false },
			type: { type: DataTypes.STRING(50), allowNull: true },
		},
		{ tableName: "accessories", timestamps: true }
	);

	Accessory.associate = (models) => {
		Accessory.hasMany(models.ProcessStep, { foreignKey: "accessory_id",as: "process_steps" })
	};

	return Accessory;
};
