import { useEffect, useState } from "react";
import { Animated, Dimensions, Text } from "react-native";

const SCREEN_VIEWPORT_HEIGHT = Dimensions.get('window').height
const SCREEN_VIEWPORT_WIDTH = Dimensions.get('window').width

function AnimateSwipe({ children, panHandlers, position, dynamicStyle = {} }) {

    if (!panHandlers) {
        return (
            <Animated.View
                style={[
                    { transform: [{ translateX: 0 }, { translateY: 0 }] },
                    {
                        ...dynamicStyle,
                        height: SCREEN_VIEWPORT_HEIGHT - 120,
                        width: SCREEN_VIEWPORT_WIDTH,
                        padding: 10,
                        position: 'absolute',
                    }
                ]}
            >
                {children}
            </Animated.View>
        )
    }


    return (
        <Animated.View
            {...panHandlers}
            style={[
                { transform: [{ translateX: position.x }, { translateY: position.y }] },
                {
                    ...dynamicStyle,
                    height: SCREEN_VIEWPORT_HEIGHT - 120,
                    width: SCREEN_VIEWPORT_WIDTH,
                    padding: 10,
                    position: 'absolute',
                }
            ]}
        >
            {children}
        </Animated.View>
    )
}


export default AnimateSwipe;
