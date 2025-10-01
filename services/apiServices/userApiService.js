import db from "../../models/index.js";
import { fn, col, literal } from "sequelize";
import bcrypt from "bcrypt";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Hàm đăng ký người dùng
const registerUser = async ({ name, email, password, phone, date_of_birth }) => {
	if (!name || !email || !password) {
		return { EC: 1, EM: "Thiếu thông tin bắt buộc" };
	}

	// Kiểm tra email đã tồn tại chưa
	const existing = await db.Users.findOne({ where: { email } });
	if (existing) return { EC: 2, EM: "Email đã được sử dụng" };

	// Mã hóa mật khẩu
	const hashedPassword = await bcrypt.hash(password, 10);

	// Tạo user mới
	const newUser = await db.Users.create({
		name,
		email,
		password: hashedPassword,
		phone,
		date_of_birth
	});

	return { EC: 0, EM: "Đăng ký thành công", DT: newUser };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const loginUser = async ({ email, password }) => {
	if (!email || !password) {
		return { EC: 1, EM: "Thiếu thông tin bắt buộc", DT: null };
	}

	const existing = await db.Users.findOne({ where: { email } });
	if (!existing) return { EC: 2, EM: "Tài khoản không tồn tại!", DT: null };

	// So sánh mật khẩu
	const isMatch = await bcrypt.compare(password, existing.password);
	if (!isMatch) return { EC: 3, EM: "Mật khẩu không đúng", DT: null };

	// Đăng nhập thành công
	return { EC: 0, EM: "Đăng nhập thành công", DT: existing };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { registerUser, loginUser };
