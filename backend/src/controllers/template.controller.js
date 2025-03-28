// controllers/template.controller.js
const Template = require("../models/template.model");

// Crear template
exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    console.error("Error al crear template:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Listar todos
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    console.error("Error al obtener templates:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener uno por ID
exports.getTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.json(template);
  } catch (error) {
    console.error("Error al obtener template:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar
exports.updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const updated = await Template.findByIdAndUpdate(templateId, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar template:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar
exports.deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const deleted = await Template.findByIdAndDelete(templateId);
    if (!deleted) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.json({ message: "Plantilla eliminada" });
  } catch (error) {
    console.error("Error al eliminar template:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
