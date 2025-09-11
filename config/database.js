import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

// Tạo kết nối MySQL không mật khẩu
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	dialectModule: mysql2,
	logging: false,
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('✅ Kết nối cơ sở dữ liệu thành công!');
	} catch (error) {
		console.error('❌ Không thể kết nối cơ sở dữ liệu:', error);
		process.exit(1);
	}
};

export { connectDB };
export default sequelize;
