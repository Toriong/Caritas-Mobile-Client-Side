import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from 'react-native';
import Modal from "react-native-modal";
import { BTN_TXT_LIGHT_COLOR, GLOBAL_ELEMENT_SHADOW_STYLES, EMOJI_SKIN_COLOR_DEFAULT, THUMBS_DOWN_PRESSED_COLOR, BLUE_PRIMARY_COLOR } from '../../../global-styles/globalStyles';
import { HeadingTxt, PTxt } from '../../customTxts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowAltCircleRight, faArrowAltCircleLeft, faHeart, faThumbsDown, faMeh, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import FadeUpAndOut from '../../Animations/FadeUpAndOut';
import HeartAnimation from '../../Animations/HeartAnimation';
import Glow from '../../Animations/Glow';
import { getAnimSequenceArr } from '../../../helperFns/components';
import FadeInView from '../../Animations/FadeIn';


const USER_INTERACTION_ICON_SIZE = 25;
const NAV_BUTTON_COLOR = '#64AFFF'
const BACKGROUND_COLOR_BTN = 'white'

function getQuestionToDisplayAndItsIndex(questions, questionId, numToAddToIndex = 1) {
    const index = questions.findIndex(({ id: _questionId }) => questionId === _questionId) + numToAddToIndex;

    return { question: questions[index], index };
}


