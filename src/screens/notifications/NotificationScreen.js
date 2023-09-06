import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Styles } from "../../styles/Styles";

export default function NotificationScreen() {
    return <SafeAreaView style={Styles.container}>
        <Text style={[Styles.greyRegular16, {textAlign: 'center', marginTop: 20}]}>У Вас нет сообщений</Text>
    </SafeAreaView>
}