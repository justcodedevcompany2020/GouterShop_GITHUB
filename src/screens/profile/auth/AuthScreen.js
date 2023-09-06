import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const { width } = Dimensions.get('window')

export default function AuthScreen({ navigation, route }) {
    const [currentPage, setCurrentPage] = useState(route.params.page)

    useEffect(() => {
        console.log(currentPage);
    }, [])

    return <View style={Styles.container}>
        <View style={[Styles.flexRowJustifyBetween, { margin: 20 }]}>
            <TouchableOpacity style={[currentPage === 'login' ? styles.tab : styles.activeTab]} onPress={() => setCurrentPage('register')}>
                <Text style={[currentPage === 'login' ? Styles.greySemiBold16 : Styles.blackSemiBold16]}>
                    Регистрация
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[currentPage === 'register' ? styles.tab : styles.activeTab]} onPress={() => setCurrentPage('login')}>
                <Text style={[currentPage === 'register' ? Styles.greySemiBold16 : Styles.blackSemiBold16]}>
                    Вход
                </Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: 20}}>
            {currentPage === 'login' ? <LoginScreen navigation={navigation} /> : <RegisterScreen navigation={navigation} />}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    tab: {
        borderBottomWidth: 2,
        width: (width - 40) / 2,
        alignItems: 'center',
        padding: 5,
        borderColor: AppColors.WHITE_SMOKE_COLOR
    },
    activeTab: {
        borderBottomWidth: 2,
        width: (width - 40) / 2,
        alignItems: 'center',
        padding: 5,

    }
})