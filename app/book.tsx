// Importación de componentes personalizados para filtrado, ordenamiento y visualización de salones
import CustomDropdownCat from "@/components/CustomDropDownMenuCats";
import CustomSortDropdown from "@/components/CustomDropDownMenuSort";
import SalonCard from "@/components/SalonCard";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Constante que determina si la pantalla es de escritorio o no
import { screenDimensions } from "@/constants/screenDimensions";

// Datos locales simulando una API con información de salones
import salons from "@/data/salons.json";

// Navegación mediante stack de Expo Router
import { Stack } from "expo-router";

// Hooks de React para manejar estados y efectos
import { useEffect, useMemo, useState } from "react";

// Componentes básicos de React Native
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

// Contexto global para acceder a datos compartidos como créditos
import { useAppContext } from "./context/appContext";

// Desestructuración para saber si se está en desktop
const { isDesktop } = screenDimensions;

// Número de salones mostrados por página
const PAGE_SIZE = 10;

export default function BarberBook() {
  // Estado para texto de búsqueda
  const [searchText, setSearchText] = useState("");

  // Estado para los salones filtrados según búsqueda/servicio
  const [filteredSalons, setFilteredSalons] = useState(salons);

  // Estado para el servicio actualmente seleccionado
  const [selectedService, setSelectedService] = useState("Todos");

  // Estado para la opción de ordenamiento actual
  const [sortOption, setSortOption] = useState("relevancia");

  // Estado para los salones actualmente visibles (paginación)
  const [visibleSalons, setVisibleSalons] = useState(
    salons.slice(0, PAGE_SIZE)
  );

  // Extrae todos los servicios únicos desde los datos
  const allServices = useMemo(() => {
    const services = salons.flatMap((s) => s.servicios);
    return ["Todos", ...Array.from(new Set(services))];
  }, []);

  // Efecto que actualiza los resultados cuando cambian búsqueda, filtros u ordenamiento
  useEffect(() => {
    let result = salons;

    // Filtro por texto (nombre, etiquetas o servicios)
    if (searchText.trim() !== "") {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (salon) =>
          salon.nombre.toLowerCase().includes(lower) ||
          salon.etiquetas.some((e) => e.toLowerCase().includes(lower)) ||
          salon.servicios.some((s) => s.toLowerCase().includes(lower))
      );
    }

    // Filtro por servicio específico
    if (selectedService !== "Todos") {
      result = result.filter((salon) =>
        salon.servicios.includes(selectedService)
      );
    }

    // Ordenamiento según opción seleccionada
    result = [...result].sort((a, b) => {
      if (sortOption === "relevancia") return b.calificacion - a.calificacion;
      if (sortOption === "precio-asc")
        return a.precio_creditos - b.precio_creditos;
      if (sortOption === "precio-desc")
        return b.precio_creditos - a.precio_creditos;
      return 0;
    });

    // Actualización de resultados filtrados y visibles
    setFilteredSalons(result);
    setVisibleSalons(result.slice(0, PAGE_SIZE));
  }, [searchText, selectedService, sortOption]);

  // Cargar más resultados cuando se llega al final del scroll
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
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              sortOption={sortOption}
              setSortOption={setSortOption}
              allServices={allServices}
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
        {/* Lista paginada de salones con scroll infinito */}
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

// Props para el componente de cabecera personalizada
interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  resultCount: number;
  selectedService: string;
  setSelectedService: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  allServices: string[];
}

// Cabecera personalizada con buscador, créditos y filtros
function CustomHeader({
  searchText,
  setSearchText,
  resultCount,
  selectedService,
  setSelectedService,
  sortOption,
  setSortOption,
  allServices,
}: Props) {
  // Obtener créditos del contexto global
  const { credits } = useAppContext();
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
        {/* Ícono de usuario */}
        <IconSymbol name="person.circle.fill" size={32} color="#FEFFAA" />

        {/* Título de la página */}
        <Text style={styles.appBarTitle}>Salones</Text>

        {/* Créditos disponibles */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.credit}>{credits}</Text>
          <IconSymbol name="currency-lira.fill" size={24} color="#F2EADF" />
        </View>
      </View>

      {/* Input de búsqueda */}
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
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
      </View>

      {/* Texto con cantidad de resultados */}
      <View>
        <Text
          style={{
            color: "#F5FBEFAB",
            fontFamily: "Oswald",
            fontSize: 14,
            width: isDesktop ? 650 : "auto",
            textAlign: "right",
          }}
        >
          {resultCount === 1
            ? "1 resultado encontrado"
            : `${resultCount} resultados encontrados`}
        </Text>
      </View>

      {/* Dropdowns para filtros y ordenamiento */}
      <View
        style={{
          flexDirection: "row",
          width: isDesktop ? 650 : "auto",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomDropdownCat
            value={selectedService}
            setValue={setSelectedService}
            options={allServices.map((service) => ({
              label: service,
              value: service,
            }))}
            placeholder="Filtrar por servicio"
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomSortDropdown
            setSortOption={setSortOption}
            sortOption={sortOption}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: isDesktop
    ? {
        height: 198, // usa un valor en puntos, no porcentaje
        flexDirection: "column",
        backgroundColor: "#D95448",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingBottom: 16,
        zIndex: 10, // para que quede encima
      }
    : {
        height: 224, // usa un valor en puntos, no porcentaje
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
        height: 32,
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
  inputText: isDesktop
    ? {
        height: 32,
        width: "90%",
        borderRadius: 16,
        paddingLeft: 16,
        fontSize: 16,
        fontFamily: "Oswaldl",
      }
    : {
        height: 48,
        width: "90%",
        borderRadius: 16,
        paddingLeft: 16,
        fontSize: 20,
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
