import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GreyArrowRight } from "../../../assets/svgs/HomeSvgs";
import { Styles } from "../../styles/Styles";


export default function ProfileField({ text, Icon, onPress }) {
    return <TouchableOpacity style={[Styles.flexRowJustifyBetween, { paddingRight: 5, marginBottom: 15 }]} onPress={onPress}>
        <View style={Styles.flexRow}>
            {Icon && <View style={{marginRight: 10}}>
                <Icon />
            </View>
            }
            <Text style={Styles.greySemiBold16}>{text}</Text>
        </View>
        <GreyArrowRight />
    </TouchableOpacity>
}