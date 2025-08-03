import SalonCard from "@/components/SalonCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { screenDimensions } from "@/constants/screenDimensions";
import salons from "@/data/salons.json";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { isDesktop } = screenDimensions;
const PAGE_SIZE = 10;

export default function BarberBook() {
  const [searchText, setSearchText] = useState("");
  const [filteredSalons, setFilteredSalons] = useState(salons);
  const [visibleSalons, setVisibleSalons] = useState(
    salons.slice(0, PAGE_SIZE)
  );

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredSalons(salons);
      setVisibleSalons(salons.slice(0, PAGE_SIZE));
      return;
    }

    const lowercased = searchText.toLowerCase();

    const filtered = salons.filter((salon) => {
      return (
        salon.nombre.toLowerCase().includes(lowercased) ||
        salon.etiquetas.some((etiqueta) =>
          etiqueta.toLowerCase().includes(lowercased)
        ) ||
        salon.servicios.some((servicio) =>
          servicio.toLowerCase().includes(lowercased)
        )
      );
    });

    setFilteredSalons(filtered);
    setVisibleSalons(filtered.slice(0, PAGE_SIZE));
  }, [searchText]);

  const loadMoreSalons = () => {
    const currentLength = visibleSalons.length;
    const next = filteredSalons.slice(currentLength, currentLength + PAGE_SIZE);
    if (next.length > 0) {
      setVisibleSalons([...visibleSalons, ...next]);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Salones",
          headerShown: true,
          header: () => (
            <CustomHeader
              searchText={searchText}
              setSearchText={setSearchText}
              resultCount={filteredSalons.length}
            />
          ),
        }}
      />
      <View
        style={[
          {
            backgroundColor: "#F5FBEF",
          },
          isDesktop && styles.scrollContainer,
        ]}
      >
        <FlatList
          data={visibleSalons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SalonCard salon={item} />}
          onEndReached={loadMoreSalons}
          onEndReachedThreshold={0.2}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
}

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  resultCount: number;
}

function CustomHeader({ searchText, setSearchText, resultCount }: Props) {
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
          },
          isDesktop && { width: 650 },
        ]}
      >
        <Pressable onPress={() => router.push("/profile")}>
          <IconSymbol name="person.circle.fill" size={32} color="#FEFFAA" />
        </Pressable>
        <Text style={styles.appBarTitle}>Salones</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.credit}>37</Text>
          <IconSymbol name="currency-lira.fill" size={24} color="#F2EADF" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar salón..."
          placeholderTextColor="#888"
          style={styles.inputText}
          value={searchText}
          onChangeText={setSearchText}
        />
        <IconSymbol
          name="search.fill"
          size={24}
          color="#000"
          style={styles.searchIcon}
        />
      </View>
      <View>
        <Text
          style={{
            color: "#F5FBEFAB",
            fontFamily: "Oswald",
            fontSize: 14,
            width: isDesktop ? 650 : "auto",
            // alignSelf: isDesktop ? "flex-end" : "flex-start",
            textAlign: "right",
            // paddingLeft: isDesktop ? 350 : 8,
            // backgroundColor: "#FFA",
          }}
        >
          {resultCount === 1
            ? "1 resultado encontrado"
            : `${resultCount} resultados encontrados`}
        </Text>
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
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // width: windowWidth * 0.55,
    // paddingHorizontal: windowWidth * 0.1,
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
