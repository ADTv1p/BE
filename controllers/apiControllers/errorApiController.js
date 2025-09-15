import errorApiService from '../../services/apiServices/errorApiService.js';

const getAllErrorsApiController = async (req, res) => {
	try {
		const result = await errorApiService.getAllErrorsApiService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};

const getErrorByIdApiController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await errorApiService.getErrorByIdApiService(id);
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};

const createErrorApiController = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.json({ EM: "Tên lỗi là bắt buộc", EC: 1, DT: null });
		}

		const isExist = await errorApiService.checkErrorExistsApiService(name);
		if (isExist) {
			return res.json({ EM: "Lỗi đã tồn tại", EC: 2, DT: null });
		}
		const result = await errorApiService.createErrorApiService({ name, description });
		return res.json(result);
	} catch (error) {
		console.error("Lỗi khi tạo lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

const updateErrorApiController = async (req, res) => {
	try {
		const { error_id, name, description } = req.body;
		if (!error_id || !name) {
			return res.json({ EM: 'Thiếu ID hoặc tên lỗi', EC: 1, DT: null });
		}
		const result = await errorApiService.updateErrorApiService({ error_id, name, description });
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};

export default {
	getAllErrorsApiController,
	getErrorByIdApiController,
	createErrorApiController,
	updateErrorApiController,
};
