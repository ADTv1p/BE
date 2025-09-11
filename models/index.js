import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// Đọc config từ file config.json
const configPath = path.join(__dirname, "../config/config.json");
const configFile = JSON.parse(fs.readFileSync(configPath, "utf8"));
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lấy danh sách file model
const modelFiles = fs
	.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
	);

// Import model
for (const file of modelFiles) {
	const filePath = path.join(__dirname, file);
	const module = await import(pathToFileURL(filePath));
	const model = module.default(sequelize, DataTypes);
	db[model.name] = model;
}

// Thiết lập quan hệ nếu có
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
