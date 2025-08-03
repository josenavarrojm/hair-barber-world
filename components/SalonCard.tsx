import template from "@/assets/images/building.png";
import { screenDimensions } from "@/constants/screenDimensions";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RatingStars } from "./ratingStars";
import { ReservarBtn } from "./reservarBtn";
import { IconSymbol } from "./ui/IconSymbol";

const { windowWidth, isDesktop } = screenDimensions;

type Salon = {
  id: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  servicios: string[];
  precio_creditos: number;
  calificacion: number;
  reviews: number;
  horario: string;
  disponibilidad: boolean;
  idiomas: string[];
  promociones: string[];
  tiempo_estimado: number;
  etiquetas: string[];
};

interface Props {
  salon: Salon;
}

export default function SalonCard({ salon }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.nombre}>{salon.nombre}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ fontFamily: "Oswaldl", fontSize: 16 }}>
            {salon.calificacion}
          </Text>
          <RatingStars rating={salon.calificacion} color="#075473" />
        </View>
      </View>
      <View style={styles.midRow}>
        <Pressable onPress={() => router.push(`/${salon.id}`)}>
          <View style={styles.imgBlock}>
            <Image
              source={template}
              style={{
                width: isDesktop ? windowWidth * 0.12 : windowWidth * 0.24,
                height: isDesktop ? windowWidth * 0.12 : windowWidth * 0.24,
                borderRadius: 24,
                // marginBottom: 16,
              }}
              resizeMode="contain" // Para que la imagen no se deforme
            />
            <Text
              style={{ fontFamily: "Oswald", fontSize: 16, color: "#344973" }}
            >
              Ver Detalles
            </Text>
          </View>
        </Pressable>
        <View style={styles.info}>
          <Text style={styles.descripcion}>{salon.descripcion}</Text>
          <Text style={{ fontFamily: "Oswald", fontSize: 20 }}>
            <Text style={{ fontFamily: "Oswald", fontSize: 32 }}>
              {salon.precio_creditos}
            </Text>
            <IconSymbol name="currency-lira.fill" size={24} color="#011640" />
            /reserva
          </Text>
          <View style={{}}>
            <Text style={{ fontFamily: "Oswaldl", color: "#01164088" }}>
              Servicios
            </Text>
            <View style={styles.servicios}>
              {salon.servicios.map((servicio) => (
                <Text key={servicio} style={styles.serviciosFont}>
                  {servicio}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text
          style={{
            fontFamily: "Oswald",
          }}
        >
          <IconSymbol name="location-on.fill" size={24} color="#011640" />
          {salon.ubicacion}
        </Text>
        <ReservarBtn
          fontSized={20}
          widthBtn={isDesktop ? windowWidth * 0.16 : "auto"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "flex-start",
    padding: 8,
    borderBottomColor: "#011640AA",
    borderBottomWidth: 1 / 2,
    marginBottom: 16,
  },
  topRow: {
    textAlign: "left",
    paddingLeft: 16,
    borderRadius: 24,
    marginBottom: isDesktop ? null : -16,
  },
  midRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  imgBlock: isDesktop
    ? {
        flex: 1,
        height: 250,
        alignItems: "center",
        justifyContent: "space-around",
        width: windowWidth * 0.2,
        marginRight: 16,
        borderRadius: 24,
      }
    : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth * 0.25,
        borderRadius: 24,
      },
  info: isDesktop
    ? {
        height: 150,
        width: windowWidth * 0.35,
        borderRadius: 24,
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingHorizontal: 16,
        paddingVertical: 8,
      }
    : {
        height: 190,
        width: windowWidth * 0.6,
        borderRadius: 24,
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingHorizontal: 8,
        paddingVertical: 8,
      },
  nombre: {
    fontSize: 24,
    fontFamily: "Oswald",
  },
  descripcion: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "Oswaldl",
    letterSpacing: 1,
  },
  servicios: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  serviciosFont: {
    fontSize: 14,
    borderRightColor: "#aaa",
    borderRightWidth: 1 / 2,
    fontFamily: "Oswaldl",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  agendarBtn: {
    flexDirection: "row",
    alignItems: "flex-end",
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
    fontSize: 20,
    marginRight: 4,
    color: "#F2EADF",
  },
});
