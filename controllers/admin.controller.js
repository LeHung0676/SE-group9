const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminController {
    // Đăng ký tài khoản Admin (dùng để tạo tài khoản mẫu ban đầu)
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdmin = await Admin.create({ username, password: hashedPassword });
            res.status(201).json({ success: true, message: "Tạo tài khoản admin thành công!", data: newAdmin });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Đăng nhập Admin trả về JWT Token
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) return res.status(404).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });

            // Tạo Token có hiệu lực trong 1 ngày
            const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET || 'sgu_secret_key', { expiresIn: '1d' });

            res.status(200).json({ success: true, message: "Đăng nhập thành công!", token });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new AdminController();