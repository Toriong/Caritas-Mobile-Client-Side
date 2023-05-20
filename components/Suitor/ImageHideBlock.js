import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

function ImageHideBlock({ box }) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [wasFadedOut, setWasFadedOut] = useState(false)
    const { id, top, left, willFadeOut, willHide } = box;

    const fadeOutBlock = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (willFadeOut && !wasFadedOut) {
            fadeOutBlock();
            setWasFadedOut(true);
        }
    }, [willFadeOut])

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <View
                key={id}
                style={{ top: top, left: left, width: 100, height: 100, 
                    opacity: willHide ? 0 : 1,
                    backgroundColor: 'white', position: 'absolute' }}
            />
        </Animated.View>
    )
}

export default ImageHideBlock;
