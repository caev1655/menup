// category.controller.js
const Category = require("../models/category.model");
const Dish = require("../models/dish.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, menuId, templateId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name es requerido" });
    }

    // Paso 1: crear sin styles
    const category = await Category.create({
      name,
      menuId,
      templateId: templateId || null,
    });

    // Paso 2: forzar styles con update
    await Category.updateOne({ _id: category._id }, { $set: { styles: {} } });

    // Paso 3: responder ya con styles agregado
    res.status(201).json({ ...category.toObject(), styles: {} });

  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const { menuId } = req.query; // /api/categories?menuId=...
    const categories = await Category.find({ menuId }).populate("templateId"); // Recibimos layout, textColor, etc.
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, templateId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    if (name) category.name = name;
    if (templateId !== undefined) category.templateId = templateId;

    await category.save();

    res.json(category);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// PATCH /api/categories/update-style
exports.updateCategoryStyle = async (req, res) => {
  try {
    const { styles } = req.body;
    const { categoryId } = req.params;

    if (!categoryId || !styles) {
      return res.status(400).json({ message: "categoryId y styles son requeridos." });
    }

    // 🎯 Aquí hacemos merge en lugar de reemplazar todo el objeto styles
    const updated = await Category.findByIdAndUpdate(
      categoryId,
      Object.keys(styles).reduce((acc, key) => {
        acc[`styles.${key}`] = styles[key];
        return acc;
      }, {}),
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error al actualizar estilos de categoría:", error);
    res.status(500).json({ message: "Error al actualizar los estilos de la categoría." });
  }
};




exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Paso 1: Eliminar platillos asociados
    await Dish.deleteMany({ category: categoryId });

    // Paso 2: Eliminar la categoría
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría y platillos eliminados correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar categoría:", error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
};
