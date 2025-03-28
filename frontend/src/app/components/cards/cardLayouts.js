// src/constants/cardLayouts.js
import CardMinimal1 from "./CardMinimal1";
import CardMinimal2 from "./CardMinimal2";
import CardMinimal4 from "./CardMinimal4";
import CardMinimal5 from "./CardMinimal5";
import CardMinimal6 from "./CardMinimal6";


import CardRoundedImage from "./CardRoundedImage";
import CardColorfull1 from "./CardColorfull1";
import CardImgTextP from "./CardImgTextP";
import CardOnlyText from "./CardOnlyText";
import CardMitadMitad from "./CardMitadMitad";
import CardDefault from "./CardDefault";

export const CARD_LAYOUT_OPTIONS = [
  { id: "minimal1", name: "Minimal 1", Component: CardMinimal1 },
  { id: "minimal2", name: "Minimal 2", Component: CardMinimal2 },
  { id: "minimal4", name: "Minimal 4", Component: CardMinimal4 },
  { id: "minimal5", name: "Redonda", Component: CardMinimal5 },
  { id: "minimal6", name: "Overlay fondo", Component: CardMinimal6 },


  { id: "roundedImage", name: "Redonda clásica", Component: CardRoundedImage },
  { id: "colorfull1", name: "Colorido", Component: CardColorfull1 },
  { id: "imgtextp", name: "Texto simple", Component: CardImgTextP },
  { id: "onlytext", name: "Solo texto", Component: CardOnlyText },
  { id: "mitadmitad", name: "Mitad Mitad", Component: CardMitadMitad },
  { id: "default", name: "Clásico", Component: CardDefault },
];