function GetToKnowUserModal({ states, fns }) {
    const { _isModalOn, _qIdOfLikedAns, _questions } = states;
    const { setIsWantToMatchWithUserModalOn, setWillRevealRestOfPic } = fns;
    const [isModalOn, setIsModalOn] = _isModalOn;
    const [qIdOfLikedAns, setQIdOfLikedAns] = _qIdOfLikedAns;
    const [questions, setQuestions] = _questions;
    const [willFadeOutShowAnswerBtn, setWillFadeOutShowAnswerBtn] = useState(false);
    const { question, answer, isCurrent, id } = questions.find(({ isCurrent }) => isCurrent) ?? questions[0]
    const { isLiked, isNeutral, isDisliked, txt: answerTxt, isNoResponse, isStory } = answer;
    const [willShowAnswer, setWillShowAnswer] = useState(false);
    const [willFadeInThumbsDownBtn, setWillFadeInThumbsDownBtn] = useState(true);
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [willFadeOutAnsUI, setWillFadeOutAnsUI] = useState(false)
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
    const [isAnswerTxtLayoutScrollable, setIsAnswerTxtLayoutScrollable] = useState(true);
    const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
    const [willFadeShowAnswerBtnIn, setWillFadeShowAnswerBtnIn] = useState(true);
    const [willFadeInLoadingScreen, setWillFadeInLoadingScreen] = useState(true)
    const [willFadeInAnswersUI, setWillFadeInAnswersUI] = useState(false);
    const [willFadeOutThumbsDownBtn, setWillFadeOutThumbsDownBtn] = useState(false);
    const [emojiThumbsDownColor, setEmojiThumbsDownColor] = useState(isDisliked ? THUMBS_DOWN_PRESSED_COLOR : EMOJI_SKIN_COLOR_DEFAULT);
    const [willFadeInMehIconBtn, setWillFadeInMehIconBtn] = useState(true);
    const [willShowLoadingScreen, setWillShowLoadingScreen] = useState(false)
    const [willFadeInHeartBtn, setWillFadeInHeartBtn] = useState(true);
    const [willFadeOutHeartBtn, setWillFadeOutHeartBtn] = useState(false);
    const [willFadeOutMehIconBtn, setWillFadeOutMehIconBtn] = useState(false);
    const [scrollViewLayoutHeight, setScrollViewLayoutHeight] = useState(0)
    const [scrollViewChildHeight, setScrollViewChildHeight] = useState(0);
    const [willShowArrowDown, setWillShowArrowDown] = useState(false);
    const [willFadeInArrowDown, setWillFadeInArrowDown] = useState(true);
    const [willFadeOutArrowDown, setWillFadeOutArrowDown] = useState(false);
    const [showAnsBtnDisplayVal, setShowAnsBtnDisplayVal] = useState('flex')
    const _willFadeInMehIconBtn = [willFadeInMehIconBtn, setWillFadeInMehIconBtn];
    const _willFadeInThumbsDownBtn = [willFadeInThumbsDownBtn, setWillFadeInThumbsDownBtn];
    const _willFadeInHeartBtn = [willFadeInHeartBtn, setWillFadeInHeartBtn];
    const _willFadeInAnswersUI = [willFadeInAnswersUI, setWillFadeInAnswersUI];
    const _willFadeShowAnswerBtnIn = [willFadeShowAnswerBtnIn, setWillFadeShowAnswerBtnIn]
    const animSeqenceArr = getAnimSequenceArr();



    function handleOnModalShow() {
        if (isLiked || isDisliked || isNeutral) {
            setWillShowAnswer(true)
            isLiked && setIsHeartClicked(true);
            isDisliked && setWillFadeInThumbsDownBtn(true);
            isNeutral && setWillFadeInMehIconBtn(true);
            setWillFadeInAnswersUI(true);
        }

        const index = questions.findIndex(({ id: questionId }) => questionId === id);
        (index === 0) ? setIsBackBtnDisabled(true) : setIsBackBtnDisabled(false);
        isNoResponse && setWillFadeShowAnswerBtnIn(true);
        !isNoResponse ? setIsNextBtnDisabled(false) : setIsNextBtnDisabled(true);
    }

    function updateReactionBtnsFadeInStates(willFadeInBtn) {
        setWillFadeInMehIconBtn(willFadeInBtn);
        setWillFadeInHeartBtn(willFadeInBtn);
        setWillFadeInThumbsDownBtn(willFadeInBtn);
    }

    function revealAnswer() {
        setWillFadeOutShowAnswerBtn(true)
        updateReactionBtnsFadeInStates(false)

        setTimeout(() => {
            setWillShowLoadingScreen(true);
            setShowAnsBtnDisplayVal('none')
        }, 1050);

        setTimeout(() => {
            updateReactionBtnsFadeInStates(true)
            setWillFadeInAnswersUI(true)
        }, 500)
    }

    const [willResetStates, setWillResetStates] = useState(false)

    function handleClosingModal() {
        setIsModalOn(false);
        setWillResetStates(true);
    }

    const [wasLikedBtnClicked, setWasLikedBtnClicked] = useState(false);

    useEffect(() => {
        if (willResetStates) {
            setTimeout(() => {
                setWillShowLoadingScreen(false);
                setWillFadeInLoadingScreen(true);
                setWillFadeOutShowAnswerBtn(false)
                setWillFadeOutThumbsDownBtn(false);
                setWillFadeShowAnswerBtnIn(false);
                setWillShowArrowDown(false);
                setWillFadeInArrowDown(true)
                setWillFadeOutArrowDown(false);
                setWillShowAnswer(false);
                setWillFadeInAnswersUI(false);
                !wasLikedBtnClicked && setShowAnsBtnDisplayVal('flex');

                !isCurrent && setWillShowAnswer(false);

                setQuestions(questions => questions.map(question => (question.id === id) ? { ...question, isCurrent: true } : { ...question, isCurrent: false }));
            }, 150)
            setWillResetStates(false)
        }
    }, [willResetStates])

    function handleHeartBtnPress() {
        // GOAL: if the user is at the last question of the questions array, and the user liked the previous answers, then show the rest of the picture to the user

        // MAIN GOAL: the rest of the picture is revealed to the user
        // all of the picture is revealed to the user
        // the ids of the boxes that are still covered up is attained
        // get all of the ids of the boxes that are still covered up 
        // the prop: willRevealRestOfPic is true

        // CASE: the user is at the last question of the questions array, and the user liked the previous answers
        // GOAL: set the state of willRevealRestOfPic to true

        // get the index of the current question and check if it is the last question of the questions array
        const isLastQuestion = id === questions[questions.length - 1].id;
        const wereAllPrevAnswersLiked = isLastQuestion ? questions.filter((_, index) => (index !== (questions.length - 1))).every(({ answer }) => answer.isLiked) : false;
        (isLastQuestion && wereAllPrevAnswersLiked) && setWillRevealRestOfPic(true);
        setIsModalOn(false);
        setQIdOfLikedAns(id);
        setWasLikedBtnClicked(true);
    }


    function resetUserResponsesStates() {
        updateReactionBtnsFadeInStates(false)
        setWillFadeOutThumbsDownBtn(false);
        setWillFadeOutHeartBtn(false);
        setWillFadeOutMehIconBtn(false);
    }

    function updateAnswerUiStates(bool) {
        setWillFadeOutAnsUI(bool);
        setWillFadeInAnswersUI(bool);
        setWillShowAnswer(bool);
        !bool && setEmojiThumbsDownColor(EMOJI_SKIN_COLOR_DEFAULT)
    }

    function resetAnswerUIStates() {
        setIsNextBtnDisabled(false);
        updateAnswerUiStates(false)
        resetUserResponsesStates();
    }

    function showAnswerAndUserReactionWithDelay(userResponses = {}) {
        const { isDisliked, isNeutral } = userResponses;

        setTimeout(() => {
            setWillShowAnswer(true);

            if (isDisliked) {
                setWillFadeInThumbsDownBtn(true);
                setEmojiThumbsDownColor(THUMBS_DOWN_PRESSED_COLOR);
            }

            isNeutral && setWillFadeInMehIconBtn(true);

            setTimeout(() => {
                setWillFadeInAnswersUI(true);
            }, 200)
        }, 200);
    }

    function updateQuestionsState(targetIndex) {
        setQuestions(questions => questions.map((question, index) => {
            if (index === targetIndex) {
                return { ...question, isCurrent: true };
            }

            return { ...question, isCurrent: false };
        }))
    }

    function handleMehBtnClick() {
        setWillFadeOutHeartBtn(true);
        setWillFadeOutThumbsDownBtn(true);
        setTimeout(() => {
            setQuestions(questions => questions.map(question => {
                if (question.id === id) {
                    return { ...question, answer: { ...question.answer, isNoResponse: false, isNeutral: true } }
                }

                return question;
            }))

            setTimeout(() => {
                setIsNextBtnDisabled(false);
            }, 300)
        }, 500)

    }

    function handleThumbsDownTouch() {
        setWillFadeOutHeartBtn(true);
        setWillFadeOutMehIconBtn(true);
        setTimeout(() => {
            setWillFadeOutThumbsDownBtn(true);
            setTimeout(() => {
                setQuestions(questions => questions.map(question => {
                    if (question.id === id) {
                        return { ...question, answer: { ...question.answer, isNoResponse: false, isDisliked: true } }
                    }

                    return question;
                }));
                setEmojiThumbsDownColor(THUMBS_DOWN_PRESSED_COLOR)
                setWillFadeInThumbsDownBtn(true);
                const isAtLastQuestion = getQuestionToDisplayAndItsIndex(questions, id).index === (questions.length - 1);
                isAtLastQuestion ? setIsNextBtnDisabled(true) : setIsNextBtnDisabled(false);
            }, 700)
        }, 500)
    }

    function handleBackBtnClick() {
        resetAnswerUIStates();
        const { question: targetQAndA, index: indexOfTargetQ } = getQuestionToDisplayAndItsIndex(questions, id, -1);
        setShowAnsBtnDisplayVal('none')
        updateQuestionsState(indexOfTargetQ);
        showAnswerAndUserReactionWithDelay(targetQAndA.answer);
        setWillFadeOutArrowDown(false);
        setWillFadeOutShowAnswerBtn(true);
        setWillFadeOutArrowDown(false);
        setWillFadeInArrowDown(true);
        setWillShowArrowDown(false);
    }

    function handleNextBtnClick() {
        const { question: nextQuestion, index: nextQuestionIndex } = getQuestionToDisplayAndItsIndex(questions, id);
        setIsBackBtnDisabled(false);
        setWillFadeOutShowAnswerBtn(false);
        resetAnswerUIStates();

        if (nextQuestion.answer.isNoResponse) {
            setShowAnsBtnDisplayVal('flex')
            setWillShowAnswer(false);
            setTimeout(() => {
                setWillFadeShowAnswerBtnIn(true);
            }, 300)
            setIsNextBtnDisabled(true);
            updateQuestionsState(nextQuestionIndex);
            return;
        }

        nextQuestion.isStory && setShowAnsBtnDisplayVal('none')
        showAnswerAndUserReactionWithDelay(nextQuestion.answer);
        updateQuestionsState(nextQuestionIndex);
    }

    useLayoutEffect(() => {
        if (willFadeOutShowAnswerBtn && !willShowAnswer) {
            setTimeout(() => {
                setWillShowAnswer(true)
            }, 750)
        }
    }, [willFadeOutShowAnswerBtn])

    useLayoutEffect(() => {
        setIsNextBtnDisabled(true);
    }, [])

    const isOnLastQ = (questions[questions.length - 1].id === id);
    const isOnFirstQ = (questions[0].id === id);
    const currentQPosNum = questions.findIndex(({ id: questionId }) => questionId === id) + 1;

    const [wasIsWantToMatchWithUserModalOn, setWasIsWantToMatchWithuserModalOn] = useState(false);

    useEffect(() => {
        if (isOnLastQ && (isLiked || isDisliked || isNeutral) && !wasIsWantToMatchWithUserModalOn && isModalOn) {
            setTimeout(() => {
                setIsWantToMatchWithUserModalOn(true);
            }, 500)
            setWasIsWantToMatchWithuserModalOn(true);
        }
    }, [questions, isModalOn])

    function handleOnScroll() {
        if (willShowArrowDown) {
            setWillFadeOutArrowDown(true);
            setTimeout(() => {
                setWillShowArrowDown(false);
            }, 500)
        }
    }

    function handleScrollViewLayout(event) {
        setScrollViewLayoutHeight(event.nativeEvent.layout.height);
    }

    function handleScrollViewChildLayout(event) {
        setScrollViewChildHeight(event.nativeEvent.layout.height)
    }

    function resetScrollViewHeights() {
        setScrollViewChildHeight(0);
        setScrollViewLayoutHeight(0);
    }

    useEffect(() => {
        if (scrollViewChildHeight && scrollViewLayoutHeight && (scrollViewChildHeight > scrollViewLayoutHeight)) {
            setWillShowArrowDown(true);
            resetScrollViewHeights();
        }

        if (scrollViewChildHeight && scrollViewLayoutHeight && !(scrollViewChildHeight > scrollViewLayoutHeight)) {
            resetScrollViewHeights()
        }

    }, [scrollViewChildHeight, scrollViewLayoutHeight])

    return (
        <Modal onModalShow={handleOnModalShow} onModalHide={handleClosingModal} isVisible={isModalOn} useNativeDriver hideModalContentWhileAnimating={true} animationOut="slideOutDown" onBackdropPress={handleClosingModal} style={style.main}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, height: "99%", width: "100%" }}>
                <View style={{ width: "100%", flex: .3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <HeadingTxt fontSize={19}>Questions/Answers and Stories</HeadingTxt>
                    <Image style={{ ...images.image, marginStart: 2, transform: [{ translateY: 2 }] }} source={require('../../../assets/thinking-emoji.png')} />
                </View>
                <View style={{ ...viewStylesCommon.main, flex: .5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PTxt style={{ textAlign: 'center', fontStyle: 'italic' }}>{question}</PTxt>
                </View>
                <View style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {(<FadeUpAndOut delayMs={500} willFadeOut={willFadeOutShowAnswerBtn} dynamicStyles={{ ...viewStylesCommon.main, display: showAnsBtnDisplayVal }} _willFadeIn={_willFadeShowAnswerBtnIn}>
                        <TouchableOpacity onPress={revealAnswer} style={{ ...GLOBAL_ELEMENT_SHADOW_STYLES.main, opacity: isNoResponse ? 1 : 0, backgroundColor: BACKGROUND_COLOR_BTN, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: 15, borderRadius: 50 }}>
                            <PTxt style={{ color: BTN_TXT_LIGHT_COLOR }}>
                                Show Answer
                            </PTxt>
                            <PTxt>
                                😊
                            </PTxt>
                        </TouchableOpacity>
                    </FadeUpAndOut>)}
                    {willShowAnswer && (
                        <View style={{ width: "100%" }}>
                            <FadeUpAndOut willFadeOut={willFadeOutAnsUI} delayMs={500} dynamicStyles={{ position: 'relative', height: "83%" }} _willFadeIn={_willFadeInAnswersUI}>
                                <ScrollView onScroll={handleOnScroll} onLayout={handleScrollViewLayout} style={{ transform: [{ translateY: 10 }], position: 'relative' }}>
                                    <View onLayout={handleScrollViewChildLayout} style={{ ...viewStylesCommon.main, width: "100%" }} >
                                        <PTxt style={{ textAlign: 'center', fontStyle: 'italic' }}>{`"${answerTxt}"`}</PTxt>
                                    </View>
                                    {willShowArrowDown && <View style={{ height: "100%", width: "100%", position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <FadeUpAndOut _willFadeIn={[willFadeInArrowDown, setWillFadeInArrowDown]} willFadeOut={willFadeOutArrowDown}>
                                            <FadeInView delayMs={1100}>
                                                <View style={{ ...GLOBAL_ELEMENT_SHADOW_STYLES.main, width: 68, height: 68, borderRadius: 34, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Glow intervalTime={1000} animSeqenceArr={animSeqenceArr} dynamicStyles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                                        <FontAwesomeIcon icon={faArrowDown} size={35} style={{ color: BLUE_PRIMARY_COLOR }} />
                                                    </Glow>
                                                </View>
                                            </FadeInView>
                                        </FadeUpAndOut>
                                    </View>}
                                </ScrollView>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <View style={{ borderBottomColor: 'grey', position: 'absolute', width: '100%', borderBottomWidth: .5, transform: [{ translateY: 10 }] }} />
                                </View>
                            </FadeUpAndOut>
                            <FadeUpAndOut dynamicStyles={{ ...viewStylesCommon.main }} willFadeOut={willFadeOutAnsUI} _willFadeIn={_willFadeInAnswersUI} delayMs={500} endTranslateNum={-20}>
                                <View style={{ position: 'relative', flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: [{ translateY: 40 }] }}>
                                    {(isNoResponse || isDisliked) && (
                                        <FadeUpAndOut dynamicStyles={GLOBAL_ELEMENT_SHADOW_STYLES.main} willFadeOut={willFadeOutThumbsDownBtn} _willFadeIn={_willFadeInThumbsDownBtn}>
                                            <TouchableOpacity style={{ ...userResponsesBtnStyles.main, ...GLOBAL_ELEMENT_SHADOW_STYLES.main, backgroundColor: BACKGROUND_COLOR_BTN }} onPress={handleThumbsDownTouch}>
                                                <PTxt>
                                                    <FontAwesomeIcon icon={faThumbsDown} size={USER_INTERACTION_ICON_SIZE} style={{ color: emojiThumbsDownColor, ...userInteractionIconStyles.main }} />
                                                </PTxt>
                                            </TouchableOpacity>
                                        </FadeUpAndOut>
                                    )}
                                    {(isNoResponse || isNeutral) && (
                                        <FadeUpAndOut willFadeOut={willFadeOutMehIconBtn} _willFadeIn={_willFadeInMehIconBtn}>
                                            <TouchableOpacity onPress={handleMehBtnClick} style={{ ...userResponsesBtnStyles.main, ...GLOBAL_ELEMENT_SHADOW_STYLES.main, backgroundColor: BACKGROUND_COLOR_BTN, marginLeft: 15, marginRight: 15 }}>
                                                <PTxt>
                                                    <FontAwesomeIcon icon={faMeh} color={EMOJI_SKIN_COLOR_DEFAULT} size={USER_INTERACTION_ICON_SIZE} style={{ color: EMOJI_SKIN_COLOR_DEFAULT, ...userInteractionIconStyles.main }} />
                                                </PTxt>
                                            </TouchableOpacity>
                                        </FadeUpAndOut>
                                    )}
                                    {(isNoResponse || isLiked) && (
                                        isNoResponse ?
                                            <FadeUpAndOut willFadeOut={willFadeOutHeartBtn} _willFadeIn={_willFadeInHeartBtn} dynamicStyles={GLOBAL_ELEMENT_SHADOW_STYLES.main}>
                                                <TouchableOpacity onPress={handleHeartBtnPress} style={{ ...userResponsesBtnStyles.main, ...GLOBAL_ELEMENT_SHADOW_STYLES.main, backgroundColor: BACKGROUND_COLOR_BTN }}>
                                                    <PTxt style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <FontAwesomeIcon icon={faHeart} color={BTN_TXT_LIGHT_COLOR} size={USER_INTERACTION_ICON_SIZE} style={{ color: BTN_TXT_LIGHT_COLOR, ...userInteractionIconStyles.main }} />
                                                    </PTxt>
                                                </TouchableOpacity>
                                            </FadeUpAndOut>
                                            :
                                            <HeartAnimation />
                                    )}
                                </View>
                            </FadeUpAndOut>
                        </View>
                    )}
                </View>
                <View style={{ flex: .6, flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', transform: [{ translateY: 25 }], alignItems: 'center', alignContent: 'center', width: '100%' }}>
                        <TouchableOpacity disabled={isOnFirstQ || isBackBtnDisabled} onPress={handleBackBtnClick}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} size={40} style={{ color: NAV_BUTTON_COLOR, marginRight: 7, opacity: (isOnFirstQ || isBackBtnDisabled) ? .3 : .9 }} />
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isOnLastQ || isNextBtnDisabled} onPress={handleNextBtnClick}>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} size={40} style={{ color: NAV_BUTTON_COLOR, marginLeft: 7, opacity: (isOnLastQ || isNextBtnDisabled) ? .3 : .9 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PTxt style={{ textAlign: 'center' }}>{`${currentQPosNum}/${questions.length}`}</PTxt>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const btnCss = {
    width: 55,
    height: 55,
    borderRadius: 50,
}
const dynamicStylesChangeColor = StyleSheet.create({ main: { ...btnCss } })
const userResponsesBtnStyles = StyleSheet.create({
    main: {
        ...GLOBAL_ELEMENT_SHADOW_STYLES.main,
        ...btnCss,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
})
const userInteractionIconStyles = StyleSheet.create({
    main: {
        transform: [{ translateY: 2 }]
    }
})
const style = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
})
const viewStylesCommon = StyleSheet.create({
    main: {
        paddingLeft: 40,
        paddingRight: 40
    }
})
const images = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        aspectRatio: 1,
        width: 20,
        height: 20
    },
});

export default GetToKnowUserModal;
