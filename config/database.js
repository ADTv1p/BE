import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2'; // Import mysql2 thay cho require

dotenv.config();  // Load các biến môi trường từ .env

// Tạo kết nối với MySQL (dùng mysql2 driver)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',   // Đảm bảo sử dụng 'mysql' cho MySQL và MariaDB
  dialectModule: mysql2,  // Sử dụng mysql2 như một module ES6
  logging: false,  // Tắt logging nếu không cần
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('❌ Không thể kết nối cơ sở dữ liệu:', error);
    process.exit(1);  // Dừng server nếu không thể kết nối DB
  }
};

export { connectDB };
export default sequelize;
