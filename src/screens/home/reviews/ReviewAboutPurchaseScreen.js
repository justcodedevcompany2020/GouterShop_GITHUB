import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../../../components/Button";
import SearchInput from "../../../components/SearchInput";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import ProductItem from "../../catalog/components/ProductItem";


export default function ReviewAboutPurchaseScreen({ navigation }) {
    const [searchValue, setSearchValue] = useState('')
    //todo

    const [purchasesInfo, setPurchasesInfo] = useState([
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
        // { productName: 'Ил Дивино', category: 'Классический кофе', rating: '4.6', price: '397 Р', imgPath: require('../../../../assets/pngs/home/product.png'), date: '11 февраля 2023', isSelected: false },
    ])

    function onSelectItem(i) {
        setPurchasesInfo(purchasesInfo => [
            ...purchasesInfo.slice(0, i),
            {
                ...purchasesInfo[i],
                isSelected: !purchasesInfo[i].isSelected,
            },
            ...purchasesInfo.slice(i + 1)
        ]);
    }


    return <View style={[Styles.container, { paddingTop: 20 }]}>
        <SearchInput value={searchValue} onChangeValue={setSearchValue} placeholder={'Поиск...'}/>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            {searchValue && <View style={[Styles.flexRowJustifyBetween, { flexWrap: 'wrap' }]}>
                {purchasesInfo.map((item, i) => <ProductItem productInfo={item} key={i} selectMode onPressSelect={() => onSelectItem(i)} />)}
            </View>}
            {purchasesInfo.some((el) => el.isSelected === true) && <View style={{ height: 70 }} />}
        </ScrollView>
        {purchasesInfo.some((el) => el.isSelected === true) && <View style={Styles.absoluteButton}>
            <Button text={'Далее'} backgroundColor={AppColors.GREEN_COLOR} onPress={() => navigation.navigate('LeaveAReviewScreen')} />
        </View>}
    </View>
}