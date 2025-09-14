// routes/index.js
import express from 'express';
import multer from 'multer';
import fs from "fs";
import path from "path";
import staffApiController from '../controllers/apiControllers/staffApiController.js';
import positionApiController from '../controllers/apiControllers/positionApiController.js';
import accessoryApiController from '../controllers/apiControllers/accessoryApiController.js';
import processApiController from '../controllers/apiControllers/processApiController.js';
import processStepApiController from '../controllers/apiControllers/processStepApiController.js';

const router = express.Router();

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.join("public", "images", "uploads");
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true }); // tự tạo folder nếu chưa có
		}
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const upload = multer({ storage });

// Staff Management
router.get('/staff/list', staffApiController.getAllStaffApiController);             // Lấy danh sách nhân sự
router.post('/staff/create', upload.single('avatar'), staffApiController.handleCreateStaffApiController);  // Thêm nhân sự mới
// router.put('/staff/update/:id', staffControllers.updateStaff);                      // Cập nhật nhân sự
// router.delete('/staff/delete/:id', staffControllers.deleteStaff);                   // Xóa nhân sự

// Position Management
router.get('/positions/list', positionApiController.getAllPositionsApiController);   // Lấy danh sách vị trí
router.post('/positions/create', positionApiController.handleCreatePositionApiController); // Thêm vị trí mới
router.get('/positions/support/list', positionApiController.getSupportPositionsApiController); // Lấy danh sách vị trí hỗ trợ

// Accessory Management
router.get('/accessories/list', accessoryApiController.getAllAccessoriesApiController);   // Lấy danh sách phụ kiện
router.get('/accessories/support/list', accessoryApiController.getSupportAccessoriesApiController);
router.post('/accessories/create', accessoryApiController.handleCreateAccessoryApiController); // Thêm phụ kiện mới
router.put('/accessories/update', accessoryApiController.handleUpdateAccessoryApiController);

router.get('/processes/list', processApiController.getAllProcessesApiController); 
router.get('/processes/support/list', processApiController.getSupportProcessesApiController);
router.post('/processes/create', processApiController.handleCreatProcessApiController);   // Lấy danh sách phụ kiện

router.get('/process-steps/support/list', processStepApiController.getSupportProcessStepApiController);
router.post('/process-steps/create', processStepApiController.handleCreatProcessStepApiController);
router.get('/process-steps/:process_step_id', processStepApiController.getProcessStepDetailApiController);
export default router;
