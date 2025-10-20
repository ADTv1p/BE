import staffService from '../../services/apiServices/staffApiService.js';

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// Lấy danh sách nhân sự
const getAllStaffApiController = async (req, res) => {
    try {
        const dt = await staffService.getAllStaff();
        if (dt.EC !== 0) {
            return res.json({ error: dt.EM });
        }
        return res.json(dt);
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Lỗi lấy danh sách nhân sự' });
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// Lấy thông tin nhân sự
const getStaffInfo = async (req, res) => {
    try {
        const { staff_id } = req.params;
        const dt = await staffService.staffInfo(staff_id);
        if (dt.EC !== 0) {
            return res.json({ error: dt.EM });
        }
        return res.json(dt);
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Lỗi lấy danh sách nhân sự' });
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// Thêm mới nhân sự
const handleCreateStaff = async (req, res) => {
    try {
       const { full_name, email, phone, position_id, department, date_of_birth, start_date, status } = req.body;
        const avatar = req.file ? `images/uploads/${req.file.filename}` : null;
        
        if (!full_name || !email || !phone || !position_id) {
            return res.json({ EM: 'Thiếu thông tin bắt buộc', EC: 1, DT: null });
        }

        const result = await staffService.createStaffApiService({ full_name, email, phone, position_id, department, date_of_birth, start_date, status, avatar });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// Thêm mới nhân sự
const handleUpdateStaff = async (req, res) => {
	try {
		const { staff_id } = req.params;
        const updateData = {};
        for (const key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== null) {
                updateData[key] = req.body[key];
            }
        }

        if (req.file) {
            updateData.avatar = `images/uploads/${req.file.filename}`;
        }

        const result = await staffService.updateStaff(staff_id, updateData);
		return res.json(result);
	} catch (error) {
		console.error("Lỗi cập nhật nhân viên:", error);
		return res.json({ EC: -1, EM: "Lỗi server", DT: null });
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
export default {
    getAllStaffApiController,
    getStaffInfo,
    handleCreateStaff,
    handleUpdateStaff
};
