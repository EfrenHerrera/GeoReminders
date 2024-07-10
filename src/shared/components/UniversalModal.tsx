//================================================
// IMPORT DEPENDENCIES 
//================================================
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Modal, { Direction } from 'react-native-modal';
import { View, ViewStyle } from 'react-native';
import Constants from 'expo-constants'

type animationIn = "bounce" | "flash" | "jello" | "pulse" | "rotate" | "rubberBand" | "shake" | "swing" | "tada" | "wobble" | "bounceIn" | "bounceInDown" | "bounceInUp" | "bounceInLeft" | "bounceInRight" | "bounceOut" | "bounceOutDown" | "bounceOutUp" | "bounceOutLeft" | "bounceOutRight" | "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInUp" | "fadeInUpBig" | "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" | "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutUp" | "fadeOutUpBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" | "fadeOutRightBig" | "flipInX" | "flipInY" | "flipOutX" | "flipOutY" | "lightSpeedIn" | "lightSpeedOut" | "slideInDown" | "slideInUp" | "slideInLeft" | "slideInRight" | "slideOutDown" | "slideOutUp" | "slideOutLeft" | "slideOutRight" | "zoomIn" | "zoomInDown" | "zoomInUp" | "zoomInLeft" | "zoomInRight" | "zoomOut" | "zoomOutDown" | "zoomOutUp" | "zoomOutLeft" | "zoomOutRight";
interface Props {
    children: React.ReactNode;
    visible: boolean;
    animationIn?: animationIn;
    animationOut?: animationIn;
    onClose: () => void;
    orientation?: 'center' | Direction;
    withSwipe?: boolean;
    withBackdrop?: boolean;
    backdropTransparent?: boolean;
    transparent?: boolean;
    style?: ViewStyle;
    styleCard?: ViewStyle;
    scrollTo?: (e: any) => void;
    scrollOffset?: number;
    scrollOffsetMax?: number;
    propagateSwipe?: boolean;
}

interface Animations {
    in: animationIn;
    out: animationIn;
}


const UniversalModal: React.FC<Props> = (props) => {
    const { 
        children, visible, onClose, orientation = "center", 
        animationIn = "bounceIn", animationOut = "bounceOut",
        withSwipe = false, withBackdrop = false, style = {}, 
        transparent = false, backdropTransparent = false, styleCard = {},
        scrollTo, scrollOffset, scrollOffsetMax, propagateSwipe = false
    } = props

    const [stylesModal, setStylesModal] = React.useState<ViewStyle>({})
    const [stylesCard, setStylesCard] = React.useState<ViewStyle>(styleCard)
    const [animations, setAnimation] = React.useState<Animations>({ in: animationIn, out: animationOut })

    useEffect(() => {
        let styleModal: ViewStyle = {}
        let styleCard: ViewStyle = {}
        let animationIn: animationIn = animations.in
        let animationOut: animationIn = animations.out
        
        switch (orientation) {
            case 'left':
                styleModal = {
                    flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 0, marginRight: 0
                }
                styleCard = {
                    paddingHorizontal: 16, paddingTop: Constants.statusBarHeight, ...stylesCard
                }
                animationIn = "slideInLeft";
                animationOut = "slideOutLeft";
                break;

            case 'right':
                styleModal = {
                    flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 0, marginRight: 0
                }
                styleCard = {
                    paddingHorizontal: 16, paddingTop: Constants.statusBarHeight, ...stylesCard
                }
                animationIn = "slideInRight";
                animationOut = "slideOutRight";
                break;

            case 'down':
                styleModal = {
                    justifyContent: 'flex-end', margin: 0,
                };
                styleCard = {
                    borderTopLeftRadius: 16, borderTopRightRadius: 16,
                    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32, ...stylesCard
                };
                animationIn = "slideInUp"
                animationOut = "slideOutDown"
                break;

            case 'up':
                styleModal = {
                    justifyContent: 'flex-start', margin: 0,
                };
                styleCard = {
                    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
                    paddingHorizontal: 24, paddingTop: Constants.statusBarHeight, paddingBottom: 16, ...stylesCard
                }
                break;

            case 'center':
                styleModal = {
                    marginHorizontal: 20
                };
                styleCard = {
                    borderRadius: 8,
                    paddingHorizontal: 24, paddingVertical: 16, 
                    ...stylesCard
                };
                animationIn = "pulse"
                animationOut = "fadeOut"
                break;

            default:
                break;
        }

        setStylesModal(styleModal)
        setStylesCard(styleCard)
        setAnimation({ in: animationIn, out: animationOut })
    }, [])
    return (
        <Modal
        swipeDirection={[withSwipe ? (orientation === 'center' ? null : orientation) : null ]}
        onSwipeComplete={onClose}
        isVisible={visible} animationInTiming={600} animationOutTiming={600} 
        style={[stylesModal, style]}
        animationIn={animations.in} animationOut={animations.out}
        onBackdropPress={withBackdrop ? onClose : null}
        backdropColor={backdropTransparent ? "#00000000" : "#00000080"}
        scrollTo={scrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={scrollOffsetMax}
        propagateSwipe={propagateSwipe}
        >
            <View style={{ ...stylesCard, backgroundColor: transparent ? "#00000000" : "#FFFFFF", }}>
                {/* {
                    orientation === "down" &&
                    <View style={{ width: 50, height: 5, backgroundColor: "#CCC", borderRadius: 5, position: 'absolute', top: 10, left: (width - 50) / 2 }}></View>
                } */}
                {children}
            </View>
        </Modal>
    )
}

//================================================
// PROPTYPES
//================================================
UniversalModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default UniversalModal