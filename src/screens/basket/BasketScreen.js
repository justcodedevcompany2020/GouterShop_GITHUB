import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import Button from "../../components/Button";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";
import ProductItem from "../catalog/components/ProductItem";
import Loading from "../../components/Loading";
import { getRequestAuth, postRequestAuth } from "../../api/RequestHelpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BasketScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [totalPrice, setTotalPrice] = useState('')
    const [token, setToken] = useState(null)

    async function getBasketProducts(myToken) {
        getRequestAuth('get_basket_products', myToken).then(res => {
            const myProducts = res.data.map(el => {
                return {
                    id: el.get_products.id,
                    count: el.product_count,
                    productName: el.get_products.title,
                    subcategory: el.get_products.get_subcategory.title,
                    price: el.get_products.price,
                    images: el.get_products.get_product_image.map(e => e.image),
                    isFavorite: el.get_products.get_favorites_authuser?.length > 0 ? true : false,
                    newPrice: el.get_products.discount,
                    rating: el.get_products.review_avg_stars ?? 5,
                };
            })
            setProducts(myProducts)
            setTotalPrice(res.price_sum)
            setIsRefreshing(false);
            setLoading(false);
        });
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        setProducts([])
        setTotalPrice(null)
        getBasketProducts()
    };

    async function onPressDelete(item) {
        await postRequestAuth('delete_basket_product', token, {
            product_id: item.id,
        }).then(res => {
            if (res.status) {
                let index = products.indexOf(item);
                if (index !== -1)
                    setProducts([
                        ...products.slice(0, index),
                        ...products.slice(index + 1, products.length),
                    ]);
                setTotalPrice(res.price_sum)
            }
        })
    }

    async function incrementCount(id) {
        await postRequestAuth('change_basket_products_count', token, {
            product_id: id,
            count: '1',
            type: 'add'
        }).then(res => {
            if (res.status) {
                const updatedProducts = products.map((item, i) => {
                    if (item.id === id) {
                        return { ...item, count: ++products[i].count };
                    }
                    return item;
                });
                setProducts(updatedProducts);
                setTotalPrice(res.price_sum)
            }
        });
    }

    async function decrementCount(id) {
        await postRequestAuth('change_basket_products_count', token, {
            product_id: id,
            count: '-1',
            type: 'add'
        }).then(res => {
            if (res.status) {
                const updatedProducts = products.map((item, i) => {
                    if (item.id === id) {
                        return { ...item, count: --products[i].count };
                    }
                    return item;
                });
                setProducts(updatedProducts);
                setTotalPrice(res.price_sum)
            }
        });
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setLoading(true)
            const myToken = await AsyncStorage.getItem('token')
            setToken(myToken)
            if (myToken) {
                getBasketProducts(myToken)
            } else setLoading(false)
        });
        return unsubscribe;
    }, [navigation]);


    return <View style={Styles.container}>
        {token ? (loading ? <Loading /> : (products.length > 0 || isRefreshing ?
            <>
                <Text style={[Styles.blackSemiBold20, { padding: 20, borderBottomWidth: 2, borderColor: AppColors.WHITE_SMOKE_COLOR }]}>Товаров на: {!isRefreshing && totalPrice + ' Р'}</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 20, marginBottom: 80, paddingTop: 20 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={products}
                    numColumns={2}
                    renderItem={(item, i) => (
                        isRefreshing ? null : <ProductItem
                            productInfo={item.item}
                            basketMode
                            incrementCount={incrementCount}
                            decrementCount={decrementCount}
                            onPressCross={onPressDelete}
                            navigation={navigation}
                            key={i}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[AppColors.GREEN_COLOR]} />
                    }
                />
                <View style={Styles.absoluteButton}>
                    <Button text={'Оформить заказ'} onPress={() => navigation.navigate('OrderingScreen')} />
                </View>
            </>
            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={[Styles.greySemiBold24, { textAlign: 'center' }]}>Корзина пуста!</Text>
                <Text style={[Styles.greySemiBold12, { textAlign: 'center', marginVertical: 15 }]}>Выбирайте товары из католога или из списка избранных</Text>
                <Button text={'Перейти в избранное'} width={'100%'} marginBottom={10} onPress={() => navigation.navigate('FavoritesScreen')} />
                <Button text={'Выбрать из каталога'} width={'100%'} noFill onPress={() => navigation.navigate('CatalogNavigator')} />
            </View>)) :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={[Styles.greySemiBold24, { textAlign: 'center', color: AppColors.GREEN_COLOR }]}>Внимание</Text>
                <Text style={[Styles.greySemiBold12, { textAlign: 'center', marginVertical: 15, color: AppColors.GREEN_COLOR }]}>Выбирайте товары из католога или из списка избранных</Text>
                <Button text={'Войти'} width={'100%'} marginBottom={10} onPress={() => navigation.navigate('Profile')} />
                <Button text={'Зарегистрироваться'} width={'100%'} noFill onPress={() => navigation.navigate('Profile')} />
            </View>
        }
    </View>
}