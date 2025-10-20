import db from '../../models/index.js';

const getAllPositionsApiService = async () => {
    try {
        const positions = await db.Position.findAll({
            include: [{ model: db.Process, as: "process" }]
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

const updatePositionApiService = async ( positionId, data ) => {
	try {
		const position = await db.Position.findByPk(positionId);
		if (!position) {
			return { EM: "Không tìm thấy vị trí cần cập nhật", EC: 1, DT: null };
		}

		await position.update({
            code: data.code,
            role: data.role,
            tools: data.tools,
            process_id: data.process_id
        });

		return { EM: "Cập nhật vị trí thành công", EC: 0, DT: position };
	} catch (error) {
		console.error(error);
		return { EM: "Không thể cập nhật vị trí", EC: 1, DT: null };
	}
};

export default { 
    getAllPositionsApiService, 
    getSupportPositionsApiService, 
    createPositionApiService, 
    checkPositionExistsApiService,
    updatePositionApiService
};