import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectedIcon } from "../../assets/svgs/BasketSvgs";
import { AppColors } from "../styles/AppColors";
import { Styles } from "../styles/Styles";


export default function Select({ data, selectedIndex, setSelectedIndex }) {
    return <View style={styles.container}>
        {data.map((item, i) => <TouchableOpacity style={[styles.itemContainer, i === data.length - 1 && { borderBottomWidth: 0 }]} key={i} onPress={() => setSelectedIndex(item.id)}>
            {selectedIndex === item.id ? <SelectedIcon /> : <View style={styles.circle} />}
            <Text style={[Styles.blackRegular14, { marginLeft: 8 }]}>{item.text}</Text>
        </TouchableOpacity>)}
    </View>
}

const styles = StyleSheet.create({
    circle: {
        height: 16,
        width: 16,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: AppColors.WHITE_SMOKE_COLOR
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        marginBottom: 20
    }
})