import { LinearGradient } from 'expo-linear-gradient';
import { View, Animated, SafeAreaView, Platform, StyleSheet, Image, PanResponder, Dimensions, Text } from "react-native";
import { useEffect, useRef, useState } from 'react';
import QuestionBtn from '../components/Suitor/button/Question';
import GetToKnowUserModal from '../components/Suitor/modal/GetToKnowUserModal';
import questions from '../testing-data/questions.json';
import Swiper from 'react-native-deck-swiper'
import User from '../components/Suitor/user/User';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faThumbsDown, faCancel } from '@fortawesome/free-solid-svg-icons'
import { BTN_TXT_LIGHT_COLOR, EMOJI_SKIN_COLOR_DEFAULT, GLOBAL_ELEMENT_SHADOW_STYLES, PURLPLE_BTN_COLOR } from '../global-styles/globalStyles';
import { HEART_COLOR } from '../global-styles/globalStyles';
import { PTxt } from '../components/customTxts';
import FadeUp from '../components/Animations/FadeUp';
import MatchReqBtn from '../components/Suitor/button/MatchReqBtn';
import RejectBtn from '../components/Suitor/button/RejectBtn';

const { height } = Dimensions.get('window');

const TESTING_USERS = [
    {
        id: 1,
        imgPath: require('../assets/testImgs/test-img-1.jpg'),
        name: 'Emma',
        top: 0,
        willRevealPic: false,
        hobbies: ['Reading', 'Painting'],
        location: {
            city: 'Minneapolis',
            state: 'Minnesota',
            country: 'USA',
            latitude: 44.9778,
            longitude: -93.2650,
        },
    },
    {
        id: 2,
        imgPath: require('../assets/testImgs/test-img-2.jpg'),
        name: 'Olivia',
        willRevealPic: false,
        top: 10,
        hobbies: ['Photography', 'Cooking'],
        location: {
            city: 'St. Paul',
            state: 'Minnesota',
            country: 'USA',
            latitude: 44.9537,
            longitude: -93.0900,
        },
    },
    {
        id: 3,
        imgPath: require('../assets/testImgs/test-img-3.jpg'),
        name: 'Sophia',
        willRevealPic: false,
        top: 20,
        hobbies: ['Gardening', 'Yoga'],
        location: {
            city: 'Duluth',
            state: 'Minnesota',
            country: 'USA',
            latitude: 46.7867,
            longitude: -92.1005,
        },
    },
];


