import userApiService from '../../services/apiServices/userApiService.js';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleRegisterUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await userApiService.registerUser(data);
        if (result) {
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
const handleLoginUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await userApiService.loginUser(data);
        if (result) {
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
        const staffStats = await userApiService.getErrorStatisticsByStaffWithPercent();
        const top5Errors = await userApiService.getTop5Errors();
        const errorsByDay = await userApiService.getErrorStatisticsByDay();
        const errorsByWeek = await userApiService.getErrorStatisticsByWeek();
        const errorsByMonth = await userApiService.getErrorStatisticsByMonth();

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
export default {
    handleRegisterUser,
    handleLoginUser,
    handleExportErrorData,
}