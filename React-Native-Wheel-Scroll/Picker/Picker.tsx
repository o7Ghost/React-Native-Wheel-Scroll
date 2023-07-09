import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
import { VISIBLE_ITEMS, ITEM_HEIGHT } from "./Constants";

interface PickerProps {
  defaultValue: number;
  values: { value: number; label: string }[];
}

const styles = StyleSheet.create({
  container: {
    width: 0.61 * width,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

const Picker = ({ values, defaultValue }: PickerProps) => {
  return (
    <View style={styles.container}>
      {values.map((v, i) => {
        return (
          <View key={v.value}>
            <Text style={styles.label}>{v.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Picker;
