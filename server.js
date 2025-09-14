import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/router.js";
import api from "./routes/api.js";
import expressLayouts from "express-ejs-layouts";
import { connectDB } from "./config/database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối cơ sở dữ liệu
try {
  await connectDB();
} catch (error) {
  console.error("❌ Không thể kết nối cơ sở dữ liệu:", error);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình EJS và layouts
app.use(expressLayouts);
app.set("layout", "layout/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", router);
app.use("/api/", api);

// Xử lý route không tồn tại
app.use((req, res, next) => {
  res.status(404).send("❌ Route không tồn tại!");
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});