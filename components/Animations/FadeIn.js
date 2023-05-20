
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, style = {}, durationMs = 1000, delayMs = 0, toValueInt = 1 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    function executeFadeIn(){
        Animated.timing(
            fadeAnim,
            {
                toValue: toValueInt,
                duration: durationMs,
                useNativeDriver: true,
            }
        ).start();
    }

    useEffect(() => {
        delayMs ? setTimeout(() => executeFadeIn(), delayMs) : executeFadeIn()
    }, []);

    return (
        <Animated.View style={{ ...style, opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};

export default FadeInView;