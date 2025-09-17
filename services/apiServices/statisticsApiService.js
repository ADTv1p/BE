import db from "../../models/index.js";
import { fn, col, literal } from "sequelize";

const getErrorTrendData = async (period = "day") => {
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

	const trendData = await db.WorkRecord.findAll({
        attributes: [
            [groupBy, "period"],
            [fn("COUNT", col("work_record_id")), "error_count"],
        ],
        group: ["period"],
        order: [["period", "ASC"]],
        raw: true,
    });

    // Ép labels thành string để FE dùng
    const labels = trendData.map(item => item.period.toString());
    const data = trendData.map(item => item.error_count);

	return { EC: 0, EM: "Thành công", DT: { labels, data } };
};

const getErrorDetailsByTime = async (period = "day") => {
	let dateCondition;
	switch (period) {
		case "day":
			dateCondition = literal("DATE(work_records.createdAt)");
			break;
		case "week":
			dateCondition = literal("YEAR(work_records.createdAt), WEEK(work_records.createdAt)");
			break;
		case "month":
			dateCondition = literal("YEAR(work_records.createdAt), MONTH(work_records.createdAt)");
			break;
		case "year":
			dateCondition = literal("YEAR(work_records.createdAt)");
			break;
		default:
			dateCondition = literal("DATE(work_records.createdAt)");
	}

	const stats = await db.WorkRecord.findAll({
        attributes: [
            [literal("DATE(WorkRecord.createdAt)"), "period"],
            "work_record_id",
            "note",
            "createdAt", // tự Sequelize map WorkRecord
        ],
        include: [
            { model: db.Error, as: "error" },
            { model: db.Staff, as: "staff" },
            { model: db.WorkOrder, as: "work_order" },
        ],
        order: [["createdAt", "ASC"]],
        raw: false,
    });

	return { EC: 0, EM: "Thành công", DT: stats };
};

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
			[fn("COUNT", col("work_records_id")), "error_count"],
		],
		group: ["period"],
		order: [["period", "ASC"]],
		raw: true,
	});

	return { EC: 0, EM: "Thành công", DT: stats };
};

export default { 
    getErrorTrendData,
    getErrorDetailsByTime,
    getErrorStatistics 

	// getErrorTypePercentageData,
	// getErrorCountByPeriod,
	// getMostCommonErrorByType,
	// getTopErrorReporterAndReceiver
};
