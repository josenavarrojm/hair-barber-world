// import CustomAppBar from '@/components/CustomAppBar';
import SalonCard from "@/components/SalonCard";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import salons from "@/data/salons.json";
import { Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Notificaciones")}>
          <IconSymbol
            name="notifications"
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
      <Stack.Screen options={{ title: "Salones", headerShown: true }} />
      <View className="w-1/2 h-[2rem] bg-yellow-500 border-2 border-green-600 m-4"></View>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {salons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 20,
    paddingTop: 10,
  },
});
