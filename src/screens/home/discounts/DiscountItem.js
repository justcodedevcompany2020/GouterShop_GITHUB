import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { url } from "../../../api/RequestHelpers";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";

export default function DiscountItem({ discountInfo, onPressItem }) {
    return <TouchableOpacity style={styles.container} onPress={onPressItem}>
        <Image source={{uri: `${url}uploads/${discountInfo.img}`}} style={styles.image} />
        <Text style={[Styles.greyRegular14, {marginVertical: 10}]}>{discountInfo.title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: AppColors.GREY_COLOR,
        marginTop: 20
    },
    image: {
        height: 200,
        borderRadius: 10,
        width: '100%'
    }
})