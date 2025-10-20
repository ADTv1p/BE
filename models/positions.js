import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Position = sequelize.define(
		"Position",
		{
			position_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
			role: { type: DataTypes.STRING(100), allowNull: false },
			tools: DataTypes.STRING(255),
			process_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "processes", key: "process_id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{ tableName: "positions", timestamps: false }
	);

	Position.associate = (models) => {
		Position.hasMany(models.Staff, { foreignKey: "position_id", as: "staffs" });
		Position.belongsTo(models.Process, { foreignKey: "process_id", as: "process" }); // sửa ở đây
	};


	return Position;
};
