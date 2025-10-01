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
const errorStatisticsByTime = async (period = "day") => {
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
const getErrorStatisticsByDay = async () => {
	try {
		const data = await db.WorkRecord.findAll({
			attributes: [
				[fn("DATE", col("WorkRecord.createdAt")), "day"],
				[fn("COUNT", col("WorkRecord.work_record_id")), "error_count"],
			],
			include: [
				{
					model: db.Error,
					as: "error",
					attributes: ["error_id", "name", "description"]
				}
			],
			group: [fn("DATE", col("WorkRecord.createdAt"))]
		});

		return { EC: 0, EM: "Thành công", DT: data.map(d => d.toJSON()) };
	} catch (err) {
		console.error("Lỗi thống kê theo ngày:", err);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsByWeek = async () => {
	try {
		const data = await db.WorkRecord.findAll({
			attributes: [
				[fn("YEAR", col("WorkRecord.createdAt")), "year"],
				[fn("WEEK", col("WorkRecord.createdAt")), "week"],
				[fn("COUNT", col("WorkRecord.work_record_id")), "error_count"]
			],
			include: [
				{
					model: db.Error,
					as: "error",
					attributes: ["error_id", "name", "description"]
				}
			],
			group: [
				fn("YEAR", col("WorkRecord.createdAt")),
				fn("WEEK", col("WorkRecord.createdAt"))
			]
		});

		return { EC: 0, EM: "Thành công", DT: data.map(d => d.toJSON()) };
	} catch (err) {
		console.error("Lỗi thống kê theo tuần:", err);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsByMonth = async () => {
	try {
		const data = await db.WorkRecord.findAll({
			attributes: [
				[fn("YEAR", col("WorkRecord.createdAt")), "year"],
				[fn("MONTH", col("WorkRecord.createdAt")), "month"],
				[fn("COUNT", col("WorkRecord.work_record_id")), "error_count"]
			],
			include: [
				{
					model: db.Error,
					as: "error",
					attributes: ["error_id", "name", "description"]
				}
			],
			group: [
				fn("YEAR", col("WorkRecord.createdAt")),
				fn("MONTH", col("WorkRecord.createdAt"))
			]
		});

		return { EC: 0, EM: "Thành công", DT: data.map(d => d.toJSON()) };
	} catch (err) {
		console.error("Lỗi thống kê theo tháng:", err);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsByStaffWithPercent = async () => {
	try {
		const allStaff = await db.Staff.findAll({
			attributes: ["staff_id", "full_name", "email", "phone"],
			include: [
				{
					model: db.Position,
					as: "position",
					attributes: ["position_id", "code", "role"],
					include: [
						{
							model: db.Process,
							as: "process",
							attributes: ["process_id", "name"]
						}
					]
				}
			]
		});

		const errors = await db.WorkRecord.findAll({
			attributes: ["staff_id", [fn("COUNT", col("work_record_id")), "error_count"]],
			group: ["staff_id"],
			raw: true
		});

		const totalErrors = errors.reduce((sum, e) => sum + parseInt(e.error_count), 0);

		const staffStats = allStaff.map(staff => {
			const staffError = errors.find(e => e.staff_id === staff.staff_id);
			const error_count = staffError ? parseInt(staffError.error_count) : 0;
			const percent = totalErrors > 0 ? +(error_count / totalErrors * 100).toFixed(2) : 0;
			return {
				...staff.toJSON(),
				error_count,
				error_percent: percent
			};
		});

		return { EC: 0, EM: "Thành công", DT: staffStats };
	} catch (err) {
		console.error("Lỗi thống kê tỷ lệ lỗi theo nhân sự:", err);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getTop5Errors = async () => {
	try {
		const data = await db.WorkRecord.findAll({
			attributes: [
				"error_id",
				[fn("COUNT", col("WorkRecord.work_record_id")), "error_count"]
			],
			include: [
				{
					model: db.Error,
					as: "error",
					attributes: ["error_id", "name", "description"]
				}
			],
			group: ["error_id", "error.error_id"],
			order: [[literal("error_count"), "DESC"]],
			limit: 5,
		});

		return { EC: 0, EM: "Thành công", DT: data };
	} catch (err) {
		console.error("Lỗi thống kê top 5:", err);
		return { EC: 1, EM: "Lỗi server", DT: [] };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const processByType = async (period = "day") => {
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

	const stats = await db.Process.findAll({
		attributes: [
			[groupBy, "period"],
			[fn("SUM", literal("CASE WHEN createdAt IS NOT NULL THEN 1 ELSE 0 END")), "created_count"],
			[fn("SUM", literal("CASE WHEN updatedAt IS NOT NULL THEN 1 ELSE 0 END")), "updated_count"],
		],
		group: ["period"],
		order: [[literal("period"), "ASC"]],
	});

	return { EC: 0, EM: "Thành công", DT: stats };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const processAllTime = async () => {
	const total = await db.Position.count();
	return { EC: 0, EM: "Thành công", DT: total };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const processesWithStaff = async () => {
	const processes = await db.Process.findAll({
		attributes: ["process_id", "name"],
		include: [
			{
				model: db.Position,
				as: "positions",
				include: [
					{
						model: db.Staff,
						as: "staffs",
						attributes: ["staff_id"]
					}
				]
			}
		]
	});

	const result = processes.map(p => ({
		process_id: p.process_id,
		name: p.name,
		value: (p.positions || []).flatMap(pos => pos.staffs || []).length
	}));

	return { EC: 0, EM: "Thành công", DT: result };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const processData = async (process_id) => {
	let processes = await db.Process.findAll({
		where: { process_id },
		include: [{
			model: db.Position, as: "positions",
			include: [{
				model: db.Staff, as: "staffs"
			}]
		}]
	});

	return { EC: 0, EM: "Thành công", DT: processes };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const exportProcessData = async () => {
	const processes = await db.Process.findAll({
		include: [{
			model: db.Position, as: "positions",
			include: [{
				model: db.Staff, as: "staffs"
			}]
		}]
	});

	return { EC: 0, EM: "Thành công", DT: processes };
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { 
	errorAllTime,
	errorGroupByPosition,
	errorStaffByPosition,
    errorData,
    errorStatisticsByTime,
	getErrorStatisticsByDay,
	getErrorStatisticsByWeek,
	getErrorStatisticsByMonth,
	getErrorStatisticsByStaffWithPercent,
	getTop5Errors,
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	processAllTime,           // Tổng số dữ liệu
    processesWithStaff,      // Biểu đồ: Bar - thao tác theo nhân viên
    processByType,            // Biểu đồ: Bar - phân loại thao tác (thêm mới, cập nhật)
	processData,
	exportProcessData
};
