import { screenDimensions } from "@/constants/screenDimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAppContext } from "@/app/context/appContext";
import { useToast } from "@/app/context/ToastContext";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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

interface BookingFormCardProps {
  salon: Salon;
  onSubmit: (data: { date: Date; service: string }) => void;
  onPress: () => void;
}

export default function BookingFormCard({
  salon,
  onSubmit,
  onPress,
}: BookingFormCardProps) {
  const { credits, setCredits } = useAppContext();
  const { showToast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedDateA, setSelectedDateA] = useState<Date>(new Date());

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceItems, setServiceItems] = useState(
    salon.servicios.map((service) => ({
      label: service,
      value: service,
    }))
  );

  const selectedServiceObj = salon.servicios.find((s) => s === selectedService);

  const handleConfirm = () => {
    if (selectedService && selectedDate) {
      onSubmit({ date: selectedDate, service: selectedService });
      setCredits(credits - salon.precio_creditos);
      showToast({
        text: "¡Reservación exitosa!",
        color: "green",
        icon: "checkcircle",
      });
    }
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, letterSpacing: 2, fontFamily: "Oswaldl" }}>
          Reservación
        </Text>
        <Pressable onPress={onPress}>
          <IconSymbol
            name="close.fill"
            color="#228"
            size={32}
            style={{ alignSelf: "flex-end" }}
          />
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 8,
          fontFamily: "Oswald",
        }}
      >
        {salon.nombre}
      </Text>

      <Text
        style={{ marginBottom: 6, fontFamily: "Oswaldl", letterSpacing: 2 }}
      >
        Selecciona el servicio:
      </Text>
      <DropDownPicker
        open={open}
        value={selectedService}
        items={serviceItems}
        setOpen={setOpen}
        setValue={setSelectedService}
        setItems={setServiceItems}
        placeholder="Elige un servicio"
        textStyle={{ fontFamily: "Oswald" }}
        style={{ borderColor: "#ccc", borderRadius: 16 }}
        dropDownContainerStyle={{
          borderColor: "#ccc",
          borderRadius: 16,
        }}
      />

      <Text
        style={{ marginVertical: 6, fontFamily: "Oswaldl", letterSpacing: 2 }}
      >
        Selecciona la fecha:
      </Text>
      {Platform.OS !== "web" && (
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            height: 40,
            justifyContent: "center",
            padding: 10,
            backgroundColor: "#FFF",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: "Oswald" }}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
          minimumDate={new Date()}
        />
      )}

      {Platform.OS === "web" && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 8,
            backgroundColor: "#f9f9f9",
            zIndex: open ? 0 : 9999,
          }}
        >
          <DatePicker
            selected={selectedDateA}
            onChange={(date) => date && setSelectedDateA(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Elige una fecha"
            className="custom-datepicker font-[Oswald] text-[0.9em]"
            minDate={new Date()}
          />
        </View>
      )}

      {selectedServiceObj && (
        <Text style={{ marginTop: 10 }}>
          Créditos requeridos: {salon.precio_creditos}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleConfirm}
        style={{
          marginTop: 16,
          backgroundColor: "#0059aa",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Confirmar Reserva
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F2EADF",
    borderRadius: 16,
    padding: 32,
    margin: 16,
    elevation: 3,
    alignSelf: "center",
    width: isDesktop ? windowWidth * 0.35 : "auto",
  },
});
