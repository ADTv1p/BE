import db from "../../models/index.js";
import { Op } from 'sequelize';

// Hàm tiện ích xử lý lỗi
const handleError = (error, defaultMessage) => ({
	EM: error.message || defaultMessage,
	EC: 1,
	DT: null,
});

// Lấy danh sách nhân sự
const getAllStaffApiService = async () => {
    try {
        const staff = await db.Staff.findAll();
        return { EM: "Lấy danh sách nhân sự thành công", EC: 0, DT: staff };
    } catch (error) {
        return handleError(error, "Không thể lấy danh sách nhân sự");
    }
};

// Kiểm tra nhân sự đã tồn tại
const checkStaffExistsApiService = async (email, phone) => {
    try {
        const existingStaff = await db.Staff.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { phone }
                ]
            }
        });
        return existingStaff ? true : false;
    } catch (error) {
        throw new Error("Lỗi khi kiểm tra nhân sự tồn tại");
    }
};

// Thêm mới nhân sự
const createStaffApiService = async (data) => {
    try {
        const newStaff = await db.Staff.create(data);
        return { EM: "Thêm nhân sự thành công", EC: 0, DT: newStaff };
    } catch (error) {
        return handleError(error, "Không thể thêm nhân sự mới");
    }
};

export default { getAllStaffApiService, createStaffApiService, checkStaffExistsApiService };
