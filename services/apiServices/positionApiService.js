import db from '../../models/index.js';

const getAllPositionsApiService = async () => {
    try {
        const positions = await db.Position.findAll({
            include: [{ model: db.Process, as: "process", attributes: ["process_id", "name"] }],
        });

        return { EM: "Lấy danh sách vị trí thành công", EC: 0, DT: positions };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách vị trí", EC: 1, DT: null };
    }
};

const getSupportPositionsApiService = async () => {
    try {
        const positions = await db.Position.findAll({
            include: [{
                model: db.Staff, as: "staffs"
            }]
        });
        return { EM: "Lấy danh sách vị trí hỗ trợ thành công", EC: 0, DT: positions };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách vị trí hỗ trợ", EC: 1, DT: null };
    }
};

const checkPositionExistsApiService = async (name) => {
    try {
        const existingPosition = await db.Position.findOne({
            where: { name },
            raw: true, nest: true,
        });
        return existingPosition ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi kiểm tra vị trí tồn tại");
    }
};

const createPositionApiService = async (data) => {
    try {
        const newPosition = await db.Position.create(data);
        return { EM: "Thêm vị trí thành công", EC: 0, DT: newPosition };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm vị trí mới", EC: 1, DT: null };
    }
};

export default { 
    getAllPositionsApiService, 
    getSupportPositionsApiService, 
    createPositionApiService, 
    checkPositionExistsApiService 
};