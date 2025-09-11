// routes/index.js
import express from 'express';
// import { renderHome } from '../controllers/pageController.js';
import userControllers from '../controllers/usercontrollers.js';

const router = express.Router();

// Trang chủ
// router.get('/home', renderHome);

// Trang giới thiệu
router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'Giới thiệu về dự án' });
});

// Trang đăng ký
router.get('/register', userControllers.userRenderRegister);
router.post('/register', userControllers.userHandleRegister);

// Trang testView: danh sách tài khoản
router.get('/test-view', userControllers.userGetAll);

export default router;
