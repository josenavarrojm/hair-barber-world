import template from "@/assets/images/building.png";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

type Salon = {
  id: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  servicios: string[];
  precio_creditos: number;
  calificacion: number;
  reseñas: number;
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
      <Image
        source={template}
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
        }}
        resizeMode="contain" // Para que la imagen no se deforme
      />
      <View>
        <Text style={styles.nombre}>{salon.nombre}</Text>
        <Text style={styles.descripcion}>{salon.descripcion}</Text>
        <Text style={styles.descripcion}>
          $<Text style={styles.descripcion}>{salon.precio_creditos}</Text>
          /reserva
        </Text>
        <Text style={styles.descripcion}>{salon.ubicacion}</Text>
        <Text style={styles.descripcion}>Servicios</Text>
        {salon.servicios.map((servicio) => (
          <Text key={servicio} style={styles.descripcion}>
            {servicio}
          </Text>
        ))}
        <IconSymbol color="#075473" name="book.fill" size={24} />
        <Link href={`/${salon.id}`}>
          <Text style={styles.descripcion}>Ver Detalles</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "#EEE3CA",
    marginBottom: 16,
    borderRadius: 24,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 4,
  },
});
