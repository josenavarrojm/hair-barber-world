import SalonCard from "@/components/SalonCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import salons from "@/data/salons.json";
import { Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BarberBook() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Notificaciones")}>
          <IconSymbol
            name="notifications.fill"
            size={24}
            color="red"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <Stack.Screen
        name="Salones"
        options={{
          header: () => <CustomHeader />,
          contentStyle: { backgroundColor: "#F2EADF" },
        }}
      />
      {/* <View style={styles.appBar}>
        </View> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {salons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 152, // usa un valor en puntos, no porcentaje
    backgroundColor: "#D95448",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    borderRadius: 16,
    paddingBottom: 16,
    zIndex: 10, // para que quede encima
  },
  appBarTitle: {
    color: "#F2EADF",
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Oswald",
    marginBottom: 8,
  },
  searchContainer: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2EADF",
    borderRadius: 16,
  },
  inputText: {
    height: 48,
    width: "90%",
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: "Oswaldl",
  },
  searchIcon: {
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    width: "100%",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  scrollContainer: {
    paddingHorizontal: 16,

    paddingBottom: 20,
    paddingTop: 16,
  },
});

// <ThemedView style={styles.container}>
// </ThemedView>

function CustomHeader() {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>Salones</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar salón..."
          placeholderTextColor="#444"
          style={styles.inputText}
        />
        <IconSymbol
          name="search.fill"
          size={24}
          color="#000"
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
}
