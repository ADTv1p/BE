import db from '../../models/index.js';

const getAllWorkRecordsApiService = async () => {
    try {
        const workRecords = await db.WorkRecord.findAll({
            include: [
                { model: db.Error, as: "error",},
                { model: db.Staff, as: "staff", include: [{ model: db.Position, as: "position"}]},
                { model: db.WorkOrder, as: "work_order", },
            ],
            order: [['createdAt', 'DESC']],
        });

        return { EM: "Lấy danh sách đơn công việc thành công", EC: 0, DT: workRecords };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách đơn công việc", EC: 1, DT: null };
    }
};

const getWorkRecordByIdApiService = async (work_record_id) => {
	try {
		const workRecord = await db.WorkRecord.findOne({
            where: { work_record_id },
            include: [
                { model: db.Error, as: "error" },
                { model: db.Staff, as: "staff", include: [{ 
                    model: db.Position,as: "position",
                    include: [{ 
                        model: db.Process, as: "process" 
                    }]
                }]},
                { model: db.WorkOrder, as: "work_order" },
            ],
        });

		if (!workRecord) {
			return { EM: "Không tìm thấy work record", EC: 1, DT: null };
		}

		return { EM: "Lấy chi tiết work record thành công", EC: 0, DT: workRecord };
	} catch (error) {
		console.error(error);
		return { EM: "Lỗi khi lấy chi tiết work record", EC: 1, DT: null };
	}
};

const createWorkRecordApiService = async (data) => {
    try {
        const newWorkRecord = await db.WorkRecord.create(data);
        return { EM: "Thêm báo cáo lỗi thành công", EC: 0, DT: newWorkRecord };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm báo cáo lỗi", EC: 1, DT: null };
    }
};

export default { 
    getAllWorkRecordsApiService,
    getWorkRecordByIdApiService,
    createWorkRecordApiService, 
};