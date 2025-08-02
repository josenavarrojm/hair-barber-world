import SalonCard from "@/components/SalonCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { screenDimensions } from "@/constants/screenDimensions";
import salons from "@/data/salons.json";
import { router, Stack, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { isDesktop } = screenDimensions;

export default function BarberBook() {
  const navigation = useNavigation();

  const [visibleSalons, setVisibleSalons] = useState(salons.slice(0, 10)); // Primeros 10
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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

  const loadMoreSalons = () => {
    const nextPage = page + 1;
    const nextItems = salons.slice(0, nextPage * itemsPerPage);
    setVisibleSalons(nextItems);
    setPage(nextPage);
  };

  return (
    <>
      <Stack.Screen
        name="Salones"
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={visibleSalons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SalonCard salon={item} />}
          onEndReached={loadMoreSalons}
          onEndReachedThreshold={0.2}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={isDesktop && styles.scrollContainer}
        />
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        {salons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </ScrollView> */}
    </>
  );
}

function CustomHeader() {
  return (
    <View style={styles.appBar}>
      <View
        style={[
          {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            // backgroundColor: "#aa0",
          },
          isDesktop && { width: 650 },
        ]}
      >
        <Pressable onPress={() => router.push("/profile")}>
          <IconSymbol
            name="person.circle.fill"
            size={32}
            color="#FEFFAA"
            // style={styles.searchIcon}
          />
        </Pressable>
        <Text style={styles.appBarTitle}>Salones</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.credit}>37</Text>
          <IconSymbol
            name="currency-lira.fill"
            size={24}
            color="#F2EADF"
            // style={styles.searchIcon}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar salón..."
          placeholderTextColor="#888"
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

const styles = StyleSheet.create({
  appBar: isDesktop
    ? {
        height: 128, // usa un valor en puntos, no porcentaje
        flexDirection: "column",
        backgroundColor: "#D95448",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingBottom: 16,
        zIndex: 10, // para que quede encima
      }
    : {
        height: 160, // usa un valor en puntos, no porcentaje
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
    fontSize: 32,
    fontFamily: "Oswald",
    marginRight: 24,
  },
  searchContainer: isDesktop
    ? {
        height: 48,
        width: 650,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F2EADF",
        borderRadius: 16,
      }
    : {
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
  credit: {
    fontSize: isDesktop ? 24 : 32,
    fontFamily: "GrenzeGotisch",
    color: "#F2EADF",
    paddingBottom: isDesktop ? 0 : 6,
  },
});
