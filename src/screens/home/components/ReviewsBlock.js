import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../../components/Button";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import HorizontalProductItem from "../../catalog/components/HorizontalProductItem";
import TitleAll from "./TitleAll";
export default function ReviewsBlock({ navigation, data }) {
    return <View>
        <TitleAll title={'Отзывы гостей'} onPressAll={() => navigation.navigate('ReviewsNavigator', { screen: 'ReviewsScreen' })} hideBottomMargin />
        <ScrollView horizontal style={{ paddingVertical: 20, backgroundColor: AppColors.WHITE_SMOKE_COLOR }} showsHorizontalScrollIndicator={false}>
            {data.map((item, i) => <View style={[styles.reviewContainer, i == data.length - 1 && { marginRight: 10 }]} key={i}>
                <View>
                    <Text style={Styles.blackSemiBold18}>{item.username}</Text>
                    <Text style={Styles.blackRegular13}>{item.comment}</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: AppColors.LIGHT_GREY, marginTop: 20 }}>
                    <HorizontalProductItem productInfo={item.productInfo} hideBasket navigation={navigation} hideLine onPress={() => navigation.navigate('ProductScreen', { productId: item.productInfo.id })} />
                </View>
            </View>)}
        </ScrollView>
        <View style={{ marginHorizontal: 20 }}>
            <Button text={'Оставить отзыв'} marginBottom={80} backgroundColor={AppColors.PURPLE_COLOR} onPress={() => navigation.navigate('ReviewsNavigator', { screen: 'LeaveAReviewAboutScreen' })} />
        </View>
    </View>
}
const styles = StyleSheet.create({
    reviewContainer: {
        width: 280,
        backgroundColor: AppColors.WHITE_COLOR,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
    }
})