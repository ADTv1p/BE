import db from "../../models/index.js";
import bcrypt from "bcrypt";
import validator from "validator";

// Hàm tiện ích xử lý lỗi
const handleError = (error, defaultMessage) => ({
	EM: error.message || defaultMessage,
	EC: 1,
	DT: null,
});

// Hàm mã hóa mật khẩu
const hashPassword = async (password) => {
	if (!password) throw new Error("Mật khẩu không được để trống");
	return bcrypt.hash(password, 10);
};

// Tạo người dùng mới
const createUser = async (name, password, phone, email, date_of_birth, username) => {
	try {
		if (!name || !password || !phone || !email) {
			return { EM: "Tên, mật khẩu, số điện thoại và email là bắt buộc", EC: 1, DT: null };
		}
		if (!validator.isEmail(email)) return { EM: "Email không hợp lệ", EC: 1, DT: null };
		if (!validator.isMobilePhone(phone, "any")) return { EM: "Số điện thoại không hợp lệ", EC: 1, DT: null };

		const hashDTPassword = await hashPassword(password);
		const user = await db.Users.create({ name, password: hashDTPassword, phone, email, date_of_birth, username });

		return { EM: "Tạo người dùng thành công", EC: 0, DT: user };
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return { EM: "Số điện thoại hoặc email đã tồn tại", EC: 1, DT: null };
		}
		return handleError(error, "Không thể tạo người dùng mới");
	}
};

// Tìm người dùng theo username
const findUserByUsername = async (username) => {
	try {
		if (!username) return { EM: "Username là bắt buộc", EC: 1, DT: null };

		const user = await db.Users.findOne({
			where: { username },
			attributes: { exclude: ["password"] },
		});

		if (!user) return { EM: "Không tìm thấy người dùng", EC: 1, DT: null };

		return { EM: "Tìm kiếm thành công", EC: 0, DT: user };
	} catch (error) {
		return handleError(error, "Lỗi truy vấn người dùng");
	}
};

// Lấy danh sách người dùng
const getAllUsers = async () => {
	try {
		const users = await db.Users.findAll();
		return { EM: "Lấy danh sách người dùng thành công", EC: 0, DT: users };
	} catch (error) {
		return handleError(error, "Không thể lấy danh sách người dùng");
	}
};

export default { createUser, findUserByUsername, getAllUsers };
