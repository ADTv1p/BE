import staffService from '../../services/apiServices/staffApiService.js';

// Lấy danh sách nhân sự
const getAllStaffApiController = async (req, res) => {
    try {
        const dt = await staffService.getAllStaffApiService();
        if (dt.EC !== 0) {
            return res.status(400).json({ error: dt.EM });
        }
        return res.status(200).json({ message: dt.EM, staff: dt.DT });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi lấy danh sách nhân sự' });
    }
};

// Thêm mới nhân sự
const handleCreateStaffApiController = async (req, res) => {
    try {
        const { full_name, email, phone, position_id, department, date_of_birth, start_date, status } = req.body;
        const avatar = req.filePathForDB || null;

        // Kiểm tra dữ liệu đầu vào
        if (!full_name || !email || !phone || !position_id) {
            return res.status(400).json({ EM: 'Thiếu thông tin bắt buộc', EC: 1, DT: null });
        }

        // Gọi service để thêm mới nhân sự
        const result = await staffService.createStaffApiService({ full_name, email, phone, position_id, department, date_of_birth, start_date, status, avatar });
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
    getAllStaffApiController,
    handleCreateStaffApiController
};
