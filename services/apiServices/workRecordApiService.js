import db from '../../models/index.js';

const getAllWorkRecordsApiService = async () => {
    try {
        const workRecords = await db.WorkRecord.findAll({
            include: [
                { model: db.Error, as: "error",},
                { model: db.Position, as: "position", include: [{ model: db.Staff, as: "staffs"}] },
                { model: db.WorkOrder, as: "work_order", },
            ],
        });

        return { EM: "Lấy danh sách đơn công việc thành công", EC: 0, DT: workRecords };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách đơn công việc", EC: 1, DT: null };
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
    createWorkRecordApiService, 
};