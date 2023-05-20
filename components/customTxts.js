import { StyleSheet, Text, View } from 'react-native';
import { FONT_FAMILY_MAIN } from '../global-styles/globalStyles';


function getGlobalStyles(fontSize) {
    return StyleSheet.create({
        main: {
            fontFamily: FONT_FAMILY_MAIN,
            fontSize: fontSize
        },
    })
}


export function PTxt({ children: txt, fontSize = 18, style, willAddQuotes }) {
    const globalStyles = getGlobalStyles(fontSize);
    const _style = style ? { ...globalStyles.main, ...style } : globalStyles.main

    return (
        <Text style={_style}>
            {willAddQuotes ? `"${txt}"` : txt}
        </Text>
    )
}


export function HeadingTxt({ children: txt, fontSize = 20, style, willAddQuotes }) {
    const globalStyles = getGlobalStyles(fontSize);
    const _style = style ? { ...globalStyles.main, ...style } : globalStyles.main

    return (
        <Text style={_style}>
            {willAddQuotes ? `"${txt}"` : txt}
        </Text>
    )
}





