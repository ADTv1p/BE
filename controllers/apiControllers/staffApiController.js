import staffService from '../../services/apiServices/staffApiService.js';

// Lấy danh sách nhân sự
const getAllStaffApiController = async (req, res) => {
    try {
        const dt = await staffService.getAllStaffApiService();
        if (dt.EC !== 0) {
            return res.json({ error: dt.EM });
        }
        return res.json(dt);
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Lỗi lấy danh sách nhân sự' });
    }
};

// Thêm mới nhân sự
const handleCreateStaffApiController = async (req, res) => {
    try {
       const { full_name, email, phone, position_id, department, date_of_birth, start_date, status } = req.body;
        const avatar = req.file ? `images/uploads/${req.file.filename}` : null;

        console.log("Received data:", req.body);
        console.log("Avatar path:", avatar);


        // Kiểm tra dữ liệu đầu vào
        if (!full_name || !email || !phone || !position_id) {
            return res.json({ EM: 'Thiếu thông tin bắt buộc', EC: 1, DT: null });
        }

        // Gọi service để thêm mới nhân sự
        const result = await staffService.createStaffApiService({ full_name, email, phone, position_id, department, date_of_birth, start_date, status, avatar });
        if (result.EC === 0) {
            return res.json(result);
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

export default {
    getAllStaffApiController,
    handleCreateStaffApiController
};
