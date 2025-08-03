import { screenDimensions } from "@/constants/screenDimensions";
import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const { isDesktop } = screenDimensions;

interface DropdownProps {
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export default function CustomDropdownCat({
  value,
  setValue,
  options,
  placeholder = "Seleccionar",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <View style={{ zIndex: 9999, position: "relative" }}>
      <DropDownPicker
        modalProps={{
          animationType: "slide",
          // transparent: true,
        }}
        listMode={isDesktop ? "SCROLLVIEW" : "MODAL"}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) =>
          setValue(typeof callback === "function" ? callback(value) : callback)
        }
        setItems={setItems}
        placeholder={placeholder}
        style={{
          backgroundColor: "#F2EADF",
          borderColor: "#ccc",
          borderRadius: 16,
        }}
        textStyle={{
          fontFamily: "Oswaldl",
          fontSize: 16,
          letterSpacing: 2,
        }}
        dropDownContainerStyle={{
          borderColor: "#ccc",
          borderRadius: 16,
        }}
      />
    </View>
  );
}
