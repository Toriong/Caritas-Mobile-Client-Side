import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { PTxt } from "../../customTxts";
import { PURLPLE_COLOR } from "../../../global-styles/globalStyles";
import { TouchableOpacity, StyleSheet } from 'react-native';
import Glow from '../../Animations/Glow';


function QuestionBtn({ handleOnPress }) {
    const animSeqenceArr = [{ toValue: .5, duration: 500 }, { toValue: 1, duration: 500 }, { toValue: .7, duration: 500 }, { toValue: .5, duration: 500 }]

    return (
        <Glow animSeqenceArr={animSeqenceArr}>
            <TouchableOpacity onPress={handleOnPress} style={{ ...styles.btn, ...styles.shadow }}>
                <FontAwesomeIcon icon={faQuestion} color='white' />
            </TouchableOpacity>
        </Glow>
    )
}


const styles = StyleSheet.create({
    btn: {
        backgroundColor: PURLPLE_COLOR,
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

export default QuestionBtn;