import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import expressLayouts from 'express-ejs-layouts';
import { connectDB } from './config/database.js';

dotenv.config();

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev', {
	skip: (req, res) => res.statusCode < 400
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set('layout', 'layout/main');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

// app.use('/', aboutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});