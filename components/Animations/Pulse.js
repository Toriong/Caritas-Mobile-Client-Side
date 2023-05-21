import { useRef } from "react";
import { Animated } from "react-native";
import usePulseAnimate from "../../custom-hooks/usePulseAnimate";


function Pulse({ children }){
    const pulseAnim = usePulseAnimate()

    return (
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            {children}
        </Animated.View>
    )
}

export default Pulse;
