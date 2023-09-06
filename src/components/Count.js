import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../styles/AppColors";
import { Styles } from "../styles/Styles";
import { ActivityIndicator } from "react-native";

export default function Count({ count, incrementCount, decrementCount, basket, loading }) {
    return <View style={[styles.selectAmountContainer, basket && { width: '70%', height: 30, marginBottom: 0 }, loading && { justifyContent: 'center' }]}>
        {loading ? <ActivityIndicator color={AppColors.GREEN_COLOR} /> : <>
            <TouchableOpacity onPress={(count > 1) ? decrementCount : null}>
                <Text style={[styles.text, basket && { fontSize: 24 }]}>–</Text>
            </TouchableOpacity>
            <Text style={Styles.blackSemiBold14}>{count} шт.</Text>
            <TouchableOpacity onPress={incrementCount}>
                <Text style={[styles.text, basket && { fontSize: 24 }]}>+</Text>
            </TouchableOpacity>
        </>}
    </View>
}
const styles = StyleSheet.create({
    selectAmountContainer: {
        backgroundColor: AppColors.WHITE_SMOKE_COLOR,
        height: 50,
        borderRadius: 10,
        width: '48%',
        marginBottom: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: AppColors.GREY_COLOR,
        paddingHorizontal: 15
    },
    text: {
        textAlign: 'center',
        color: AppColors.GREEN_COLOR,
        fontSize: 36
    }
})