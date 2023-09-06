import { BlurView } from "@react-native-community/blur";
import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { AppColors } from "../styles/AppColors";
import { Styles } from "../styles/Styles";
import Button from "./Button";

export default function Popup({ showPopup, title, text, firstBtnText, secondBtnText, firstBtnTextColor, firstOnPress, secondOnPress, btnText, onPressBtn }) {
    return <Modal transparent={true} visible={showPopup} statusBarTranslucent={true}  >
        {showPopup && <View style={styles.container}>
            <BlurView style={styles.blurView} blurType="dark" blurAmount={1} />
            <View style={styles.popupContainer}>
                <Text style={[styles.title, !text && { margin: 20 }, Styles.blackSemiBold18]}>{title}</Text>
                {text && <Text style={[styles.text, Styles.blackRegular13]}>{text}</Text>}

                {btnText ?
                    <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
                        <Text style={[Styles.blackSemiBold18, { color: AppColors.GREEN_COLOR }]}>{btnText}</Text>
                    </TouchableOpacity>
                    : <View style={[Styles.flexRowJustifyBetween, { borderTopWidth: 2, borderColor: AppColors.WHITE_SMOKE_COLOR }]}>
                        <TouchableOpacity style={styles.button} onPress={firstOnPress}>
                            <Text style={[Styles.blackSemiBold18, { color: firstBtnTextColor ? firstBtnTextColor : AppColors.GREEN_COLOR }]}>{firstBtnText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={secondOnPress}>
                            <Text style={Styles.blackSemiBold18}>{secondBtnText}</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>}
    </Modal>

}

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    btn: {
        height: 55,
        borderTopWidth: 2,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupContainer: {
        top: '40%',
        backgroundColor: AppColors.WHITE_COLOR,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        zIndex: 999999999,
    },
    text: {
        paddingHorizontal: 30,
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        height: 55,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
