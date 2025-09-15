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
import errorApiController from '../controllers/apiControllers/errorApiController.js';
import workRecordApiController from '../controllers/apiControllers/workRecordApiController.js';
import workOrderApiController from '../controllers/apiControllers/workOrderApiController.js';

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
router.get('/staff/list', staffApiController.getAllStaffApiController);
router.post('/staff/create', upload.single('avatar'), staffApiController.handleCreateStaffApiController);

// Position Management
router.get('/positions/list', positionApiController.getAllPositionsApiController);
router.post('/positions/create', positionApiController.handleCreatePositionApiController);
router.get('/positions/support/list', positionApiController.getSupportPositionsApiController);

// Accessory Management
router.get('/accessories/list', accessoryApiController.getAllAccessoriesApiController);
router.get('/accessories/support/list', accessoryApiController.getSupportAccessoriesApiController);
router.post('/accessories/create', accessoryApiController.handleCreateAccessoryApiController);
router.put('/accessories/update', accessoryApiController.handleUpdateAccessoryApiController);

// Process Management
router.get('/processes/list', processApiController.getAllProcessesApiController);
router.get('/processes/support/list', processApiController.getSupportProcessesApiController);
router.post('/processes/create', processApiController.handleCreatProcessApiController);

// Process Step Management
router.get('/process-steps/support/list', processStepApiController.getSupportProcessStepApiController);
router.post('/process-steps/create', processStepApiController.handleCreatProcessStepApiController);
router.get('/process-steps/:process_step_id', processStepApiController.getProcessStepDetailApiController);

// Error Management
router.get('/errors/list', errorApiController.getAllErrorsApiController);
router.get('/errors/:id', errorApiController.getErrorByIdApiController);
router.post('/errors/create', errorApiController.createErrorApiController);
router.put('/errors/update', errorApiController.updateErrorApiController);

// // WorkRecord Management
router.get('/work-records/list', workRecordApiController.getAllWorkRecordsApiController);
// router.get('/work-records/:id', workRecordApiController.getWorkRecordByIdApiController);
router.post('/work-records/create', workRecordApiController.handleCreateWorkRecordApiController);
// router.put('/work-records/update', workRecordApiController.updateWorkRecordApiController);

// // WorkOrder Management
router.get('/work-orders/list', workOrderApiController.getAllWorkOrdersApiController);
// router.get('/work-orders/:id', workOrderApiController.getWorkOrderByIdApiController);
// router.post('/work-orders/create', workOrderApiController.createWorkOrderApiController);
// router.put('/work-orders/update', workOrderApiController.updateWorkOrderApiController);

export default router;
