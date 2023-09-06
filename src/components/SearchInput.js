import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { preProcessFile } from "typescript";
import { SearchIcon } from "../navigation/components/NavigationMenuSvgs";
import { AppColors } from "../styles/AppColors";
import { Styles } from "../styles/Styles";


export default function SearchInput({value, onChangeValue, placeholder}) {
    const [isFocused, setIsFocused] = useState(false)

    return <View style={[styles.inputContainer, isFocused && {borderColor: AppColors.GREEN_COLOR}]}>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeValue}
            placeholder={placeholder}
            placeholderTextColor={AppColors.GREY_COLOR}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
        <SearchIcon />
    </View>
}
const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        backgroundColor: AppColors.WHITE_SMOKE_COLOR,
        borderRadius: 4,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: AppColors.WHITE_COLOR,
        marginBottom: 15
    },
    input: {
        width: '88%',
        color: AppColors.BLACK_COLOR
    }
})