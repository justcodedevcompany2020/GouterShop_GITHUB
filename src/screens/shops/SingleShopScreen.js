import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PhoneIcon, PlaceIcon } from "../../../assets/svgs/ShopSvgs";
import { url } from "../../api/RequestHelpers";
import { BackIcon } from "../../navigation/components/NavigationMenuSvgs";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";

export default function SingleShopScreen({ shopInfo, setCurrentShop }) {
    return <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
            <TouchableOpacity style={{ position: 'absolute', bottom: 17, left: 20, zIndex: 9999999, }} onPress={() => setCurrentShop(null)}>
                <BackIcon />
            </TouchableOpacity>
            <Text style={[Styles.blackSemiBold18, { textAlign: 'center' }]}>Галерея</Text>
        </View>
        <ScrollView>
            <View style={{ paddingHorizontal: 20, }}>
                <Text style={Styles.blackSemiBold16}>{shopInfo.title}</Text>
                <Text style={[Styles.greyRegular14, { marginVertical: 3 }]}>{shopInfo.address}</Text>
                <Text style={Styles.greyRegular14}>{shopInfo.workTime}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, backgroundColor: AppColors.WHITE_SMOKE_COLOR, marginTop: 15 }}>
                <View style={[Styles.flexRow, { paddingVertical: 10, borderBottomWidth: 1, borderColor: AppColors.GREY_COLOR }]}>
                    <PlaceIcon />
                    <Text style={[Styles.blackRegular15, { marginLeft: 10 }]}>{shopInfo.address}</Text>
                </View>
                {shopInfo.phone && <View style={[Styles.flexRow, { paddingVertical: 10, borderBottomWidth: 1, borderColor: AppColors.GREY_COLOR }]}>
                    <PhoneIcon />
                    <Text style={[Styles.blackRegular15, { marginLeft: 10 }]}>{shopInfo.phone}</Text>
                </View>}
                <Text style={[Styles.blackRegular14, { marginVertical: 15 }]}>{shopInfo.description}</Text>
                <Image source={{uri: `${url}uploads/${shopInfo.image}`}} resizeMode="contain" style={{ height: 250, width: '100%', marginBottom: 20 }} borderRadius={5} />
            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 2,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        paddingVertical: 15,
    }
})