import { Alert, DevSettings } from "react-native";

// for components that are used as screens, features, modals, and parts of a screen

const IS_TESTING_USER_REJECTION = true

// GOAL: execute an alert when rejection of the user passes after failing for the first time. 
export function trackUserRejection( sendRequestToTrackUserRejection = null) {
    // SEND THE POST REQUEST HERE TO TRACK THE USER'S REJECTION, using sendRequestToTrackUserRejection

    // put a boolean from the request that you will send to the backend
    if (IS_TESTING_USER_REJECTION && !willCauseToPass) {
        const alertTouchOpts = [{ text: 'Try again.', onPress: () => trackUserRejection(sendRequestToTrackUserRejection) }, { text: 'Restart app.', onPress: DevSettings.reload }, { text: 'Continue matching.' }]
        setDidUserRejectionFailed(true)
        // simulating the request being sent to the backend
        setTimeout(() => {
            Alert.alert("Failed to track rejection of user.", "Would you like to continue or try again?", alertTouchOpts)
        }, 1000);
        return
    }
}