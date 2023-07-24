import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
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
    width: 80,
  },
});

type ContextType = {
  x: number;
};

const Picker = ({ values, defaultValue }: PickerProps) => {
  const translationX = useSharedValue(0);
  const swipped = useSharedValue(false);

  const clampedTranslatedX = useDerivedValue(() => {
    return Math.max(Math.min(translationX.value, 0), -width * 5);
  });

  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = translationX.value;
      // cancelAnimation(translationX);
      // translationX.value = 0;
      swipped.value = true;
    },
    onActive: (event, context) => {
      if (swipped.value) {
        if (event.translationX >= 0) {
          translationX.value += 80;
        } else {
          translationX.value -= 80;
        }
      }
      console.log(swipped.value);
      swipped.value = false;
    },
    // onEnd: (event) => {
    //   translationX.value = withDecay({ velocity: event.velocityX });
    // },
  });

  console.log(translationX.value);
  const itemStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translationX.value, {
            duration: 500,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        },
      ],
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
