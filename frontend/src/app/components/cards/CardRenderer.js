// CardRenderer.js
import { CARD_LAYOUT_OPTIONS } from "./cardLayouts";

export function CardRenderer(dish, cardLayout, customStyles = {}) {
  const {
    imageUrl = dish.imageUrl || "/placeholder.jpg",
    name = dish.name,
    price = dish.price,
    cardFontFamily,
    cardStyle,
    cardShadowColor,  
    cardShadowSize,  
    cardBorderColor,
    cardContainerBg,
    titleTextColor,
    titleBgColor,
    titleFontSize,
    priceTextColor,
    priceBgColor,
    priceFontSize,
  } = customStyles;

  // 💡 Función para detectar si es un gradiente
  const isGradient = typeof cardContainerBg === "string" && cardContainerBg.includes("gradient");

  // 🛠 Estilos del contenedor con soporte a gradientes
  const cardStyleInline = {
    ...(isGradient
      ? { background: cardContainerBg }
      : { backgroundColor: cardContainerBg || "#fff" }),
    fontFamily: cardFontFamily || "inherit",
    borderColor: cardBorderColor || "#ccc",
    borderWidth: cardBorderColor ? "1px" : undefined,
    borderStyle: cardBorderColor ? "solid" : undefined,
    boxShadow: cardShadowColor || undefined,
  };

  // 🖍 Estilos de título y precio
  const titleStyle = {
    color: titleTextColor || "#444",
    backgroundColor: titleBgColor || "transparent",
    fontSize: titleFontSize || "1.2rem",
  };

  const priceStyle = {
    color: priceTextColor || "#444",
    backgroundColor: priceBgColor || "transparent",
    fontSize: priceFontSize || "1rem",
  };

  

  // 🧩 Selección del componente visual (layout de tarjeta)
  const SelectedComponent =
    CARD_LAYOUT_OPTIONS.find((opt) => opt.id === cardLayout)?.Component ||
    CARD_LAYOUT_OPTIONS.find((opt) => opt.id === "default").Component;

  // 📦 Render final
  return (
    <SelectedComponent
      dish={{ imageUrl, name, price }}
      fontFamily={cardFontFamily}
      titleStyle={titleStyle}
      priceStyle={priceStyle}
      cardStyleInline={cardStyleInline}
      cardShadowSize={cardShadowSize || "shadow-none"}
    />
  );
}
