import db from '../../models/index.js';
import { Op } from 'sequelize';

const getAllAccessoriesApiService = async () => {
    try {
        const accessories = await db.Accessory.findAll({
            order: [['updatedAt', 'DESC']], // hoặc 'ASC' nếu muốn tăng dần
            raw: true, nest: true,
        });
        return { EM: "Lấy danh sách phụ kiện thành công", EC: 0, DT: accessories };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách phụ kiện", EC: 1, DT: null };
    }
};

const getSupportAccessoriesApiService = async () => {
    try {
        const accessories = await db.Accessory.findAll({
            attributes: ['accessory_id', 'name', 'type'], 
            order: [['updatedAt', 'DESC']],
            raw: true, nest: true,
        });
        return { EM: "Lấy danh sách phụ kiện hỗ trợ thành công", EC: 0, DT: accessories };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể lấy danh sách phụ kiện hỗ trợ", EC: 1, DT: null };
    }
};

const checkAccessoryExistsApiService = async ({name, accessoryId = null}) => {
	try {
        console.log(name, accessoryId)
		const whereCondition = accessoryId
			? {
					name,
					accessory_id: { [Op.ne]: accessoryId },
			  }
			: { name };

		const existingAccessory = await db.Accessory.findOne({
			where: whereCondition,
			raw: true,
			nest: true,
		});

		return !!existingAccessory;
	} catch (error) {
		console.error(error);
		throw new Error("Lỗi khi kiểm tra phụ kiện tồn tại");
	}
};

const createAccessoryApiService = async (data) => {
    try {
        const newAccessory = await db.Accessory.create(data);
        return { EM: "Thêm phụ kiện thành công", EC: 0, DT: newAccessory };
    } catch (error) {
        console.error(error);
        return { EM: "Không thể thêm phụ kiện mới", EC: 1, DT: null };
    }
};

const updateAccessoryApiService = async (data) => {
	try {
		const [updatedCount] = await db.Accessory.update(
            {
                name: data.name,
                type: data.type,
            },
            {
                where: { accessory_id: data.accessory_id },
            }
        );
        
        if (updatedCount === 0) {
            return { EM: "Phụ kiện không tồn tại hoặc không thay đổi", EC: 1, DT: null };
        }

        const updatedAccessory = await db.Accessory.findByPk(data.accessory_id);
        return { EM: "Cập nhật phụ kiện thành công", EC: 0, DT: updatedAccessory };
	} catch (error) {
		console.error(error);
		return { EM: "Không thể cập nhật phụ kiện", EC: 1, DT: null };
	}
};


export default { 
    getAllAccessoriesApiService, 
    getSupportAccessoriesApiService, 
    createAccessoryApiService, 
    updateAccessoryApiService, 
    checkAccessoryExistsApiService 
};
