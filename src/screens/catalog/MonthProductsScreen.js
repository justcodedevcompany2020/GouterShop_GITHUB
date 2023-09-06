import React, { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultIcon } from '../../../assets/svgs/CatalogSvgs';
import { getRequestAuth } from '../../api/RequestHelpers';
import Loading from '../../components/Loading';
import { Styles } from '../../styles/Styles';
import ProductItem from './components/ProductItem';

export default function MonthProductsScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState()
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        getMonthProducts()
    }, [])

    function getMonthProducts() {
        getRequestAuth('get_discount_products', token).then(res => {
            let products = res.data.map(el => ({
                productName: el.title,
                id: el.id,
                subcategory: el.get_subcategory.title,
                price: el.price,
                description: el.description,
                degreeOfRoast: el.degreeOfRoast,
                compound: el.compound,
                images: el.get_product_image.map(e => e.image),
                isFavorite: token && el.get_favorites_authuser.length > 0 ? true : false,
                reviewCount: el.review_count,
                rating: el.review_avg_stars ?? 5,
                newPrice: el.discount
            }))
            setProducts(products)
            setLoading(false)
        })
    }

    return (
        <View style={Styles.container}>
            {loading ? <Loading /> : <>
                <View style={[Styles.flexRowJustifyBetween, { padding: 20 }]}>
                    <Text style={Styles.greyRegular14}>Товаров: {products.length}</Text>
                    <TouchableOpacity style={Styles.flexRow}>
                        <DefaultIcon />
                        <Text style={[Styles.greyRegular14, { marginLeft: 5 }]}>
                            По умолчанию
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <View style={[Styles.flexRowJustifyBetween, { flexWrap: 'wrap' }]}>
                        {products.map((item, i) => (
                            <ProductItem
                                key={i}
                                productInfo={item}
                                products={products}
                                setProducts={setProducts}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                </ScrollView>
            </>
            }
        </View>
    );
}
