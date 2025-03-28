const express = require("express");
const router = express.Router();
const templateController = require("../controllers/template.controller");
// Si quieres proteger estas rutas, import { protect } from ...
// router.use(protect);

router.post("/", templateController.createTemplate);
router.get("/", templateController.getAllTemplates);
router.get("/:templateId", templateController.getTemplateById);
router.put("/:templateId", templateController.updateTemplate);
router.delete("/:templateId", templateController.deleteTemplate);

module.exports = router;
