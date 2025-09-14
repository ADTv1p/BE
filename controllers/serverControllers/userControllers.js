import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from '../../services/serverServices/userService.js';

// Render trang đăng ký
const userRenderRegister = (req, res) => {
    res.render('pages/register', { title: 'Đăng ký tài khoản' });
};

// Xử lý đăng ký người dùng
const userHandleRegister = async (req, res) => {
    try {
        const { name, password, phone, email, date_of_birth } = req.body;
        console.log(req.body);
        const dt = await userService.createUser(name, password, phone, email, date_of_birth);
        if (dt.EC !== 0) {
          return res.status(400).json({ error: dt.EM });
        } else {
            return res.status(201).json({ message: 'User registered successfully', user: dt.DT });
        }
    } catch (error) {
        console.error(error);
    }
};

// Xử lý đăng nhập
const userHandleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.findUserByUsername(username);
        if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const userGetAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ title: 'Danh sách tài khoản', users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi lấy danh sách tài khoản');
    }
};

export default {
  userRenderRegister,
  userHandleRegister,
  userHandleLogin,
  userGetAll
};