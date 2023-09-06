import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../../../styles/Styles";


export default function LeaveAReviewAboutScreen({navigation}) {
    return <View style={Styles.container}>
        <ScrollView style={{paddingHorizontal: 20 }}>
            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#E2F0E3' }]} onPress={() => navigation.navigate('ReviewAboutProductScreen') }>
                <Text style={[Styles.blackSemiBold18, { marginBottom: 10 }]}>О Продукции</Text>
                <Text style={Styles.blackRegular13}>Поставьте оценки продуктам из списка ваших покупок. Поделитесь своим честным мнением и при желании прикрепите фотографии</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#EFEBF9' }]} onPress={() => navigation.navigate('ReviewAboutPurchaseScreen') }>
                <Text style={[Styles.blackSemiBold18, { marginBottom: 10 }]}>О покупке</Text>
                <Text style={Styles.blackRegular13}>Оцените свой опыт покупок и онлайн-заказов в Кантате. Нам важна каждая деталь, и мы учитываем все ваши комментарии.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#E0EDF3' }]} onPress={() => navigation.navigate('ReviewAboutGalleryScreen') }>
                <Text style={[Styles.blackSemiBold18, { marginBottom: 10 }]}>О галерее</Text>
                <Text style={Styles.blackRegular13}>Расскажите о своих впечатлениях после посещения галереи Кантаты. Что вам понравилось, а что можно еще улучшить? Ждем ваших отзывов!</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 15,
        marginTop: 20,
        borderRadius: 10
    }
})