const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server'); // Thư viện database ảo
const artifactRoutes = require('./routers/artifact.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const adminRoutes = require('./routers/admin.routes');
app.use('/api/admin', adminRoutes);
// Middleware cơ bản


// Đăng ký Route CRUD hiện vật
app.use('/api/artifacts', artifactRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {``
    res.json({ message: "Backend Thuyết minh tự động - ĐH Sài Gòn đang chạy!" });
});

// Hàm khởi động Server kết hợp Database ảo
async function startServer() {
    try {
        // Tự động bật 1 MongoDB ảo chạy ngầm trong RAM
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.connect(mongoUri);
        console.log('Đã kết nối MongoDB In-Memory thành công!');

        // Khởi động server sau khi kết nối DB thành công
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại cổng http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Lỗi khởi động server:', error);
    }
}

startServer();