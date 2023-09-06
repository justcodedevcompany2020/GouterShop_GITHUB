import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";


export default function OrderInfoBlock({ products, totalPrice }) {

    return <>
        <View style={styles.productsContainer}>
            {products.map((item, i) => <View style={[styles.productItem,]} key={i}>
                <View style={Styles.flexRowJustifyBetween}>
                    <Text style={[Styles.blackSemiBold14, { width: '60%' }]} numberOfLines={1}>{item.productName}, 100г</Text>
                    <View style={Styles.flexRow}>
                        <Text style={Styles.greyRegular14}>{item.count} шт.  </Text>
                        <Text style={Styles.greyRegular14}>{item.price} Р</Text>
                    </View>
                </View>
                <View style={[Styles.flexRowJustifyBetween, { marginTop: 5 }]}>
                    <Text style={Styles.blackRegular14}> </Text>
                    <Text style={Styles.blackSemiBold14}>{+item.price * +item.count} Р</Text>
                </View>
            </View>
            )}
        </View>
        <View style={[styles.productsContainer, { borderColor: AppColors.BLACK_COLOR }]}>
            <View style={[styles.productItem, Styles.flexRowJustifyBetween]}>
                <Text style={Styles.blackRegular14}>Товаров на сумму</Text>
                <Text style={Styles.blackSemiBold14}>{totalPrice} Р</Text>
            </View>
            <View style={[styles.productItem, Styles.flexRowJustifyBetween]}>
                <Text style={Styles.blackRegular14}>Доставка</Text>
                <Text style={Styles.blackSemiBold14}>0 Р</Text>
            </View>
            <View style={[styles.productItem, Styles.flexRowJustifyBetween, { borderBottomWidth: 0 }]}>
                <Text style={Styles.blackRegular14}>Итог</Text>
                <Text style={Styles.blackSemiBold14}>{totalPrice} Р</Text>
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    productsContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        marginBottom: 15
    },
    productItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
    },
})