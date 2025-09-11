// services/userService.js
import { User } from '../models/users'; // Đảm bảo bạn đã import model User
import bcrypt from 'bcrypt';
import validator from 'validator';

// Hàm tiện ích xử lý lỗi
const handleError = (error, defaultMessage) => ({
  errorMessage: error.message || defaultMessage,
  errorCode: 1,
  data: null,
});

// Hàm mã hóa mật khẩu
const hashPassword = async (password) => {
  if (!password) throw new Error('Mật khẩu không được để trống');
  return bcrypt.hash(password, 10);
};

// Tạo người dùng mới
const createUser = async (name, password, phone, email, date_of_birth, username) => {
  try {
    // Kiểm tra đầu vào
    if (!name || !password || !phone || !email) {
      return { errorMessage: 'Tên, mật khẩu, số điện thoại và email là bắt buộc', errorCode: 1, data: null };
    }
    if (!validator.isEmail(email)) {
      return { errorMessage: 'Email không hợp lệ', errorCode: 1, data: null };
    }
    if (!validator.isMobilePhone(phone, 'any')) {
      return { errorMessage: 'Số điện thoại không hợp lệ', errorCode: 1, data: null };
    }

    // Tạo người dùng
    const hashedPassword = await hashPassword(password);
    const user = await db.User.create({ name, password: hashedPassword, phone, email, date_of_birth, username });

    return { errorMessage: 'Tạo người dùng thành công', errorCode: 0, data: user };
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return { errorMessage: 'Số điện thoại hoặc email đã tồn tại', errorCode: 1, data: null };
    }
    return handleError(error, 'Không thể tạo người dùng mới');
  }
};

// Tìm người dùng theo username
const findUserByUsername = async (username) => {
  try {
    if (!username) {
      return { errorMessage: 'Username là bắt buộc', errorCode: 1, data: null };
    }

    const user = await db.User.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return { errorMessage: 'Không tìm thấy người dùng', errorCode: 1, data: null };
    }

    return { errorMessage: 'Tìm kiếm thành công', errorCode: 0, data: user };
  } catch (error) {
    return handleError(error, 'Lỗi truy vấn người dùng');
  }
};

// Lấy danh sách người dùng
const getAllUsers = async () => {
  try {
    const users = await User.findAll({});
    return { errorMessage: 'Lấy danh sách người dùng thành công', errorCode: 0, data: users };
  } catch (error) {
    return handleError(error, 'Không thể lấy danh sách người dùng');
  }
};

export default { createUser, findUserByUsername, getAllUsers };