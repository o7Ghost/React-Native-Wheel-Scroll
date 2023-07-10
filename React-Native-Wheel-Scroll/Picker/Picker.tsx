import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

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
    padding: 4,
    width: 200,
  },
});

type ContextType = {
  x: number;
};

const Picker = ({ values, defaultValue }: PickerProps) => {
  const translationX = useSharedValue(0);

  const clampedTranslatedX = useDerivedValue(() => {
    console.log(translationX.value);
    return Math.max(Math.min(translationX.value, 0), -width);
  });

  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslatedX.value;
      cancelAnimation(translationX);
    },
    onActive: (event, context) => {
      translationX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translationX.value = withDecay({ velocity: event.velocityX });
    },
  });

  const itemStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: clampedTranslatedX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={PanGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {values.map((v, i) => {
            return (
              <Animated.View style={[itemStyle]} key={v.value}>
                <Text style={styles.label}>{v.label}</Text>
              </Animated.View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Picker;
