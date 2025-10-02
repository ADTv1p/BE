import { Op } from 'sequelize';
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
    deleteProcess
};