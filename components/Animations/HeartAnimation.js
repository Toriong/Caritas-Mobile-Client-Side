import { Animated, StyleSheet } from 'react-native';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { HEART_COLOR, USER_INTERACTION_ICON_SIZE } from '../../global-styles/globalStyles';
import { useEffect, useRef } from 'react';

function HeartAnimation({ startingScaleNum = 1, duration = 1000 }) {
    const pulseAnim = useRef(new Animated.Value(startingScaleNum)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
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

    return (
        <Animated.View style={{ ...btnStyles.main, ...btnStyles.shadow, transform: [{ scale: pulseAnim }] }}>
            <FontAwesomeIcon icon={faHeart} color={HEART_COLOR} size={USER_INTERACTION_ICON_SIZE} style={{ color: HEART_COLOR }} />
        </Animated.View>
    )
}


const btnStyles = StyleSheet.create({
    main: {
        backgroundColor: '#A1B0FD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50, height: 50, borderRadius: 10
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default HeartAnimation;