import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Users = sequelize.define(
		"Users",
		{
			user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
			password: { type: DataTypes.STRING(255), allowNull: false },
			name: { type: DataTypes.STRING(100), allowNull: true },
			date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
			is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
			phone: { type: DataTypes.STRING(20), allowNull: false, unique: true },
		},
		{ tableName: "users", timestamps: true }
	);

	return Users;
};
