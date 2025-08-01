// Se importa el logo de la aplicación desde la carpeta de assets.
import logo from "@/assets/images/barberlogo.png";

// Componente personalizado para mostrar texto con estilo según el tema (oscuro/claro, etc.)
import { ThemedText } from "@/components/ThemedText";

// Hook de navegación proporcionado por Expo Router para cambiar de pantalla
import { Stack, useRouter } from "expo-router";

// Componente de barra de estado para controlar su color y estilo

// React hooks para manejar estados y efectos secundarios
import { useEffect, useState } from "react";

// Importaciones de elementos esenciales de React Native
import {
  Dimensions, // Para obtener las dimensiones de la ventana
  Image, // Componente para renderizar imágenes
  Platform, // Para saber si estamos en web, Android o iOS
  Pressable, // Botón táctil personalizable
  StyleSheet, // Crear estilos para los componentes
  View, // Contenedor visual, similar a un <div>
} from "react-native";

// Se obtiene el ancho actual de la pantalla
const windowWidth = Dimensions.get("window").width;

// Se determina si el dispositivo es una pantalla grande (por ejemplo, escritorio)
const isDesktop = windowWidth > 720;

// Componente principal de bienvenida que se muestra al iniciar la app
export default function Welcome() {
  // Estado para almacenar dinámicamente la altura que debe tener la imagen del logo
  const [imgHeight, setImgHeight] = useState(0);

  // Hook para manejar la navegación entre pantallas
  const router = useRouter();

  // Hook que se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Si no estamos en la web (es decir, estamos en móvil)
    if (Platform.OS !== "web") {
      // Obtenemos las dimensiones reales de la imagen
      Image.getSize(
        Image.resolveAssetSource(logo).uri, // Obtenemos la URI de la imagen
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

  return (
    <>
      {/* Barra de estado superior (color oscuro para buena visibilidad sobre fondo claro) */}

      <Stack.Screen
        options={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarAnimation: "slide",
        }}
      />
      <View style={styles.container}>
        {/* Título superior izquierdo */}
        <View style={styles.titleBox}>
          <ThemedText type="title" style={styles.title}>
            barber book
          </ThemedText>
        </View>

        {/* Sección donde se muestra el logo con tamaño dinámico según la pantalla */}
        <View>
          <Image
            source={logo}
            style={{
              width: isDesktop ? windowWidth * 0.7 : windowWidth,
              height: imgHeight,
            }}
            resizeMode="contain" // Para que la imagen no se deforme
          />
        </View>

        {/* Tarjeta informativa con mensaje de bienvenida y botón */}
        <View style={styles.card}>
          <View>
            {/* Título central */}
            <ThemedText type="title" style={styles.titleDown}>
              Descubre Barber Book App
            </ThemedText>

            {/* Subtítulo con mensaje de valor */}
            <ThemedText type="subtitle" style={styles.slogan}>
              Reserva tu cita perfecta en segundos. Tu estilo, tu tiempo.
            </ThemedText>
          </View>

          {/* Botón para continuar hacia la pantalla principal */}
          <Pressable
            onPress={() => router.replace("/book")} // Redirige al home sin volver atrás
            style={styles.button}
          >
            {({ pressed }) => (
              <ThemedText
                type="subtitle"
                style={{ ...styles.textBtn, opacity: pressed ? 0.5 : 1 }}
              >
                Empezar a agendar
              </ThemedText>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
}

// Estilos personalizados para cada componente visual según plataforma
const styles = StyleSheet.create({
  // Contenedor principal (ajustado a escritorio o móvil)
  container: isDesktop
    ? {
        flex: 1,
        alignItems: "flex-end", // contenido alineado a la derecha
        justifyContent: "center",
        backgroundColor: "#FBF2E8", // color crema claro
      }
    : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF2E8",
        paddingBottom: 24, // espacio extra inferior
      },

  // Posición del título principal arriba a la izquierda
  titleBox: {
    position: "absolute",
    top: 80,
    left: 24,
    width: "88%",
    zIndex: 9999, // Asegura que esté al frente
  },

  // Estilo del texto principal "barber book"
  title: isDesktop
    ? {
        color: "#09507A", // azul oscuro
        fontFamily: "ProtestGuerrilla",
        textTransform: "lowercase",
        fontSize: 56,
      }
    : {
        color: "#09507A",
        fontFamily: "ProtestGuerrilla",
        textTransform: "lowercase",
        fontSize: 48,
      },

  // Título inferior dentro de la tarjeta
  titleDown: {
    fontFamily: "Oswald",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#F2EADF", // crema claro
    fontSize: 32,
  },

  // Subtítulo descriptivo
  slogan: {
    fontFamily: "Oswaldl", // Nota: asegúrate que "Oswaldl" esté bien definido
    textTransform: "uppercase",
    textAlign: "center",
    color: "#F2EADF",
    fontSize: 16,
    marginTop: 8,
  },

  // Tarjeta que contiene texto y botón de inicio
  card: isDesktop
    ? {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "48%",
        width: "40%",
        backgroundColor: "#D95448", // rojo oscuro
        shadowColor: "#075473",
        boxShadow: "-1px -1px 2px 0px #A63116", // sombra sutil
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        padding: 16,
        position: "absolute",
        bottom: 20,
        left: 20,
      }
    : {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "40%",
        width: "100%",
        backgroundColor: "#D95448",
        shadowColor: "#075473",
        boxShadow: "-1px -1px 2px 0px #A63116",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        padding: 16,
        position: "absolute",
        bottom: 0,
        left: 0,
      },

  // Estilo del botón "Empezar a agendar"
  button: {
    borderRadius: 16,
    backgroundColor: "#1A618B", // azul oscuro
    padding: 16,
    width: "80%",
  },

  // Texto dentro del botón
  textBtn: {
    fontFamily: "Oswaldl",
    textAlign: "center",
    color: "#F2EADF",
    fontSize: 24,
  },
});
