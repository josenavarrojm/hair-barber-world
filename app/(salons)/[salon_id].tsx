// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import React from "react";
import barber from "@/assets/images/salon_icon.png";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { screenDimensions } from "@/constants/screenDimensions";
import salons from "@/data/salons.json";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { windowWidth, windowHeight, isDesktop } = screenDimensions;

export default function ReservasScreen() {
  const { salon_id } = useLocalSearchParams();
  const salonData = salons.find((s) => s.id === salon_id);

  // Estado para almacenar dinámicamente la altura que debe tener la imagen del logo
  const [imgHeight, setImgHeight] = useState(0);

  // Hook que se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Si no estamos en la web (es decir, estamos en móvil)
    if (Platform.OS !== "web") {
      // Obtenemos las dimensiones reales de la imagen
      Image.getSize(
        Image.resolveAssetSource(barber).uri, // Obtenemos la URI de la imagen
        (width, height) => {
          const ratio = height / width; // Calculamos la relación de aspecto
          setImgHeight(windowWidth * ratio); // Ajustamos la altura proporcional al ancho de pantalla
        },
        (error) => {
          console.error("Error getting image size:", error); // Manejamos errores de lectura de la imagen
        }
      );
    } else {
      // Si estamos en web, asumimos relación 1:1 como fallback
      const ratio = 1 / 1;
      setImgHeight(windowWidth * ratio);
    }
  }, []);

  if (!salonData) {
    return (
      <>
        <Text>Barbería no encontrada</Text>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          // statusBarStyle: "dark",
          title: salonData.nombre,
          // contentStyle: { backgroundColor: "#fff" },
        }}
      />
      <View style={styles.container}>
        <View style={{ marginBottom: isDesktop ? null : -104 }}>
          <Image
            source={barber}
            style={{
              width: isDesktop ? windowHeight : windowWidth,
              height: isDesktop ? windowHeight : imgHeight,
            }}
            resizeMode="contain" // Para que la imagen no se deforme
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.nombre}>{salonData.nombre}</Text>
          <Pressable onPress={() => null} style={styles.agendarBtn}>
            <Text style={styles.agendarText}>Agendar</Text>
            <IconSymbol color="#F2EADF" name="edit-calendar.fill" size={24} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: isDesktop
    ? {
        height: windowHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F2EADF",
      }
    : {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#F2EADF",
      },
  cardContent: isDesktop
    ? {
        flex: 1,
        height: windowHeight,
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 24,
      }
    : {
        flex: 1,
        width: windowWidth,
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "#F2EADF",
        borderRadius: 40,
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
  nombre: {
    color: "#012840",
    fontSize: 40,
    fontFamily: "Oswald",
    textShadowColor: "#D95448AA",
    textShadowRadius: 1,
  },
  agendarBtn: {
    alignSelf: "center",
    width: isDesktop ? windowWidth * 0.25 : "auto",
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
    fontSize: 32,
    marginRight: 4,
    color: "#F2EADF",
  },
});

{
  /* <ThemedView style={styles.container}>
    <ThemedText type="title">Reservas</ThemedText>
  </ThemedView> */
}
