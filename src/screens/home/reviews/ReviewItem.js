import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowStarIcon } from "../../../../assets/svgs/HomeSvgs";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import HorizontalProductItem from "../../catalog/components/HorizontalProductItem";


export default function ReviewItem({ reviewInfo, navigation }) {
    return <View style={styles.container}>
        <Text style={Styles.blackSemiBold18}>{reviewInfo.username}</Text>
        <HorizontalProductItem productInfo={reviewInfo.productInfo} hideBasket hideLine onPress={() => navigation.navigate('ProductScreen', {productId: reviewInfo.productInfo.id})}/>
        <Text style={Styles.blackRegular14}>{reviewInfo.comment}</Text>
        <Text style={[Styles.greyRegular14, { marginVertical: 8 }]}>{reviewInfo.date}</Text>
        <View style={Styles.flexRow}>
            {[...Array(reviewInfo.rating)].map((item, i) => <View style={{ marginRight: 3 }} key={i} >
                <YellowStarIcon/>
            </View>)}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        borderBottomWidth: 2
    }
})