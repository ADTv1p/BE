import statisticsApiService from '../../services/apiServices/statisticsApiService.js';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsAllTime = async (req, res) => {
	try {
		const result = await statisticsApiService.errorAllTime();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsByPosition = async (req, res) => {
	try {
		const result = await statisticsApiService.errorGroupByPosition();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStaffByPosition = async (req, res) => {
	try {
		const {positionId} = req.query;
		const result = await statisticsApiService.errorStaffByPosition(positionId);
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStatisticsByTime = async (req, res) => {
	const { period } = req.query || "day"; // day | week | month | year
	try {
		const result = await statisticsApiService.errorStatisticsByTime(period);
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorData = async (req, res) => {
	try {
		const result = await statisticsApiService.errorData();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleExportErrorData = async (req, res) => {
	try {
		const staffStats = await statisticsApiService.getErrorStatisticsByStaffWithPercent();
		const top5Errors = await statisticsApiService.getTop5Errors();
		const errorsByDay = await statisticsApiService.getErrorStatisticsByDay();
		const errorsByWeek = await statisticsApiService.getErrorStatisticsByWeek();
		const errorsByMonth = await statisticsApiService.getErrorStatisticsByMonth();

		if (
			staffStats.EC === 0 &&
			top5Errors.EC === 0 &&
			errorsByDay.EC === 0 &&
			errorsByWeek.EC === 0 &&
			errorsByMonth.EC === 0
		) {
			return res.status(200).json({
				EC: 0,
				EM: "Thành công",
				DT: {
					staffStatistics: staffStats.DT,
					top5Errors: top5Errors.DT,
					errorsByDay: errorsByDay.DT,
					errorsByWeek: errorsByWeek.DT,
					errorsByMonth: errorsByMonth.DT
				}
			});
		} else {
			return res.status(400).json({
				EC: 1,
				EM: "Có lỗi xảy ra",
				DT: {}
			});
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessStatisticsAllTime = async (req, res) => {
	try {
		const result = await statisticsApiService.processAllTime();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessByType = async (req, res) => {
	const { period } = req.query || "day"; // day | week | month | year
	try {
		const result = await statisticsApiService.processByType(period);
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessesWithStaff = async (req, res) => {
	try {
		const result = await statisticsApiService.processesWithStaff();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessesData = async (req, res) => {
	try {
		const { process_id } = req.query || "1"; // day | week | month | year
		const result = await statisticsApiService.processData(process_id);
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleExportProcessData = async (req, res) => {
	try {
		const result = await statisticsApiService.exportProcessData();
		if (result.EC === 0) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json(result);
		}
	} catch (error) {
		console.error("Lỗi thống kê lỗi:", error);
		return res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
	}
};
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default {
    getErrorStatisticsAllTime,
	getErrorStatisticsByPosition,
	getErrorStaffByPosition,
    getErrorStatisticsByTime,
    getErrorData,
	handleExportErrorData,
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	getProcessStatisticsAllTime,
	getProcessesWithStaff,
	getProcessByType,
	getProcessesData,
	handleExportProcessData,
}