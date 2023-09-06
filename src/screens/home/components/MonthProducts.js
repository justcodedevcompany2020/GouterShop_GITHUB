import React from "react";
import { ScrollView, View } from "react-native";
import TitleAll from "./TitleAll";
import ProductItem from "../../catalog/components/ProductItem";

export default function MonthProducts({ navigation, monthProducts }) {
    return <View>
        <TitleAll
            title={'Продукция месяца'}
            onPressAll={() => navigation.navigate('MonthProductsScreen')}
        />
        <ScrollView
            horizontal
            style={{ marginLeft: 20 }}
            showsHorizontalScrollIndicator={false}>
            {monthProducts.map((item, j) => (
                <ProductItem
                    key={j}
                    productInfo={item}
                    width={150}
                    marginRight={10}
                    hideFavorite
                    navigation={navigation}
                />
            ))}
        </ScrollView>
    </View>
}