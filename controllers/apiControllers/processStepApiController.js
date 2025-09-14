import processStepApiService from '../../services/apiServices/processStepApiService.js';

const getSupportProcessStepApiController = async (req, res) => {
    try {
        const result = await processStepApiService.getSupportProcessStepApiService();
        if (result.EC === 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const getProcessStepDetailApiController = async (req, res) => {
    try {
        const process_step_id = req.params.process_step_id;
        const result = await processStepApiService.getProcessStepDetailApiService(process_step_id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ EM: 'Lỗi server', EC: 1, DT: null });
    }
};

const handleCreatProcessStepApiController = async (req, res) => {
    try {
		const { process_id, instruction, tool_required, step_name, step_order, accessories_used, accessory_id } = req.body;

		if (!process_id || !step_name || !step_order) {
			return res.json({ EM: 'Tên và loại mô tả đều là bắt buộc', EC: 1, DT: null });
		}

		const exists = await processStepApiService.checkProcessStepsExistsApiService(process_id, step_name, step_order);
		if (exists.exists) {
			return res.json({ EM: exists.conflict || "sos", EC: 1, DT: null });
		}
		
        const result = await processStepApiService.createProcessStepApiService({ process_id, instruction, tool_required, step_name, step_order, accessories_used, accessory_id });
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
    getSupportProcessStepApiController,
    getProcessStepDetailApiController,
	handleCreatProcessStepApiController
};
