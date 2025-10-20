import positionApiService from '../../services/apiServices/positionApiService.js';

const getAllPositionsApiController = async (req, res) => {
    try {
        const result = await positionApiService.getAllPositionsApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const getSupportPositionsApiController = async (req, res) => {
    try {
        const result = await positionApiService.getSupportPositionsApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleCreatePositionApiController = async (req, res) => {
    const { code, role, tools, process_id } = req.body;
    if (!code?.trim()) {
        return res.status(400).json({ EM: 'Mã vị trí là bắt buộc', EC: 1, DT: null });
    }
    if (!role?.trim()) {
        return res.status(400).json({ EM: 'Vai trò là bắt buộc', EC: 1, DT: null });
    }
    if (!tools?.trim()) {
        return res.status(400).json({ EM: 'Dụng cụ là bắt buộc', EC: 1, DT: null });
    }
    if (!process_id) {
        return res.status(400).json({ EM: 'Thao tác là bắt buộc', EC: 1, DT: null });
    }
    try {
        const result = await positionApiService.createPositionApiService({ code, role, tools, process_id });
        if (result.EC === 0) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleUpdatePositionApiController = async (req, res) => {
    const { positionId } = req.params;
    const { code, role, tools, process_id } = req.body;
    const data = { code, role, tools, process_id }
    try {
        const result = await positionApiService.updatePositionApiService(positionId, data);
        if (result.EC === 0) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

export default { 
    getAllPositionsApiController, 
    getSupportPositionsApiController, 
    handleCreatePositionApiController,
    handleUpdatePositionApiController
};