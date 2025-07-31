import logo from "@/assets/images/barberlogo.png";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
const isDesktop = windowWidth > 720;

export default function Welcome() {
  const [imgHeight, setImgHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS !== "web") {
      Image.getSize(
        Image.resolveAssetSource(logo).uri,
        (width, height) => {
          const ratio = height / width;
          setImgHeight(windowWidth * ratio);
        },
        (error) => {
          console.error("Error getting image size:", error);
        }
      );
    } else {
      const ratio = 1 / 1;
      setImgHeight(windowWidth * ratio);
    }
  }, []);

  return (
    <>
      {/* <Stack.Screen
        options={{
          title: "Explore",
          headerShown: true,
          headerTintColor: "#0f0",
        }}
      /> */}
      <LinearGradient
        // Background Linear Gradient
        colors={["#FBF2E8", "#FBF2E8"]}
        locations={[0.0, 0.5]}
        style={styles.container}
      >
        <View style={styles.titleBox}>
          <ThemedText type="title" style={styles.title}>
            barber book
          </ThemedText>
        </View>
        <View>
          <Image
            source={logo}
            style={{
              width: isDesktop ? windowWidth * 0.7 : windowWidth,
              height: imgHeight,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <View>
            <ThemedText type="title" style={styles.titleDown}>
              Descubre Barber Book App
            </ThemedText>
            <ThemedText type="subtitle" style={styles.slogan}>
              Reserva tu cita perfecta en segundos. Tu estilo, tu tiempo.
            </ThemedText>
          </View>
          <Pressable
            onPress={() => router.replace("/home")}
            style={styles.button}
          >
            <ThemedText type="subtitle" style={styles.textBtn}>
              Get Started
            </ThemedText>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: isDesktop
    ? {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "#f00",
      }
    : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f",
        paddingBottom: 24,
      },
  titleBox: {
    position: "absolute",
    top: 80,
    left: 24,
    width: "88%",
    zIndex: 9999,
  },

  title: isDesktop
    ? {
        color: "#09507A",
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
  titleDown: {
    fontFamily: "Oswald",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#F2EADF",
    fontSize: 32,
  },
  slogan: {
    fontFamily: "Oswaldl",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#F2EADF",
    fontSize: 16,
    marginTop: 8,
  },
  card: isDesktop
    ? {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "48%",
        width: "40%",
        backgroundColor: "#D95448",
        shadowColor: "#075473",
        boxShadow: "-1px -1px 2px 0px #A63116",
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
  logo: {
    backgroundColor: "#0a0",
    padding: 0,
  },
  button: {
    borderRadius: 16,
    backgroundColor: "#09507A",
    padding: 16,
    width: "80%",
  },
  textBtn: {
    fontFamily: "Oswaldl",
    textAlign: "center",
    color: "#F2EADF",
    fontSize: 32,
  },
});
