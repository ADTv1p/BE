import workRecordApiService from '../../services/apiServices/workRecordApiService.js';

const getAllWorkRecordsApiController = async (req, res) => {
    try {
        const result = await workRecordApiService.getAllWorkRecordsApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn công việc:", error);
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleCreateWorkRecordApiController = async (req, res) => {
    const { error_id, note, position_id, work_order_id } = req.body;
    if (!error_id || !position_id || !work_order_id || !note?.trim()) {
        return res.status(400).json({ EM: 'Mọi thông tin đều bắt buộc!', EC: 1, DT: null });
    }
    try {
        const result = await workRecordApiService.createWorkRecordApiService({error_id, note, position_id, work_order_id});
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
    getAllWorkRecordsApiController,
    handleCreateWorkRecordApiController,
};