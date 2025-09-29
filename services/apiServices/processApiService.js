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
    deleteProcess
};