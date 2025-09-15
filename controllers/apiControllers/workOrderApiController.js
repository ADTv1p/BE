import workOrderApiService from '../../services/apiServices/workOrderApiService.js';

const getAllWorkOrdersApiController = async (req, res) => {
    try {
        const result = await workOrderApiService.getAllWorkOrdersApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const getWorkOrderByIdApiController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await workOrderApiService.getWorkOrderByIdApiService(id);
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleCreateWorkOrderApiController = async (req, res) => {
    const { description, start_time, end_time, status } = req.body;
    if (!description?.trim()) {
        return res.status(400).json({ EM: 'Mô tả là bắt buộc', EC: 1, DT: null });
    }
    if (!start_time) {
        return res.status(400).json({ EM: 'Thời gian bắt đầu là bắt buộc', EC: 1, DT: null });
    }
    if (!status?.trim()) {
        return res.status(400).json({ EM: 'Trạng thái là bắt buộc', EC: 1, DT: null });
    }
    try {
        const result = await workOrderApiService.createWorkOrderApiService({ description, start_time, end_time, status });
        if (result.EC === 0) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleUpdateWorkOrderApiController = async (req, res) => {
    const { work_order_id, description, start_time, end_time, status } = req.body;
    if (!work_order_id) {
        return res.status(400).json({ EM: 'ID đơn công việc là bắt buộc', EC: 1, DT: null });
    }
    try {
        const result = await workOrderApiService.updateWorkOrderApiService({ work_order_id, description, start_time, end_time, status });
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

export default { 
    getAllWorkOrdersApiController, 
    getWorkOrderByIdApiController, 
    handleCreateWorkOrderApiController,
    handleUpdateWorkOrderApiController 
};