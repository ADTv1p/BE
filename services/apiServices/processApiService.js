import { Op, col } from 'sequelize';
import db from '../../models/index.js';

const getAllProcessesApiService = async () => {
    try {
       const processes = await db.Process.findAll({
            include: [
                {
                    model: db.ProcessStep,
                    as: "steps", order: [["step_order", "ASC"]],
                },
            ],
            order: [["updatedAt", "DESC"]],
        });
        return { EM: "Lấy danh sách thao tác thành công", EC: 0, DT: processes };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách thao tác", EC: 1, DT: null };
    }
};

const checkProcessesExistsApiService = async (name) => {
    try {
        const existingProcess = await db.Process.findOne({
            where: { name },
        });
        return existingProcess ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi kiểm tra quy trình tồn tại");
    }
};

const checkProcessesExistsById = async (process_id) => {
    try {
        const existingProcess = await db.Process.findOne({
            where: { process_id },
        });
        return existingProcess ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi kiểm tra quy trình tồn tại");
    }
};

const getSupportProcessesApiService = async () => {
    try {
        const processes = await db.Process.findAll({
            attributes: ['process_id', 'name'], 
            include: [{ model: db.ProcessStep, as: "steps", order: [["step_order", "ASC"]], }],
        });
        return { EM: "Lấy danh sách vị trí hỗ trợ thành công", EC: 0, DT: processes };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách vị trí hỗ trợ", EC: 1, DT: null };
    }
};

const createProcessApiService = async (data) => {
    try {
        const newProcess = await db.Process.create(data);
        return { EM: "Thêm quy trình thao tác thành công", EC: 0, DT: newProcess };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm quy trình thao tác mới", EC: 1, DT: null };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const updateProcess = async (data) => {
    try {
        const { process_id, name, description } = data;

        const existing = await db.Process.findOne({
            where: {
                name,
                process_id: { [Op.ne]: process_id } // loại trừ process hiện tại
            }
        });

        if (existing) {
            return { EM: "Tên thao tác đã tồn tại", EC: 2, DT: null };
        }

        const [updatedRows] = await db.Process.update(
            { name, description },
            { where: { process_id } }
        );

        if (updatedRows === 0) {
            return { EM: "Không tìm thấy thao tác để cập nhật", EC: 3, DT: null };
        }

        const updatedProcess = await db.Process.findByPk(process_id);

        return { EM: "Cập nhật thao tác thành công", EC: 0, DT: updatedProcess };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể cập nhật thao tác", EC: 1, DT: null };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const checkBeforeDeleteProcess = async (process_id) => {
    try {
        const staffs = await db.Staff.findAll({
            attributes: ["staff_id", "full_name", [col("position.code"), "code"]],
            include: [
                {
                    model: db.Position,
                    as: "position",
                    attributes: [],
                    where: { process_id },
                    required: true
                }
            ],
            raw: true
        });
        const otherProcesses = await db.Process.findAll({
            where: { process_id: { [Op.ne]: process_id } },
            attributes: ["process_id", "name"]
        });
        if (!staffs) {
            return { EM: "Không tìm thấy Thao tác", EC: 1, DT: null };
        }
        if (!staffs || staffs.length > 0) {
            return { EM: "Thao tác này có nhân sự khác đang thực hiện!", EC: 3, DT: {staffs, otherProcesses} };
        }
        return { EM: "Thao tác không có nhân sự liên quan, có thể xóa", EC: 0, DT: [] };
    } catch (error) {
        console.error(error);
        return { EM: "Lỗi khi kiểm tra danh sách nhân sự trước khi xóa", EC: -1, DT: { staffs: [], otherProcesses } };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const replaceAndDeleteProcess  = async (old_process_id, new_process_id) => {
    try {
		// 1. Lấy danh sách nhân sự có process_id cũ
         const staffs = await db.Staff.findAll({
            include: [
                {
                    model: db.Position,
                    as: "position",
                    where: { process_id: old_process_id },
                    required: true
                }
            ],
        });

		if (!staffs || staffs.length === 0) {
			return {
				EM: "Không có nhân sự thuộc thao tác cũ",
				EC: 1,
				DT: null,
			};
		}
		await db.Position.update(
			{ process_id: new_process_id },
			{ where: { process_id: old_process_id } }
		);
		const deleted = await db.Process.destroy({ where: { process_id: old_process_id } });
		if (!deleted) {
			return { EM: "Không tìm thấy thao tác cũ để xóa", EC: 2, DT: null };
		}
		return { EM: "Đã chuyển toàn bộ nhân sự sang thao tác mới và xóa thao tác cũ thành công", EC: 0, DT: { staffsUpdated: staffs.length }};
	} catch (error) {
		console.error(error);
        return { EM: "Lỗi khi thay thế và xóa thao tác", EC: -1, DT: null };
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const deleteProcess = async (process_id) => {
    try {
        const deleted = await db.Process.destroy({ where: { process_id } });
        if (deleted) {
            return { EM: "Xóa Thao tác thành công", EC: 0, DT: null };
        } else {
            return { EM: "Không tìm thấy Thao tác cần xóa", EC: 1, DT: null };
        }
    } catch (error) {
        console.error(error);
        return { EM: "Không thể xóa quy trình thao tác", EC: 1, DT: null };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
export default { 
    getAllProcessesApiService, 
    checkProcessesExistsApiService, checkProcessesExistsById,
    getSupportProcessesApiService,
    createProcessApiService,
    updateProcess,
    checkBeforeDeleteProcess ,
    replaceAndDeleteProcess,
    deleteProcess
};