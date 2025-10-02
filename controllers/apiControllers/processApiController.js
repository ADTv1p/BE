import processApiService from '../../services/apiServices/processApiService.js';

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const getAllProcessesApiController = async (req, res) => {
	try {
		const result = await processApiService.getAllProcessesApiService();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const getSupportProcessesApiController = async (req, res) => {
    try {
        const result = await processApiService.getSupportProcessesApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const handleCreatProcessApiController = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			return res.json({ EM: 'Tên và loại mô tả đều là bắt buộc', EC: 1, DT: null });
		}

		const exists = await processApiService.checkProcessesExistsApiService(name, description);
		if (exists) {
			return res.json({ EM: "Thao tác đã tồn tại", EC: 1, DT: null });
		}

		const result = await processApiService.createProcessApiService({ name, description });
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const handleUpdateProcess = async (req, res) => {
	try {
		const { process_id } = req.params;
		const { name, description } = req.body;
		if (!process_id) {
			return res.json({ EM: 'process_id không tồn tại', EC: 1, DT: null });
		}
		const exists = await processApiService.checkProcessesExistsById(process_id);
		if (!exists) {
			return res.json({ EM: "Thao tác này không tồn tại!", EC: 1, DT: null });
		}
		const result = await processApiService.updateProcess({process_id,name,description});
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const handleDeleteProcess = async (req, res) => {
	try {
		const { process_id } = req.params;
		if (!process_id) {
			return res.json({ EM: 'process_id không tồn tại', EC: 1, DT: null });
		}
		const exists = await processApiService.checkProcessesExistsById(process_id);
		if (!exists) {
			return res.json({ EM: "Thao tác này không tồn tại!", EC: 1, DT: null });
		}
		const result = await processApiService.deleteProcess(process_id);
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
	}
};
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
export default {
	getAllProcessesApiController,
    getSupportProcessesApiController,
	handleCreatProcessApiController,
	handleUpdateProcess,
	handleDeleteProcess
};
