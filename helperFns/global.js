import { Alert, DevSettings } from "react-native";

// for components that are used as screens, features, modals, and parts of a screen

const IS_TESTING_USER_REJECTION = false

export function trackUserRejection(sendRequestToTrackUserRejection) {
    // SEND THE POST REQUEST HERE TO TRACK THE USER'S REJECTION, using sendRequestToTrackUserRejection
    
    if (IS_TESTING_USER_REJECTION) {
        const alertTouchOpts = [{ text: 'Try again.', onPress: trackUserRejection }, { text: 'Restart app.', onPress: DevSettings.reload }, { text: 'Continue matching.' }]
        setTimeout(() => {
            Alert.alert("Failed to track rejection of user.", "Would you like to continue or try again?", alertTouchOpts)
        }, 1000);
    }
}