import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Staff = sequelize.define(
		"Staff",
		{
			staff_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			full_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
			phone: {
				type: DataTypes.STRING(15),
				allowNull: false,
				unique: true,
			},
			position_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "positions",
					key: "position_id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			department: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			date_of_birth: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			start_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			status: {
				type: DataTypes.ENUM("active", "inactive", "resigned", "suspended"),
				allowNull: false,
				defaultValue: "active",
			},
			avatar: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Ảnh đại diện nhân sự",
			},
		},
		{
			tableName: "staffs",
			timestamps: true,
		}
	);

	Staff.associate = (models) => {
		Staff.belongsTo(models.Position, { foreignKey: "position_id", as: "position" });
		Staff.hasMany(models.WorkRecord, { foreignKey: "staff_id", as: "work_records" });
	};


	return Staff;
};
