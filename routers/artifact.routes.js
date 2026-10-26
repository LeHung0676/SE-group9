const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifact.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, artifactController.createArtifact); // Phải có token mới thêm được
router.delete('/:id', verifyToken, artifactController.deleteArtifact); // Phải có token mới xóa được
router.post('/', artifactController.createArtifact);         // Thêm mới
router.get('/', artifactController.getArtifacts);           // Lấy tất cả
router.get('/:id', artifactController.getArtifactById);     // Lấy chi tiết theo ID
router.put('/:id', artifactController.updateArtifact);      // Cập nhật
router.delete('/:id', artifactController.deleteArtifact);   // Xóa

module.exports = router;