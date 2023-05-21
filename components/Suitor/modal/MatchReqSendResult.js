import { View, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { PTxt } from "../../customTxts";
import { BLUE_PRIMARY_COLOR, PURLPLE_COLOR } from "../../../global-styles/globalStyles";
import { useEffect } from "react";

const MODAL_STATE_TXT_MATCH_REQ_SENT = 'Match request was sent';
const TOUCHABLE_TXTS = [{ modalStateTxt: 'Sending match request...', touchableTxt: 'Request is being sent...' }, { modalStateTxt: MODAL_STATE_TXT_MATCH_REQ_SENT, touchableTxt: 'Continue matching ✨!' }, { modalStateTxt: 'FAIL TO SEND MATCH REQUEST 😔.', touchableTxt: 'Try again.' }]

function MatchReqSendResult({ modalStateTxt, states, username, fns }) {
    const { swipeRight, setMatchReqResultsTxt } = fns;
    const { _isModalVisible, _willTryToSendMatchReqAgain } = states;
    const [isModalVisible, setIsModalVisible] = _isModalVisible;
    const [, setWillTryToSendMatchReqAgain] = _willTryToSendMatchReqAgain;
    const touchableTxt = TOUCHABLE_TXTS.find(({ modalStateTxt: _modalStateTxt }) => _modalStateTxt === modalStateTxt).touchableTxt;
    const isSendingReq = modalStateTxt === 'Sending match request...';
    const wasReqSentSuccessfully = modalStateTxt === MODAL_STATE_TXT_MATCH_REQ_SENT;
    const didReqFailed = modalStateTxt === 'FAIL TO SEND MATCH REQUEST 😔.';

    function handleOnModalHide(){
        setMatchReqResultsTxt("Sending match request...")
    }

    function handleCancelPress(){
        setIsModalVisible(false)
        handleOnModalHide()
    }

    function handleBackDropPress() {
        if (isSendingReq) {
            Alert.alert("Cancel sending match request?", "Are you sure you want to cancel sending this match request?", [{ text: "Yes, cancel.", onPress: handleCancelPress }, { text: "No, don't cancel." }])
            return
        };

        if (wasReqSentSuccessfully) {
            setTimeout(() => {
                swipeRight()
            }, 500)
        };

        setIsModalVisible(false);
    }

    function handleTryAgainBtnTouch() {
        setWillTryToSendMatchReqAgain(true);
    }

    // GOAL: when the user closes the modal and the request was successfully sent, then on the close of the modal, execute the swipe animation. 

    return (
        <Modal onModalHide={handleOnModalHide} animationOutTiming={500} animationInTiming={500} isVisible={isModalVisible} style={styles.modal} onBackdropPress={handleBackDropPress}>
            <View style={{ flex: .7, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <PTxt style={{ color: 'black' }}>{modalStateTxt}{wasReqSentSuccessfully ? ` to ${username} 💕!` : ''}</PTxt>
                {isSendingReq && <ActivityIndicator size="large" color={BLUE_PRIMARY_COLOR} style={styles.spinnerStyle} />}
            </View>
            <View style={{ flex: .5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={didReqFailed ? handleTryAgainBtnTouch : handleBackDropPress} style={{ ...styles.touchable, opacity: isSendingReq ? .45 : 1 }} disabled={isSendingReq}>
                    <PTxt style={{ color: 'black', textAlign: 'center', display: 'flex', flexDirection: 'row' }}>{touchableTxt}</PTxt>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: .45,
        borderRadius: 20,
        top: "10%",
        backgroundColor: 'white'
    },
    spinnerStyle: {
        marginLeft: 10
    },
    touchable: {
        backgroundColor: PURLPLE_COLOR,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        width: "75%"
    }
})

export default MatchReqSendResult;
