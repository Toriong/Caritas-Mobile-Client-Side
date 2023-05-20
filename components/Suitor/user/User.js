import { useEffect, useState } from "react";
import { Animated, PanResponder, StyleSheet, View, Image, Platform } from "react-native";
import Swipe from "../../Animations/Swipe";
import ImageHideBlock from "../ImageHideBlock";

function getRandomVals(arr, num) {
    const result = [];

    new Array(num).fill(0).forEach(() => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomValue = arr[randomIndex];

        if (!result.includes(randomValue)) {
            result.push(randomValue);
        }
    });

    return result;
};

function getBoxesIntToFadeOut(totalBoxesInt, totalQuestionsInt) {
    return Math.floor(totalBoxesInt / totalQuestionsInt)
}


function User({ user, setPotentialMatches, totalQuestionsInt, handleOnLayout, willRevealRestOfPic }) {
    const { imgPath, top: cssTopNum, willRevealPic, id } = user;
    const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
    const [boxes, setBoxes] = useState([]);
    const [boxesToFadeOutInt, setBoxesToFadeOutInt] = useState(10)
    const [willGetBoxesNumToFadeOut, setWillGetBoxesNumToFadeOut] = useState(false)
    const [position, setPosition] = useState(new Animated.ValueXY());
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            setPosition({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (event, gestureState) => {
        }
    });


    function handleLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        setViewDimensions({ width, height });
    };


    useEffect(() => {
        if (willRevealPic) {
            const unfadedOutBoxes = boxes.filter(box => !box.willFadeOut);
            const boxesToFadeOutIds = willRevealRestOfPic ? unfadedOutBoxes.map(({ id }) => id) : getRandomVals(unfadedOutBoxes, boxesToFadeOutInt).map(box => box.id);
            setBoxes(boxes => boxes.map(box => {
                if (boxesToFadeOutIds.includes(box.id)) {
                    return { ...box, willFadeOut: true }
                }

                return box;
            }));
            setPotentialMatches(matches => matches.map(match => {
                if (match.id === id) {
                    return { ...match, willRevealPic: false }
                }

                return match
            }));
        }
    }, [willRevealPic])




    useEffect(() => {
        const { width, height } = viewDimensions;
        if ((width > 0) && (height > 0)) {
            const smallerDimension = Math.min(width, height);
            const boxSize = smallerDimension / 5;
            const rows = Math.ceil(height / boxSize);
            const cols = Math.ceil(width / boxSize);
            const totalBoxes = rows * cols;
            const newBoxes = [];

            for (let index = 0; index < totalBoxes; index++) {
                const boxTop = Math.floor(index / cols) * boxSize;
                const boxLeft = (index % cols) * boxSize;
                newBoxes.push({
                    id: index,
                    top: boxTop,
                    left: boxLeft,
                    size: boxSize,
                    willFadeOut: false

                });
            }
            const _boxesToFadeOutInt = getBoxesIntToFadeOut(totalBoxes, totalQuestionsInt);
            console.log('_boxesToFadeOutInt: ', _boxesToFadeOutInt)
            setBoxesToFadeOutInt(_boxesToFadeOutInt)
            setWillGetBoxesNumToFadeOut(true);
            setBoxes(newBoxes);
        }
    }, [viewDimensions]);

    // useEffect(() => {
    //     if(willGetBoxesNumToFadeOut && boxes.length){
    //         setBoxesToFadeOutInt(getBoxesIntToFadeOut(boxes, totalQuestionsInt))
    //         setWillGetBoxesNumToFadeOut(false)
    //     };
    // }, [boxes])

    useEffect(() => {
        console.log('boxesToFadeOutInt: ', boxesToFadeOutInt)
    })

    // get the height of modal when this comp is render

    return (
        <View style={styles.container} onLayout={handleOnLayout}>
            <View style={{ ...styles.card, height: '100%', flex: .95, borderRadius: 10, top: cssTopNum, overflow: 'hidden', }}>
                <View style={{ position: 'relative', flex: .7, borderTopEndRadius: 10, borderTopStartRadius: 10, height: '100%', overflow: 'hidden' }} onLayout={handleLayout}>
                    <Image style={{ ...styles.image }} source={imgPath} />
                    <View style={{ borderWidth: 2, borderBottomColor: '#dee2e6', position: 'absolute' }} />
                    {boxes.map(box => <ImageHideBlock key={box.id} box={box} />)}
                </View>
            </View>
        </View>
    )
}

const maxParentDimensions = {
    width: '100%',
    height: '100%',
}
const styles = StyleSheet.create({
    container: {
        ...maxParentDimensions,
        flex: 8,
        position: "relative",
        padding: 20,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#dee2e6',
        elevation: Platform.OS === 'android' ? 5 : 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        position: 'absolute',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})

export default User;