import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { FilledHeartIcon, GreyArrowRightIcon, HeartIcon, YellowStarIcon } from "../../../assets/svgs/CatalogSvgs";
import { getRequestAuth, postRequestAuth, url } from "../../api/RequestHelpers";
import Button from "../../components/Button";
import Count from "../../components/Count";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import Slider from "../home/components/Slider";

export default function ProductScreen({ navigation, route }) {
    const { productId } = route.params;
    const [productInfo, setProductInfo] = useState({})
    const [count, setCount] = useState('1');
    const token = useSelector(state => state.auth.token)
    const [loading, setLoading] = useState(true)
    const [likeLoading, setLikeLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [basketLoading, setBasketLoading] = useState(false)

    useEffect(() => {
        getProductInfo()
    }, [])

    function getProductInfo() {
        getRequestAuth(`getProducts/${productId}`, token).then(res => {
            console.log(res);
            setProductInfo({
                id: res.data.id,
                productName: res.data.title,
                subcategory: res.data.get_subcategory.title, //
                price: res.data.price,
                description: res.data.description,
                degreeOfRoast: res.data.degreeOfRoast,
                compound: res.data.compound,
                images: res.data.get_product_image.map(e => e),
                reviewCount: res.data.review_count,
                isFavorite: token && res.data.get_favorites_authuser.length > 0 ? true : false,
                rating: res.data.review_avg_stars,
            })
            setLoading(false)
        })
    }

    function ComplementProductItem() {
        return <TouchableOpacity style={styles.productContainer}>
            <Image source={productInfo.imgPath} style={styles.image} resizeMode={'cover'} />
            <Text style={Styles.blackSemiBold12}>{productInfo.productName}</Text>
            <Text style={[Styles.greySemiBold12, { marginVertical: 3 }]}>{productInfo.category}</Text>
        </TouchableOpacity>
    }

    function incrementCount() {
        let myCount = +count + 1
        setCount(myCount)
    }

    function decrementCount() {
        let myCount = +count - 1
        count != '1' && setCount(myCount)
    }

    function onPressHeart() {
        if (token) {
            setLikeLoading(true)
            return productInfo.isFavorite
                ? RemoveFromFavorites(productInfo.id, token)
                : AddToFavorites(productInfo.id, token);
        } else navigation.navigate('Profile');
    }

    function AddToFavorites() {
        postRequestAuth('add_favorites', token, {
            product_id: productInfo.id,
        }).then(res => {
            setProductInfo({ ...productInfo, isFavorite: true })
            setLikeLoading(false)
        });
    }

    function RemoveFromFavorites() {
        postRequestAuth('remove_favorite', token, {
            product_id: productInfo.id,
        }).then(res => {
            setProductInfo({ ...productInfo, isFavorite: false })
            setLikeLoading(false)
        })
    }

    function addToBasket() {
        setBasketLoading(true)
        console.log(count, productId)
        postRequestAuth('change_basket_products_count', token, {
            product_id: productId,
            count: count,
            type: 'add'
        }).then(res => {
            if (res.status) {
                setShowPopup(true)
                setBasketLoading(false)
            }
        })
    }

    return <View style={Styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            {loading ? <Loading /> : <>
                <Slider images={productInfo.images} productSlider  />
                <View style={Styles.flexRowJustifyBetween}>
                    <View>
                        <Text style={[Styles.greyRegular14, { marginBottom: 5 }]} >{productInfo.subcategory}</Text>
                        <Text style={[Styles.blackSemiBold18, { width: 250 }]}>{productInfo.productName}</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => { onPressHeart(productInfo); setProductInfo({ ...productInfo, isFavorite: !productInfo.isFavorite }) }}>
                        {likeLoading ? <ActivityIndicator color={AppColors.GREEN_COLOR} /> : productInfo.isFavorite ? <FilledHeartIcon /> : <HeartIcon />}
                    </TouchableOpacity>
                </View>
                <View style={[Styles.flexRow, { marginVertical: 15 }]}>
                    <Text style={Styles.blackSemiBold13}>{productInfo.price} </Text>
                    <Text style={Styles.greySemiBold13}>100г</Text>
                </View>
                <View style={Styles.flexRowJustifyBetween}>
                    <Count count={count} incrementCount={incrementCount} decrementCount={decrementCount} />
                    <Button text={'В корзину'} width={'48%'} onPress={token ? addToBasket : () => navigation.navigate('Profile')} loading={basketLoading} />
                </View>
                {+productInfo.reviewCount > 0 && <TouchableOpacity style={[Styles.flexRowJustifyBetween, styles.reviewsContainer]} onPress={() => navigation.navigate('ProductReviewsScreen', { id: productInfo.id })}>
                    <Text style={Styles.greySemiBold14}> Отзывы: {productInfo.reviewCount} </Text>
                    <View style={Styles.flexRow}>
                        <YellowStarIcon />
                        <Text style={styles.rating} >{productInfo.rating}   </Text>
                        <GreyArrowRightIcon />
                    </View>
                </TouchableOpacity>}
                <Text style={Styles.greyRegular14}>{productInfo.description}</Text>
                <Text style={[Styles.blackSemiBold14, { marginTop: 10, marginBottom: 5 }]}>Состав:</Text>
                <Text style={Styles.greyRegular14}>{productInfo.compound}</Text>
                <Text style={[Styles.blackSemiBold14, { marginTop: 10, marginBottom: 5 }]}>Степень обжарки:</Text>
                <Text style={[Styles.greyRegular14, { marginBottom: 20 }]}>{productInfo.degreeOfRoast}</Text>
            </>
            }
            {/* <Text style={[Styles.blackSemiBold18, { marginVertical: 30 }]}>Этот товар отлично дополняют</Text>
            <View style={Styles.flexRowJustifyBetween}>
                <ComplementProductItem />
                <ComplementProductItem />
            </View> */}
        </ScrollView>
        <Popup
            showPopup={showPopup}
            title={'Добавлено в корзину'}
            text={''}
            btnText={'Ок'}
            onPressBtn={() => setShowPopup(false)}
        />
    </View>
}
const styles = StyleSheet.create({
    favoriteIconContainer: {
        height: 45,
        width: 45,
        backgroundColor: AppColors.WHITE_SMOKE_COLOR,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rating: {
        color: AppColors.YELLOW_COLOR,
        fontFamily: 'OpenSans-SemiBold',
        marginHorizontal: 4,
    },
    reviewsContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.GREY_COLOR,
        padding: 15,
        marginBottom: 20
    },
    productContainer: {
        width: '48%',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 100,
        marginBottom: 5
    },
})