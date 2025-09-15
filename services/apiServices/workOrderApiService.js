import db from '../../models/index.js';

const getAllWorkOrdersApiService = async () => {
    try {
        const workOrders = await db.WorkOrder.findAll({});

        return { EM: "Lấy danh sách đơn công việc thành công", EC: 0, DT: workOrders };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách đơn công việc", EC: 1, DT: null };
    }
};

const getWorkOrderByIdApiService = async (id) => {
    try {
        const workOrder = await db.WorkOrder.findOne({
            where: { work_order_id: id },
            include: [{ model: db.WorkRecord, as: "work_records", attributes: ["work_record_id", "description"] }],
        });

        if (!workOrder) {
            return { EM: "Không tìm thấy đơn công việc", EC: 1, DT: null };
        }
        return { EM: "Lấy chi tiết đơn công việc thành công", EC: 0, DT: workOrder };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy chi tiết đơn công việc", EC: 1, DT: null };
    }
};

const checkWorkOrderExistsApiService = async (description) => {
    try {
        const existingWorkOrder = await db.WorkOrder.findOne({
            where: { description },
            raw: true, nest: true,
        });
        return existingWorkOrder ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi kiểm tra đơn công việc tồn tại");
    }
};

const createWorkOrderApiService = async (data) => {
    try {
        const newWorkOrder = await db.WorkOrder.create(data);
        return { EM: "Thêm đơn công việc thành công", EC: 0, DT: newWorkOrder };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm đơn công việc mới", EC: 1, DT: null };
    }
};

const updateWorkOrderApiService = async (data) => {
    try {
        const workOrder = await db.WorkOrder.findOne({
            where: { work_order_id: data.work_order_id },
        });

        if (!workOrder) {
            return { EM: "Không tìm thấy đơn công việc để cập nhật", EC: 1, DT: null };
        }

        await workOrder.update(data);
        return { EM: "Cập nhật đơn công việc thành công", EC: 0, DT: workOrder };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể cập nhật đơn công việc", EC: 1, DT: null };
    }
};

export default { 
    getAllWorkOrdersApiService, 
    getWorkOrderByIdApiService, 
    createWorkOrderApiService, 
    checkWorkOrderExistsApiService,
    updateWorkOrderApiService 
};