const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "Không tìm thấy Token xác thực!" });

    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'sgu_secret_key');
        req.admin = verified;
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};

module.exports = verifyToken;