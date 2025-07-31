import { useWindowDimensions } from "react-native";

export function useCheckWindowDimension() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 720;
  return isDesktop;
}
