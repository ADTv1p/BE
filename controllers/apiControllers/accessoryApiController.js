import accessoryApiService from '../../services/apiServices/accessoryApiService.js';

const getAllAccessoriesApiController = async (req, res) => {
    try {
        const result = await accessoryApiService.getAllAccessoriesApiService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const getSupportAccessoriesApiController = async (req, res) => {
    try {
        const result = await accessoryApiService.getSupportAccessoriesApiService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleCreateAccessoryApiController = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            return res.json({ EM: 'Tên và loại phụ kiện đều là bắt buộc', EC: 1, DT: null });
        }

        const exists = await accessoryApiService.checkAccessoryExistsApiService(name);
        if (exists) {
            return res.status(400).json({ EM: 'Phụ kiện đã tồn tại', EC: 1, DT: null });
        }

        const result = await accessoryApiService.createAccessoryApiService({ name, type });
        if (result.EC === 0) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleUpdateAccessoryApiController = async (req, res) => {
    try {
        const { name, type, accessory_id } = req.body;

        if (!name || !type) {
            return res.json({ EM: 'Tên và loại phụ kiện đều là bắt buộc', EC: 1, DT: null });
        }

        const exists = await accessoryApiService.checkAccessoryExistsApiService(name);
        if (exists) {
            return res.json({ EM: 'Phụ kiện đã tồn tại', EC: 1, DT: null });
        }

        const result = await accessoryApiService.updateAccessoryApiService({ name, type, accessory_id });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

export default {
    getAllAccessoriesApiController,
    getSupportAccessoriesApiController,
    handleCreateAccessoryApiController,
    handleUpdateAccessoryApiController
};
