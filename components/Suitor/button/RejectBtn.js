

import React from 'react';
import { TouchableOpacity, Text, PixelRatio } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { EMOJI_SKIN_COLOR_DEFAULT } from '../../../global-styles/globalStyles';

const RejectBtn = ({ handleOnPress, dynamicStyles = { backgroundColor: '#e74c3c' }, icon = faThumbsDown, iconColor = EMOJI_SKIN_COLOR_DEFAULT }) => {
    return (
        <TouchableOpacity onPress={handleOnPress} style={{ ...styles.button, ...dynamicStyles }}>
            <FontAwesomeIcon icon={icon} size={(PixelRatio.get() < 2) ? 20 : 25} color={iconColor} />
        </TouchableOpacity>
    );
};

const styles = {
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    icon: {
        marginRight: 5,
        color: '#fff',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default RejectBtn;
