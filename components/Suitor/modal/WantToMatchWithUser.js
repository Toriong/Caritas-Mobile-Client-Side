import { StyleSheet, View, Image, PixelRatio, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-native-modal";
import { HeadingTxt, PTxt } from '../../customTxts';
import { EMOJI_SKIN_COLOR_DEFAULT, HEART_COLOR, PURLPLE_COLOR } from '../../../global-styles/globalStyles';
import usePulseAnimate from '../../../custom-hooks/usePulseAnimate';

function WantToMatchWithUserModal({ username = "Judy", _isModalOn }) {
    const [isModalOn, setIsModalOn] = _isModalOn;
    const pulseAnim = usePulseAnimate()

    function handleModalClose() {
        setIsModalOn(false)
    }

    function handleThumbsDownBtnTouch() {
        setIsModalOn(false)
    }

    function handleSendAReqBtnTouch() {
        setIsModalOn(false)
    }

    return (
        <Modal onModalHide={handleModalClose} onBackdropPress={handleModalClose} isVisible={isModalOn} style={{ ...styles.modal }} hasBackdrop backdropOpacity={.3} coverScreen={true}>
            <View>
                <View style={{ flex: 1.5, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <HeadingTxt style={{ textAlign: 'center' }}>You have reached the end of {username}'s questions. Do you want to send a match request and view {username}'s picture?</HeadingTxt>
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleThumbsDownBtnTouch} style={{ ...styles.thumbsDown, borderWidth: .5, borderColor: '#798188', width: "45%", height: 95 }}>
                        <PTxt>Pass.</PTxt>
                        <FontAwesomeIcon icon={faThumbsDown} style={{ marginTop: 10 }} size={PixelRatio.get() < 2 ? 20 : 25} color={EMOJI_SKIN_COLOR_DEFAULT} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSendAReqBtnTouch} style={{ ...styles.heartBtn, width: "45%", height: 95 }}>
                        <PTxt>Send a request!</PTxt>
                        <Animated.View style={{ transform: [{ scale: pulseAnim }], marginTop: 10 }}>
                            <FontAwesomeIcon icon={faHeart} size={PixelRatio.get() < 2 ? 20 : 25} color={HEART_COLOR} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: .5,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        top: '10%'
    },
    thumbsDown: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        margin: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    heartBtn: {
        backgroundColor: PURLPLE_COLOR,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        margin: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    }
})

export default WantToMatchWithUserModal;