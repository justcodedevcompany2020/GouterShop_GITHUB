import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { GreyArrowRightIcon } from "../../../../assets/svgs/CatalogSvgs";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";

export default function TitleAll({title, hideAll, onPressAll, hideBottomMargin}){
    return <View style={[styles.container, hideBottomMargin && {marginBottom: 0}]}>
        <Text style={Styles.blackSemiBold20}>{title}</Text>
        {!hideAll && <TouchableOpacity style={Styles.flexRow} onPress={onPressAll}>
            <Text style={styles.allText}>Все</Text>
            <GreyArrowRightIcon/>
        </TouchableOpacity>}
    </View>
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 35,
    },
    allText: {
        color: AppColors.GREEN_COLOR,
        fontFamily: 'OpenSans-SemiBold',
        marginRight: 5,
    }
})