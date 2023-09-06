import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BasketIcon } from "../../../../assets/svgs/CatalogSvgs";
import { CheckMark } from "../../../../assets/svgs/HomeSvgs";
import { postRequestAuth, url } from "../../../api/RequestHelpers";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import { useSelector } from "react-redux";
import { useState } from "react";
import Popup from "../../../components/Popup";

export default function HorizontalProductItem({ productInfo, hideBasket, hideLine, selectMode, onPress, navigation }) {
    const [basketLoading, setBasketLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    async function addToBasket() {
        await postRequestAuth('change_basket_products_count', token, {
            product_id: productInfo.id,
            count: 1,
            type: 'add'
        }).then(res => {
            console.log(res);
            if (res.status) {
                setShowPopup(true)
            }
        })
    }

    function onPressBasket() {
        if (token) {
            setBasketLoading(true)
            addToBasket().then(res => setBasketLoading(false))
        } else navigation.navigate('Profile')
    }

    const token = useSelector(state => state.auth.token)

    return <TouchableOpacity style={[styles.container, hideLine && { borderBottomWidth: 0 }]} onPress={(selectMode && productInfo.reviewAlreadyLeft) ? null : () => onPress(productInfo)}>
        <View style={Styles.flexRow}>
            <Image style={styles.image} source={{ uri: `${url}uploads/${productInfo.images[0]}` }} resizeMode={'cover'} />
            <View style={{ marginLeft: 15 }}>
                <Text style={[Styles.blackSemiBold16, {maxWidth: 125} ]} numberOfLines={1}>{productInfo.productName}</Text>
                <Text style={[Styles.greyRegular14, { marginTop: 5 }]}>{productInfo.subcategory}</Text>
            </View>
        </View>
        {selectMode && (productInfo.reviewAlreadyLeft ? <Text style={Styles.greyRegular12}>отзыв уже оставлен</Text> : productInfo.isSelected && <CheckMark />)}
        {!hideBasket && <TouchableOpacity onPress={onPressBasket}>
            {basketLoading ? <ActivityIndicator color={AppColors.GREEN_COLOR} size={"small"} /> : <BasketIcon />}
        </TouchableOpacity>}
        <Popup
            showPopup={showPopup}
            title={'Добавлено в корзину'}
            text={''}
            btnText={'Ок'}
            onPressBtn={() => setShowPopup(false)}
        />
    </TouchableOpacity>
}

//todo get all galleries

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50
    }
})