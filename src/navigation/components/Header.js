import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LogoutIcon } from "../../../assets/svgs/ProfileSvgs";
import { getRequestAuth } from "../../api/RequestHelpers";
import Popup from "../../components/Popup";
import { deleteToken } from "../../store/actions/saveToken";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";
import { BackIcon, SearchIcon, ShareIcon } from "./NavigationMenuSvgs";
import DeliveryAddressScreen from "../../screens/home/DeliveryAddressScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ title, navigation, backIcon, searchIcon, onPressSearch, shareIcon, hideBorder, showAddress, logoutIcon }) {
    const dispatch = useDispatch()
    const [showPopup, setShowPopup] = useState(false)
    const [address, setAddress] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true)

    async function onPressLogout() {
        const token = await AsyncStorage.getItem('token')
        getRequestAuth('logout_user', token).then(res => {
            setShowPopup(false);
            dispatch(deleteToken())
            navigation.navigate('Home')
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focusheader');
            const token = await AsyncStorage.getItem('token')
            if (token) {
                getAddress(token)
            } else setLoading(false)
        });
        return unsubscribe;
    }, [navigation]);

    function getAddress(token) {
        getRequestAuth('get_delivery_address', token).then(res => {
            console.log(res);
            setAddress(res.delivery_address.address)
            setLoading(false)
        })
    }
    async function onPressAddress (){
        const token = await AsyncStorage.getItem('token')

        if(token) setModalVisible(true)
        else navigation.navigate('Profile')
    }

    return <View style={[styles.container, hideBorder && { borderBottomWidth: 0 }]}>
        {showAddress ? <TouchableOpacity style={styles.addressContainer} onPress={onPressAddress}>
            {!loading && <Text style={styles.addressText} numberOfLines={1}>{address ?? `Укажите адрес доставки`}</Text>}
        </TouchableOpacity> :
            <Text style={[Styles.blackSemiBold18, { marginBottom: 12, width: '58%', alignSelf: 'center', textAlign: 'center' }]} numberOfLines={1}>{title}</Text>}
        {backIcon && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <BackIcon />
        </TouchableOpacity>}
        {searchIcon && <TouchableOpacity onPress={onPressSearch} style={styles.searchIcon}>
            <SearchIcon />
        </TouchableOpacity>}
        {shareIcon && <TouchableOpacity style={styles.searchIcon}>
            <ShareIcon />
        </TouchableOpacity>}
        {logoutIcon && <TouchableOpacity style={styles.searchIcon} onPress={() => setShowPopup(true)}>
            <LogoutIcon />
        </TouchableOpacity>}
        {logoutIcon && <Popup showPopup={showPopup} title={'Выход'} text={'Вы уверены, что хотите выйти?'} firstBtnText={'Да'} secondBtnText={'Нет'} firstOnPress={onPressLogout} secondOnPress={() => setShowPopup(false)} />}
        <DeliveryAddressScreen navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} onSuccess={() => setModalVisible(false)} />
    </View>
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        backgroundColor: AppColors.WHITE_COLOR,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backIcon: {
        position: 'absolute',
        left: 20,
        bottom: 14,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 5
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        bottom: 10
    },
    addressContainer: {
        backgroundColor: AppColors.PURPLE_COLOR,
        height: 30,
        width: '65%',
        borderRadius: 10,
        paddingHorizontal: 40,
        position: 'absolute',
        bottom: 12,
        justifyContent: 'center',
    },
    addressText: {
        color: AppColors.WHITE_COLOR,
        fontSize: 12,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center'
    }
})