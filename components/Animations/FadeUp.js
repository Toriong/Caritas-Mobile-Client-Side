import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

const FadeUp = ({ children, durationMs = 1000, delayMs = 0, dynamicStyles = {} }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        durationMs,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        durationMs,
        useNativeDriver: true,
      })
    ]);

    delayMs ? setTimeout(() => animation.start(), delayMs) : animation.start();
  }, []);

  return (
    <Animated.View style={{ ...dynamicStyles, opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

export default FadeUp;
