import React from "react";
import { ScrollView, View } from "react-native";
import { Styles } from "../../../styles/Styles";
import DiscountItem from "./DiscountItem";

export default function DiscountScreen({ navigation, route }) {
    const {discountInfo} = route.params

    return <View style={Styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            {discountInfo.map((item, i) => <DiscountItem discountInfo={item} key={i} onPressItem={() => navigation.navigate('DiscountSingleScreen', { title: item.title, itemInfo: item })} />)}
        </ScrollView>
    </View>
}
