import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Users = sequelize.define(
		"Users",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				comment: "ID duy nhất, tự động tăng",
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
				comment: "Email, không trùng lặp",
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
				comment: "Mật khẩu (đã mã hóa, nên dùng độ dài lớn)",
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: true,
				comment: "Họ và tên",
			},
			date_of_birth: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				comment: "Ngày sinh",
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "Thời gian tạo tài khoản",
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "Thời gian cập nhật",
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
				comment: "Trạng thái tài khoản (kích hoạt hay không)",
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
				comment: "Số điện thoại, không trùng lặp",
			},
		},
		{
			tableName: "users",
			timestamps: true,
			underscored: false,
		}
	);

	return Users;
};
