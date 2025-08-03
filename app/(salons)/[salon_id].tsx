// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import React from "react";
import barber from "@/assets/images/salon_icon.png";
import { RatingStars } from "@/components/ratingStars";
import { ReservarBtn } from "@/components/reservarBtn";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { screenDimensions } from "@/constants/screenDimensions";
import salons from "@/data/salons.json";
import { BlurView } from "expo-blur";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  Image,
  Platform,
  Pressable,
  ScrollView,
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
        <BlurView
          intensity={40} // Ajusta el nivel de difuminado: 0 a 100
          tint="light" // Opciones: "light", "dark", "default"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 40,
            right: isDesktop ? null : 20,
            left: isDesktop ? 20 : null,
            backgroundColor: "#F2EADFF8", // semitransparente
            borderRadius: 32,
            paddingHorizontal: 16,
            paddingVertical: 8,
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <Pressable
            onPress={() => router.push("/profile")}
            style={{ marginRight: 8 }}
          >
            <IconSymbol
              name="person.circle.fill"
              size={32}
              color="#011640"
              // style={styles.searchIcon}
            />
          </Pressable>
          <Text style={styles.credit}>37</Text>
          <IconSymbol
            name="currency-lira.fill"
            size={24}
            color="#011640"
            // style={styles.searchIcon}
          />
        </BlurView>

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
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: 0 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Oswaldl",
                    fontSize: 20,
                    marginRight: 4,
                  }}
                >
                  {salonData.calificacion}
                </Text>
                <RatingStars
                  rating={salonData.calificacion}
                  color="#0754FA"
                  size={24}
                />
                <Text style={{ fontFamily: "Oswaldl", fontSize: 16 }}>
                  ({salonData.reviews})
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.nombre}>{salonData.nombre}</Text>
                <Text
                  style={{
                    color: salonData.disponibilidad ? "#1A7A1A" : "#A33",
                    marginLeft: 8,
                    fontFamily: "Oswaldl",
                    fontSize: 20,
                  }}
                >
                  ({salonData.disponibilidad ? "Disponible" : "Cerrado"})
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Oswaldl",
                  fontSize: 16,
                  letterSpacing: 2,
                }}
              >
                <IconSymbol name="location-on.fill" size={24} color="#011640" />
                {salonData.ubicacion}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "Oswaldl",
                  fontSize: 28,
                  letterSpacing: 1,
                }}
              >
                {salonData.descripcion}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginVertical: 16,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Oswald",
                      fontSize: 16,
                      color: "#075473",
                    }}
                  >
                    Lunes - Domingo
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Oswald",
                      fontSize: 20,
                      color: "#075473",
                    }}
                  >
                    {salonData.horario}hrs
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: "Oswald",
                    fontSize: 20,
                    alignSelf: "flex-end",
                  }}
                >
                  <Text style={{ fontFamily: "Oswald", fontSize: 40 }}>
                    {salonData.precio_creditos}
                  </Text>
                  <IconSymbol
                    name="currency-lira.fill"
                    size={40}
                    color="#011640"
                  />
                  /reserva
                </Text>
              </View>
              <View
                style={[
                  {
                    paddingVertical: 16,
                  },
                  isDesktop && {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 56,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Oswald",
                    fontSize: 20,
                    letterSpacing: 2,
                    alignSelf: isDesktop ? "auto" : "flex-start",
                    marginBottom: 8,
                  }}
                >
                  Servicios
                </Text>
                <View>
                  {salonData.servicios.map((servicio) => (
                    <Text key={servicio} style={styles.servicioText}>
                      {servicio}
                    </Text>
                  ))}
                </View>
              </View>

              <View
                style={[
                  styles.duracion,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "baseline",
                  },
                ]}
              >
                <Text
                  style={{ marginRight: 8, fontFamily: "Oswald", fontSize: 20 }}
                >
                  Duración promedio:
                </Text>
                <Text
                  style={{
                    marginRight: 8,
                    fontFamily: "Oswaldl",
                    fontSize: 20,
                  }}
                >
                  {salonData.tiempo_estimado}mins
                </Text>
              </View>

              <View style={[styles.duracion, { flexDirection: "row" }]}>
                <Text
                  style={{ marginRight: 8, fontFamily: "Oswald", fontSize: 20 }}
                >
                  Idiomas:
                </Text>
                {salonData.idiomas.map((idioma, index) => (
                  <Text
                    key={idioma}
                    style={{
                      marginRight: 8,
                      fontFamily: "Oswaldl",
                      fontSize: 20,
                      borderRightWidth:
                        index < salonData.idiomas.length - 1 ? 1 : 0, // solo si NO es el último
                      borderRightColor: "black", // o el color que necesites
                      paddingRight: 8, // para separar visualmente el texto del borde
                    }}
                  >
                    {idioma}
                  </Text>
                ))}
              </View>

              <View
                style={[
                  styles.duracion,
                  { flexDirection: "row", flexWrap: "wrap" },
                ]}
              >
                <Text
                  style={{ marginRight: 8, fontFamily: "Oswald", fontSize: 20 }}
                >
                  Promociones:
                </Text>
                {salonData.promociones.map((promo, index) => (
                  <Text
                    key={promo}
                    style={{
                      marginRight: 8,
                      fontFamily: "Oswaldl",
                      fontSize: 20,
                      borderRightWidth:
                        index < salonData.idiomas.length - 1 ? 1 : 0, // solo si NO es el último
                      borderRightColor: "black", // o el color que necesites
                      paddingRight: 8, // para separar visualmente el texto del borde
                    }}
                  >
                    {promo}
                  </Text>
                ))}
              </View>
              <View
                style={[
                  styles.duracion,
                  { flexDirection: "row", marginBottom: isDesktop ? 16 : 104 },
                ]}
              >
                <Text
                  style={{ marginRight: 8, fontFamily: "Oswald", fontSize: 20 }}
                >
                  Tags:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {salonData.etiquetas.map((tag) => (
                    <View key={tag} style={styles.tagCard}>
                      <IconSymbol name="tag.fill" color="#331" size={12} />
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {isDesktop && (
              <ReservarBtn
                widthBtn={isDesktop ? windowWidth * 0.25 : windowWidth * 0.8}
              />
            )}
          </ScrollView>
        </View>
        {!isDesktop && (
          <View style={{ position: "absolute", bottom: 20 }}>
            <ReservarBtn widthBtn={windowWidth * 0.8} />
          </View>
        )}
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
  scrollContainer: isDesktop
    ? {
        // height: windowHeight * 12,
        backgroundColor: "#F2EADF",
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 32,
      }
    : {
        // height: windowHeight * 12,
        borderRadius: 40,
        backgroundColor: "#F2EADF",
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
  cardContent: isDesktop
    ? {
        height: windowHeight,
        flex: 1,
        justifyContent: "space-between",
      }
    : {
        flex: 1,
        width: windowWidth,
        height: "100%",
        justifyContent: "space-between",
        borderRadius: 40,
      },
  nombre: {
    color: "#012840",
    fontSize: 32,
    fontFamily: "Oswald",
    textShadowColor: "#D95448AA",
    textShadowRadius: 1,
  },

  tagCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AA55",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  tagText: {
    color: "#331",
    fontSize: isDesktop ? 12 : 16,
    textTransform: "lowercase",
    fontFamily: "SpaceMono",
  },
  credit: {
    fontSize: isDesktop ? 24 : 32,
    fontFamily: "GrenzeGotisch",
    color: "#011640",
    paddingBottom: isDesktop ? 0 : 6,
  },
  servicioText: {
    fontFamily: "Oswaldl",
    fontSize: 24,
    letterSpacing: 2,
    padding: 4,
    margin: 2,
    borderRadius: 8,
    backgroundColor: "#E0C8BE",
    width: isDesktop ? windowWidth * 0.25 : windowWidth * 0.92,
    textAlign: "center",
    alignSelf: isDesktop ? "flex-start" : "center",
  },
  duracion: {
    // width: windowWidth * 0.92,
    fontSize: 20,
    fontFamily: "Oswald",
    letterSpacing: 2,
    alignSelf: isDesktop ? "auto" : "flex-start",
    // marginBottom: 8,
    borderTopColor: "#aaa",
    borderBottomColor: "#aaa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    // marginVertical: 16,
  },
});

{
  /* <ThemedView style={styles.container}>
    <ThemedText type="title">Reservas</ThemedText>
  </ThemedView> */
}
