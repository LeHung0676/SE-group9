const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Tên hiện vật / Địa điểm
    code: { type: String, required: true, unique: true }, // Mã định danh dùng để sinh QR
    description: { type: String },               // Nội dung thuyết minh gốc
    location: { type: String },                  // Vị trí trong trường (VD: Phòng truyền thống, Thư viện...)
    audioUrl: { type: String },                  // Đường dẫn cache audio TTS
    qrCodeUrl: { type: String }                  // Đường dẫn ảnh QR
}, { timestamps: true });

module.exports = mongoose.model('Artifact', artifactSchema);
