import db from "../../models/index.js";
import { Op } from 'sequelize';

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const handleError = (error, defaultMessage) => ({
	EM: error.message || defaultMessage,
	EC: 1,
	DT: null,
});
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const getAllStaff = async () => {
    try {
        const staff = await db.Staff.findAll({
            include: [{ model: db.Position, as: 'position', include: [{ model: db.Process, as: 'process', include: [{ model: db.ProcessStep, as: 'steps'}] }] }],
            order: [['updatedAt', 'DESC']]
        });
        return { EM: "Lấy danh sách nhân sự thành công", EC: 0, DT: staff };
    } catch (error) {
        return handleError(error, "Không thể lấy danh sách nhân sự");
    }
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const staffInfo = async (staff_id) => {
    try {
        const staff = await db.Staff.findOne({
            where: { staff_id: staff_id },
            include: [{ model: db.Position, as: 'position', 
                include: [{ 
                    model: db.Process, as: 'process', 
                    include: [{ 
                        model: db.ProcessStep, as: 'steps'
                    }] 
                }] 
            }],
        });
        return { EM: "Lấy danh sách nhân sự thành công", EC: 0, DT: staff };
    } catch (error) {
        return handleError(error, "Không thể lấy danh sách nhân sự");
    }
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const checkStaffExists = async (email, phone) => {
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
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const createStaffApiService = async (data) => {
    try {
        const newStaff = await db.Staff.create(data);
        return { EM: "Thêm nhân sự thành công", EC: 0, DT: newStaff };
    } catch (error) {
        return handleError(error, "Không thể thêm nhân sự mới");
    }
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const updateStaff = async (staff_id, updateData) => {
	try {
		const updated = await db.Staff.update(updateData, {
			where: { staff_id },
			returning: true, 
			plain: true      
		});
		const updatedStaff = updated[1] || await db.Staff.findByPk(staff_id);
		return { EM: "Cập nhật nhân sự thành công", EC: 0, DT: updatedStaff };
	} catch (error) {
		console.error("Lỗi cập nhật nhân sự:", error);
		return handleError(error, "Không thể cập nhật nhân sự");
	}
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
export default { 
    getAllStaff, 
    staffInfo,
    createStaffApiService, 
    updateStaff,
    checkStaffExists
};
