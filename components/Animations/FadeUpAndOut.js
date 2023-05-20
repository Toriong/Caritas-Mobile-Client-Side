import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

const FadeUpAndOut = ({ children, _willFadeIn, durationMs = 1000, delayMs = 0, willFadeOut, dynamicStyles = {}, endTranslateNum = 0  }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [willFadeLayoutIn, setWillFadeLayoutIn] =_willFadeIn


  useEffect(() => {
    if(willFadeLayoutIn){
      const animation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          durationMs,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: endTranslateNum,
          durationMs,
          useNativeDriver: true,
        })
      ]);
      
      delayMs ? setTimeout(() => animation.start(), delayMs) : animation.start();
      setWillFadeLayoutIn(false);
    }
  }, [willFadeLayoutIn]);

  useEffect(() => {
    if (willFadeOut) {
      const animation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          durationMs,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          durationMs,
          useNativeDriver: true,
        })
      ]);

      animation.start()
    }
  }, [willFadeOut])

  return (
    <Animated.View style={{ ...dynamicStyles, opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

export default FadeUpAndOut;
