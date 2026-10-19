const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Mật khẩu (sẽ được mã hóa)
    role: { type: String, default: 'admin' }     // Phân quyền
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);