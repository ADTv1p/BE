import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

// Tự động load tất cả các models trong thư mục models
const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js" && file.endsWith(".js"));
for (const file of files) {
  const filePath = pathToFileURL(path.join(__dirname, file)).href;
  const { default: modelFunc } = await import(filePath);

  if (typeof modelFunc === "function") {
    const model = modelFunc(sequelize);
    models[model.name] = model;
  } else {
    console.error(`❌ Không thể load model từ file: ${file}`);
  }
}

// Thiết lập quan hệ giữa các models
for (const modelName of Object.keys(models)) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
}

export { sequelize };
export default models;
