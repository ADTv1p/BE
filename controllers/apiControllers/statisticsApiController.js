import statisticsApiService from '../../services/apiServices/statisticsApiService.js';

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
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

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
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

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
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

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
const getErrorStatisticsByTime = async (req, res) => {
	const { period } = req.query || "day"; // day | week | month | year
	try {
		const result = await statisticsApiService.getErrorStatistics(period);
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

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
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

// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *


// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
export default {
    getErrorStatisticsAllTime,
	getErrorStatisticsByPosition,
	getErrorStaffByPosition,
    getErrorStatisticsByTime,
    getErrorData,
}