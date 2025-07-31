import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.nombre}>{salon.nombre}</Text>
      <Text style={styles.descripcion}>{salon.descripcion}</Text>
      <Text style={styles.ubicacion}>📍 {salon.ubicacion}</Text>
      <Text style={styles.servicios}>
        🧰 Servicios: {salon.servicios.join(", ")}
      </Text>
      <Text style={styles.creditos}>
        💳 Precio: {salon.precio_creditos} créditos
      </Text>
      <Text style={styles.calificacion}>
        ⭐ {salon.calificacion} ({salon.reseñas} reseñas)
      </Text>
      <Text style={styles.horario}>
        ⏰ {salon.horario} (
        {salon.disponibilidad ? "Disponible" : "No disponible"})
      </Text>
      <Text style={styles.idiomas}>🌍 Idiomas: {salon.idiomas.join(", ")}</Text>
      <Text style={styles.promociones}>
        🎁 Promos: {salon.promociones.join(", ") || "Ninguna"}
      </Text>
      <Text style={styles.tiempo}>
        ⏳ Tiempo estimado: {salon.tiempo_estimado}
      </Text>
      <Text style={styles.etiquetas}>🏷️ {salon.etiquetas.join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
  ubicacion: {
    fontSize: 13,
    marginBottom: 4,
    color: "#555",
  },
  servicios: {
    fontSize: 13,
    marginBottom: 4,
  },
  creditos: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  calificacion: {
    fontSize: 13,
    marginBottom: 4,
  },
  horario: {
    fontSize: 13,
    marginBottom: 4,
  },
  idiomas: {
    fontSize: 13,
    marginBottom: 4,
  },
  promociones: {
    fontSize: 13,
    marginBottom: 4,
    fontStyle: "italic",
  },
  tiempo: {
    fontSize: 13,
    marginBottom: 4,
  },
  etiquetas: {
    fontSize: 13,
    marginBottom: 4,
    color: "#888",
  },
});
