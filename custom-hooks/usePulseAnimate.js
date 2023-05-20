import { useEffect, useRef } from "react";
import { Animated } from 'react-native';


function usePulseAnimate( startingScaleNum = 1, duration = 1000, toValueNum = 1.3){
    const pulseAnim = useRef(new Animated.Value(startingScaleNum)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: toValueNum,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        
    }, []);

    return pulseAnim
}

export default usePulseAnimate;