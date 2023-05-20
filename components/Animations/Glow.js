import { Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';


function Glow({ children, animSeqenceArr, intervalTime = 2000, dynamicStyles = {} }) {
    const glowAnim = useRef(new Animated.Value(0)).current;
    const [didInitiallyRendered, setDidInitiallyRendered] = useState(false)

    const glowLayout = () => {
        const _animationSequenceArr = animSeqenceArr.map(({ toValue, duration }) => Animated.timing(glowAnim, { toValue, duration, useNativeDriver: true }))
        Animated.sequence(_animationSequenceArr).start();
    };

    useEffect(() => {
        let intervalTimer = setInterval(() => {
            glowLayout()
        }, intervalTime)

        return () => {
            if (didInitiallyRendered) {
                clearInterval(intervalTimer)
            }
            setDidInitiallyRendered(true)
        }
    }, [])

    return (
        <Animated.View style={{ ...dynamicStyles, opacity: glowAnim }}>
            {children}
        </Animated.View>
    )
}

export default Glow;
