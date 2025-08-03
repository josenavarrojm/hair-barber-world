import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface PropsA {
  setSortOption: (value: string) => void;
  sortOption: string;
}

export default function CustomSortDropdown({
  sortOption,
  setSortOption,
}: PropsA) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Relevancia",
      value: "relevancia",
      icon: () => <MaterialIcons name="star-rate" size={18} color="#333" />,
    },
    {
      label: "Precio (menor a mayor)",
      value: "precio-asc",
      icon: () => (
        <MaterialIcons name="arrow-downward" size={18} color="#333" />
      ),
    },
    {
      label: "Precio (mayor a menor)",
      value: "precio-desc",
      icon: () => <MaterialIcons name="arrow-upward" size={18} color="#333" />,
    },
  ]);

  return (
    <View style={{ zIndex: 9999 }}>
      <DropDownPicker
        open={open}
        value={sortOption}
        items={items}
        setOpen={setOpen}
        setValue={(val) => setSortOption(val as unknown as string)}
        setItems={setItems}
        placeholder="Ordenar por"
        style={{
          backgroundColor: "#F2EADF",
          borderColor: "#ccc",
          borderRadius: 16,
        }}
        textStyle={{
          fontFamily: "Oswaldl",
          letterSpacing: 1,
          fontSize: 16,
        }}
        dropDownContainerStyle={{
          borderColor: "#ccc",
          borderRadius: 16,
        }}
        showArrowIcon={false} // quita la flechita si quieres
      />
    </View>
  );
}
