import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";

import { VISIBLE_ITEMS, ITEM_HEIGHT } from "./Constants";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

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
  const PanGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: (event) => {
        console.log(event.translationX);
      },
      onEnd: () => {},
    });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={PanGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {values.map((v, i) => {
            return (
              <View key={v.value}>
                <Text style={styles.label}>{v.label}</Text>
              </View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Picker;
