import e from 'express';
import db from '../../models/index.js';

const getAllErrorsApiService = async (req, res) => {
	try {
		const errors = await db.Error.findAll({ order: [["error_id", "ASC"]] });
		return { EC: 0, EM: "Lấy danh sách lỗi thành công", DT: errors };
	} catch (err) {
		console.error("Lỗi khi lấy danh sách lỗi:", err);
		return res.status(500).json({ EC: 1, EM: "Lỗi server", DT: [] });
	}
};

const getErrorByIdApiService = async (req, res) => {
	try {
		const { id } = req.params;
		const error = await db.Error.findByPk(id);
		if (!error) {
			return res.status(404).json({ EC: 1, EM: "Không tìm thấy lỗi", DT: null });
		}
		return res.json({ EC: 0, EM: "Lấy chi tiết lỗi thành công", DT: error });
	} catch (err) {
		console.error("Lỗi khi lấy chi tiết lỗi:", err);
		return res.status(500).json({ EC: 1, EM: "Lỗi server", DT: null });
	}
};

const checkErrorExistsApiService = async (name) => {
	try {
		const existingError = await db.Error.findOne({ where: { name } });
		return !!existingError; // true nếu tìm thấy, false nếu không
	} catch (err) {
		console.error("Lỗi khi kiểm tra lỗi tồn tại:", err);
		throw err;
	}
};

export const createErrorApiService = async (data) => {
	try {
		const newError = await db.Error.create(data);
		return { EC: 0, EM: "Tạo lỗi thành công", DT: newError };
	} catch (err) {
		console.error("Lỗi khi tạo lỗi:", err);
		return { EC: 1, EM: "Không thể tạo lỗi", DT: null };
	}
};

export default {
    getAllErrorsApiService,
    getErrorByIdApiService,
    checkErrorExistsApiService,
    createErrorApiService,
}; 