import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Animated, PixelRatio, StyleSheet, TouchableOpacity } from "react-native";
import usePulseAnimate from "../../../custom-hooks/usePulseAnimate";
import { HEART_COLOR, PURLPLE_BTN_COLOR } from "../../../global-styles/globalStyles";
import { PTxt } from "../../customTxts";


function MatchReqBtn({ handleMatchReqBtnTouch, isTxtDisplayed, dynamicStyles = {} }) {
    const pulseAnim = usePulseAnimate()

    const styles = StyleSheet.create({
        heartBtn: {
            backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: 10,
            margin: 10,
            width: 50,
            height: 50,
            // paddingLeft: 15,
            // paddingRight: 15,
            // paddingTop: 10,
            // paddingBottom: 10,
        }
    })

    return (
        <TouchableOpacity onPress={handleMatchReqBtnTouch} style={{ ...styles.heartBtn, ...dynamicStyles }}>
            {!!isTxtDisplayed && <PTxt>Send a request!</PTxt>}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <FontAwesomeIcon icon={faHeart} size={PixelRatio.get() < 2 ? 20 : 25} color={HEART_COLOR} />
            </Animated.View>
        </TouchableOpacity>
    )
}




export default MatchReqBtn;