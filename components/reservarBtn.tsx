import React from "react";
import { DimensionValue, Pressable, StyleSheet, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface reservarBtnProps {
  fontSized?: number;
  widthBtn: DimensionValue | undefined;
  onPress: () => void;
}

export const ReservarBtn: React.FC<reservarBtnProps> = ({
  fontSized = 32,
  widthBtn,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.agendarBtn, { width: widthBtn }]}
    >
      <Text style={[styles.agendarText, { fontSize: fontSized }]}>
        Reservar
      </Text>
      <IconSymbol color="#F2EADF" name="edit-calendar.fill" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  agendarBtn: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D95448",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#A33",
  },
  agendarText: {
    fontFamily: "Oswald",
    marginRight: 4,
    color: "#F2EADF",
  },
});
