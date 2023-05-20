import { useEffect, useState } from "react";
import { Animated, PanResponder, StyleSheet, View, Image, Platform } from "react-native";
import ImageHideBlock from "../ImageHideBlock";



// all of the left boxes: [0, 5, 10, 15, 20]
// bottom of the picture: [25, 26, 27, 28, 29]
// right of the picture: [4, 9, 14, 19, 24] 
// top of the picture: [0, 1, 2, 3, 4]

// 1st inner right: [18, 23, 13]
// 1st inner bottom: [21, 22, 23]
// 1st left of the picture: [16, 11, 21] 
// 1st top of the picture: [6,7,8]

// last blocks to reveal: [22, 23]

// const dataArray = [
//     { boxIdsToFade: [0, 1, 2, 3, 4], wasFadedOut: false }, first outer row boxes
//     { boxIdsToFade: [5, 10, 15, 20], wasFadedOut: false }, first
//     { boxIdsToFade: [25, 26, 27, 28, 29], wasFadedOut: false },
//     { boxIdsToFade: [4, 9, 14, 19, 24], wasFadedOut: false },
//     { boxIdsToFade: [6, 7, 8], wasFadedOut: false },
//     { boxIdsToFade: [16, 11, 21], wasFadedOut: false },
//     { boxIdsToFade: [22, 23], wasFadedOut: false },
//     { boxIdsToFade: [18, 13], wasFadedOut: false },
//     { boxIdsToFade: [22, 23], wasFadedOut: false }
//   ];


const BOXES_NOT_TO_FADE_OUT = [6, 7, 8, 11, 12, 13, 18, 17, 16];



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
    const [lastBoxesToFadeOut, setLastBoxesToFadeOut] = useState([{ id: 1, wasFadedOut: false, boxIds: [{ id: 25 }, { id: 26 }] }, { id: 2, wasFadedOut: false, boxIds: [{ id: 27 }] }, { id: 3, wasFadedOut: false, boxIds: [{ id: 28 }] }, { id: 4, wasFadedOut: false, boxIds: [{ id: 29 }] }])
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
            const unfadedOutBoxes = boxes.filter(box => !BOXES_NOT_TO_FADE_OUT.includes(box.id)).filter(box => !box.willFadeOut);
            let boxesToFadeOut = getRandomVals(unfadedOutBoxes, boxesToFadeOutInt)

            if (!boxesToFadeOut[0]) {
                console.log('fuck you')
                // GOAL: go through each of the elements in lastBoxesToFadeout array
                const { boxIds, id } = lastBoxesToFadeOut.find(({ wasFadedOut }) => !wasFadedOut);
                boxesToFadeOut = boxIds;
                setLastBoxesToFadeOut(box => {
                    if (box.id === id) {
                        return { ...box, wasFadedOut: true }
                    }
                    return box;
                })

            };

            let boxesToFadeOutIds = boxesToFadeOut.map(({ id }) => id);

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
            console.log('boxSize: ', boxSize)

            for (let index = 0; index < totalBoxes; index++) {
                const boxTop = Math.floor(index / cols) * boxSize;
                const boxLeft = (index % cols) * boxSize;
                newBoxes.push({
                    id: index,
                    top: boxTop,
                    left: boxLeft,
                    willFadeOut: false

                });
            }
            const _boxesToFadeOutInt = getBoxesIntToFadeOut(totalBoxes, totalQuestionsInt);
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
        top: '-10%'
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