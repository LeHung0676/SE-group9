const artifactService = require('../services/artifact.service');

class ArtifactController {
    async createArtifact(req, res) {
        try {
            const result = await artifactService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getArtifacts(req, res) {
        try {
            const results = await artifactService.getAll();
            res.status(200).json({ success: true, data: results });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getArtifactById(req, res) {
        try {
            const result = await artifactService.getById(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: "Không tìm thấy hiện vật" });
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateArtifact(req, res) {
        try {
            const result = await artifactService.update(req.params.id, req.body);
            if (!result) return res.status(404).json({ success: false, message: "Không tìm thấy hiện vật" });
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteArtifact(req, res) {
        try {
            const result = await artifactService.delete(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: "Không tìm thấy hiện vật" });
            res.status(200).json({ success: true, message: "Xóa hiện vật thành công" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new ArtifactController();