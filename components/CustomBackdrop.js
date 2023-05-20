import React from 'react'
import { View, TouchableOpacity } from 'react-native'

function Backdrop({ children, handleBackdropTouch, color = 'black', customStyles = {} }) {

    return (
        <View style={{ ...customStyles, backgroundColor: color, position: 'absolute', width: '100%', height: '100%' }}>
            <TouchableOpacity onPress={handleBackdropTouch} style={{ width: '100%', height: '100%' }} />
            {children}
        </View >
    )
}

export default Backdrop;
