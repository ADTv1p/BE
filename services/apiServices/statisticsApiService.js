import db from "../../models/index.js";
import { fn, col, literal } from "sequelize";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const errorAllTime = async () => {
	const total = await db.WorkRecord.count();

	return { EC: 0, EM: "Thành công", DT: total };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const errorGroupByPosition = async () => {
	const errorData = await db.WorkRecord.findAll({
		attributes: [
			[col("staff->position.code"), "position_code"],
			[col("staff->position.position_id"), "position_id"],
			[fn("COUNT", col("work_record_id")), "total"],
		],
		include: [
			{
				model: db.Staff,
				as: "staff",
				attributes: [],
				include: [
					{
						model: db.Position,
						as: "position",
						attributes: [], // đã select ở trên
					},
				],
			},
		],
		group: ["staff->position.code", "staff->position.position_id"],
	});
	return { EC: 0, EM: "Thành công", DT: errorData };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const errorStaffByPosition = async (positionId) => {
	try {
		const workRecordData = await db.WorkRecord.findAll({
			include: [
				{
					model: db.Staff,
					as: "staff",
					include: [
						{
							model: db.Position,
							where: { position_id: positionId },
							as: "position",
							include: [
								{
									model: db.Process,
									as: "process",
								},
							],
						},
					],
				},
			],
		});

		return { EC: 0, EM: "Thành công", DT: workRecordData };
	} catch (e) {
		console.log("getStaffByPosition error:", e);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const errorData = async () => {
	const errorData = await db.WorkRecord.findAll({
		include: [{ model: db.Staff, as: "staff", attributes: [], include: [{
			model: db.Position, as: "position"
		}] }]
	});

	return { EC: 0, EM: "Thành công", DT: errorData };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatistics = async (period = "day") => {
	let groupBy;
	switch (period) {
		case "day":
			groupBy = literal("DATE(createdAt)");
			break;
		case "week":
			groupBy = literal("YEAR(createdAt), WEEK(createdAt)");
			break;
		case "month":
			groupBy = literal("YEAR(createdAt), MONTH(createdAt)");
			break;
		case "year":
			groupBy = literal("YEAR(createdAt)");
			break;
		default:
			groupBy = literal("DATE(createdAt)");
	}

	const stats = await db.WorkRecord.findAll({
		attributes: [
			[groupBy, "period"],
			[fn("COUNT", col("work_record_id")), "error_count"],
		],
		group: ["period"],
		order: [["period", "ASC"]],
	});

	return { EC: 0, EM: "Thành công", DT: stats };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const processAllTime = async () => {
	const total = await db.Position.count();
	return { EC: 0, EM: "Thành công", DT: total };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { 
	errorAllTime,
	errorGroupByPosition,
	errorStaffByPosition,
    errorData,
    getErrorStatistics,
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	processAllTime,           // Tổng số dữ liệu
    // processGroupByStaff,      // Biểu đồ: Bar - thao tác theo nhân viên
    // processByType,            // Biểu đồ: Pie/Bar - phân loại thao tác (thêm mới, cập nhật)
};