function Matching() {
    const [potentialMatches, setPotentialMatches] = useState(TESTING_USERS)
    const [boxes, setBoxes] = useState([]);
    const [position, setPosition] = useState(new Animated.ValueXY());
    const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
    const [willShowQsModal, setWillShowQsModal] = useState(false);
    const [userQuestions, setUserQuestions] = useState(questions.slice(0, 5));
    const [qIdOfLikedAns, setQIdOfLikedAns] = useState(false);
    const [willRevealRestOfPic, setWillRevealRestOfPic] = useState(false);
    const [isWantToMatchWithUserModalOn, setIsWantToMatchWithUserModalOn] = useState(false);
    const statesForGetToKnowUserModal = { _isWantToMatchWithUserModalOn: [isWantToMatchWithUserModalOn, setIsWantToMatchWithUserModalOn], _qIdOfLikedAns: [qIdOfLikedAns, setQIdOfLikedAns], _isModalOn: [willShowQsModal, setWillShowQsModal], _questions: [userQuestions, setUserQuestions], setPotentialMatches }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            setPosition({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (event, gestureState) => {
        }
    });

    function resetModalState() {
        setWillShowQsModal(false)
    };

    function handleLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        setViewDimensions({ width, height });
    };

    function likeAnswer(questionId) {
        setUserQuestions(userQuestions => userQuestions.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    answer: {
                        ...question.answer,
                        isLiked: true,
                        isNoResponse: false,
                        isCurrent: true
                    }
                }
            }

            return { ...question, isCurrent: false };
        }))
        setPotentialMatches(potentialMatches => potentialMatches.map(user => {
            if (user.id === potentialMatches[0].id) {
                return { ...user, willRevealPic: true }
            }

            return user
        }))
    };


    function handleOnQBtnTouch() {
        setWillShowQsModal(true)
    };

    const swiperRef = useRef(null).current
    const handleOnSwipedLeft = () => swiperRef.swipeLeft()
    const handleOnSwipedTop = () => swiperRef.swipeTop()
    const handleOnSwipedRight = () => swiperRef.swipeRight()

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

            setBoxes(newBoxes);
        }
    }, [viewDimensions]);



    useEffect(() => {
        if (qIdOfLikedAns) {
            setTimeout(() => {
                likeAnswer(qIdOfLikedAns)
                setTimeout(() => {
                    setWillShowQsModal(true)
                }, 3000)
            }, 750)
            setQIdOfLikedAns(null);
        }
    }, [qIdOfLikedAns])

    const [txtContainerHeight, setTxtContainerHeight] = useState(50);

    function handleOnLayoutUserModal(event) {
        setTxtContainerHeight(event.nativeEvent.layout.height * .2);
    }

    function handleMatchReqBtnTouch(event){

    }

    function handleRejectBtnTouch(event){

    }

    return (
        <>
            <LinearGradient
                colors={['#D9AFD9', '#97D9E1']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            >
                <SafeAreaView style={{ width: "100%", height: "100%" }}>
                    <View style={{ flex: 1, position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Swiper
                                ref={swiperRef}
                                cards={potentialMatches}
                                containerStyle={{ flex: 1, backgroundColor: 'transparent', borderWidth: 1, position: 'relative' }}
                                renderCard={potentialMatch => (
                                    <FadeUp delayMs={100} dynamicStyles={{ height: height * .8 }}>
                                        <User potentialMatches={potentialMatches} willRevealRestOfPic={willRevealRestOfPic} totalQuestionsInt={userQuestions.length} handleOnLayout={handleOnLayoutUserModal} user={potentialMatch} setPotentialMatches={setPotentialMatches} />
                                    </FadeUp>
                                )}

                                // onSwipedLeft={handleOnSwipedLeft}
                                // onSwipedRight={handleOnSwipedRight}
                                disableBottomSwipe
                                disableTopSwipe
                                animateCardOpacity
                                animateOverlayLabelsOpacity
                                overlayLabels={{
                                    left: {
                                        element: (
                                            <View style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0, height: '10%' }}>
                                                <View style={{ borderColor: 'red', backgroundColor: 'red', borderWidth: 1, height: 50, width: 125, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <PTxt style={{ color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', borderColor: BTN_TXT_LIGHT_COLOR, alignItems: 'center' }}>
                                                        NAHHH...
                                                        <FontAwesomeIcon icon={faThumbsDown} color={EMOJI_SKIN_COLOR_DEFAULT} />
                                                    </PTxt>
                                                </View>
                                            </View>
                                        ),
                                        title: 'NOPE'
                                    },
                                    right: {
                                        element: (
                                            <View style={{ display: 'flex', justifyContent: 'flex-end', height: "10%" }}>
                                                <View style={{ borderWidth: 1, height: 50, width: 125, borderRadius: 15, display: 'flex', borderColor: PURLPLE_BTN_COLOR, backgroundColor: PURLPLE_BTN_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                                                    <PTxt style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                        LIKE
                                                        <FontAwesomeIcon icon={faHeart} color={HEART_COLOR} style={{ transform: [{ translateY: 2 }, { translateX: 2 }] }} />
                                                    </PTxt>
                                                </View>
                                            </View>
                                        ),
                                        title: 'LIKE'
                                    }
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ ...btns.container, position: 'absolute', bottom: 15, width: '100%', height: (height * .15), display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                        <RejectBtn  handleOnPress={handleRejectBtnTouch} dynamicStyles={{ ...GLOBAL_ELEMENT_SHADOW_STYLES.main, backgroundColor: 'white' }} iconColor='#E8315B' icon={faCancel} />
                        <QuestionBtn handleOnPress={handleOnQBtnTouch} />
                        <MatchReqBtn handleMatchReqBtnTouch={handleMatchReqBtnTouch} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <GetToKnowUserModal states={statesForGetToKnowUserModal} username='Judy' fns={{ setPotentialMatches, setWillRevealRestOfPic }} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    nopeTxt: {
        backgroundColor: 'red',
        borderColor: 'red',
        color: 'white',
        borderRadius: 50,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 30,
        marginLeft: -30,
        width: 200,
        textAlign: 'right',
        height: 50
    },
    likeTxt: {
        backgroundColor: PURLPLE_BTN_COLOR,
        borderColor: PURLPLE_BTN_COLOR,
        color: HEART_COLOR,
        borderRadius: 50,
        width: 200,
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30,
        height: 50
    },
    superTxt: {
        backgroundColor: 'white',
        borderColor: 'gold',
        color: 'gold',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
const maxParentDimensions = {
    width: "100%",
    height: "100%",
}
const boxShadowStyles = StyleSheet.create({
    box: {
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#dee2e6',
        elevation: Platform.OS === 'android' ? 5 : 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    prop: {
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})
const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#D9AFD9',
        // backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        height: 600,
    },
});
const userContainerStyles = StyleSheet.create({
    container: {
        ...maxParentDimensions,
        flex: 8,
        position: "relative",
        padding: 20,
    }
})
const images = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        position: 'absolute',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
});
const btns = StyleSheet.create({
    container: {
        flex: 2,
    }
})

export default Matching