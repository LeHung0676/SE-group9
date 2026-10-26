const Artifact = require('../models/artifact.model');
const QRCode = require('qrcode'); // Thư viện sinh mã QR vừa cài

class ArtifactService {
    // Thêm hiện vật mới + Tự động sinh mã QR
    async create(data) {
        // Tạo chuỗi thông tin nhúng vào mã QR dựa trên mã code và tên hiện vật
        const qrDataText = `Artifact Code: ${data.code} - Name: ${data.name}`;
        
        // Tự động sinh mã QR dưới dạng chuỗi ảnh Base64
        const qrCodeImageBase64 = await QRCode.toDataURL(qrDataText);
        
        // Gán ảnh QR vào dữ liệu trước khi lưu vào database
        data.qrCodeUrl = qrCodeImageBase64;

        return await Artifact.create(data);
    }

    // Lấy danh sách tất cả hiện vật
    async getAll() {
        return await Artifact.find();
    }

    // Lấy chi tiết 1 hiện vật theo ID
    async getById(id) {
        return await Artifact.findById(id);
    }

    // Cập nhật thông tin hiện vật
    async update(id, data) {
        return await Artifact.findByIdAndUpdate(id, data, { new: true });
    }

    // Xóa hiện vật
    async delete(id) {
        return await Artifact.findByIdAndDelete(id);
    }
}

module.exports = new ArtifactService();