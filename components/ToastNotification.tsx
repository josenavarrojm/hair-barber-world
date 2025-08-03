import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text } from "react-native";

interface ToastProps {
  text: string;
  color?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  duration?: number; // en ms, opcional
}

export default function ToastNotification({
  text,
  color = "#333",
  icon = "info",
  duration = 3000,
}: ToastProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (Platform.OS === "web") {
      alert(`${text}`);
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);
    });
  }, [duration, fadeAnim, text]);

  if (Platform.OS === "web") return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim, backgroundColor: color },
      ]}
    >
      <MaterialIcons
        name={icon}
        size={20}
        color="#fff"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.toastText}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1000,
    elevation: 10,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
  },
});
