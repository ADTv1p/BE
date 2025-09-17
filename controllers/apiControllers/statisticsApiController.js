import statisticsApiService from '../../services/apiServices/statisticsApiService.js';

const getErrorStatisticsByTimeApiController = async (req, res) => {
	const period = req.query.period || "day"; // day | week | month | year
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
const getErrorTrendDataApiController = async (req, res) => {
	const period = req.query.period || "day"; 
	try {
		const result = await statisticsApiService.getErrorDetailsByTime(period);
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
const getErrorStatisticsByTimeApiController3 = async (req, res) => {
	const period = req.query.period || "day"; 
	try {
		const result = await statisticsApiService.getErrorTrendData(period);
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
export default {
    getErrorStatisticsByTimeApiController,
    getErrorTrendDataApiController,
    getErrorStatisticsByTimeApiController3,
	// getErrorTypePercentageDataApiController,
	// getErrorCountByPeriodApiController,
	// getMostCommonErrorByTypeApiController,
	// getTopErrorReporterAndReceiverApiController
}