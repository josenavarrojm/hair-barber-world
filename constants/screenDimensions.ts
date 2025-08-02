import { Dimensions } from "react-native";

// Se obtiene el ancho actual de la pantalla
const windowWidth = Dimensions.get("window").width;

// Se obtiene el height actual de la pantalla
const windowHeight = Dimensions.get("window").height;

// Se determina si el dispositivo es una pantalla grande (por ejemplo, escritorio)
const isDesktop = windowWidth > 720;

export const screenDimensions = { windowWidth, windowHeight, isDesktop };
