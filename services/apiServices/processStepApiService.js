import db from '../../models/index.js';
import { Op, where } from 'sequelize';

const getSupportProcessStepApiService = async () => {
    try {
        const processSteps = await db.ProcessStep.findAll({
            attributes: ['position_id', 'code'], 
            raw: true, nest: true,
        });
        return { EM: "Lấy danh sách vị trí hỗ trợ thành công", EC: 0, DT: processSteps };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách vị trí hỗ trợ", EC: 1, DT: null };
    }
};
const getProcessStepDetailApiService = async (process_step_id) => {
    try {
        const processStep = await db.ProcessStep.findOne({
			where: { process_step_id },
			include: [{ model: db.Accessory, as: "accessory" }],
        });
		if (!processStep) {
			return { EM: "Bước thao tác không tồn tại", EC: 1, DT: null };
		}
        return { EM: "Lấy thông tin của bước thao tác thành công", EC: 0, DT: processStep };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách vị trí hỗ trợ", EC: 1, DT: null };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const checkProcessStepsExists = async (process_id, step_name = '', step_order = '') => {
	try {
		if (!process_id) return { exists: false };

		const whereCondition = { process_id };
		if (step_name || step_order) {
			whereCondition[Op.or] = [];
			if (step_name) whereCondition[Op.or].push({ step_name });
			if (step_order) whereCondition[Op.or].push({ step_order });
		}

		const existingSteps = await db.ProcessStep.findAll({ where: whereCondition });
		if (!existingSteps.length) return { exists: false };

		const nameConflict = step_name ? existingSteps.find(s => s.step_name === step_name) : null;
		const orderConflict = step_order ? existingSteps.find(s => s.step_order === step_order) : null;

		return {
			exists: true,
			nameConflict: !!nameConflict,
			orderConflict: !!orderConflict,
			conflict:
				nameConflict && orderConflict
					? "Tên và thứ tự bước đều đã tồn tại"
					: nameConflict
					? "Tên bước đã tồn tại"
					: orderConflict
					? "Thứ tự bước đã tồn tại"
					: undefined,
			data: { nameConflict, orderConflict },
		};
	} catch (error) {
		console.error("Lỗi khi kiểm tra bước:", error);
		throw new Error("Lỗi khi kiểm tra bước tồn tại");
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const checkProcessStepExistsById = async (process_step_id) => {
	try {
		if (!process_step_id) return false;

		const step = await db.ProcessStep.findOne({ where: { process_step_id } });
		return !!step;
	} catch (error) {
		console.error("Lỗi khi kiểm tra bước:", error);
		return false;
	}
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const createProcessStepApiService = async (data) => {
    try {
        const newProcessStep = await db.ProcessStep.create(data);
        return { EM: "Thêm quy trình thao tác thành công", EC: 0, DT: newProcessStep };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm quy trình thao tác mới", EC: 1, DT: null };
    }
};

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const deleteProcessStep = async (process_step_id) => {
    try {
        const deleted = await db.ProcessStep.destroy({ where: { process_step_id } });
        if (deleted) {
            return { EM: "Xóa bước thao tác thành công", EC: 0, DT: null };
        } else {
            return { EM: "Không tìm thấy bước cần xóa", EC: 1, DT: null };
        }
    } catch (error) {
        console.error(error);
        return { EM: "Không thể xóa quy trình thao tác", EC: 1, DT: null };
    }
};

export default { 
    getSupportProcessStepApiService,
	getProcessStepDetailApiService,
    checkProcessStepsExists,
	checkProcessStepExistsById,
    createProcessStepApiService,
    deleteProcessStep,
};