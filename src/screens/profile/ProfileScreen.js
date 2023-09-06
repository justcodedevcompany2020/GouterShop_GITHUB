import React from "react"
import { View } from 'react-native';
import { useSelector } from "react-redux";
import { FilledHeartIconGreen } from "../../../assets/svgs/CatalogSvgs";
import { CardsIcon, HistoryIcon } from "../../../assets/svgs/ProfileSvgs";
import Button from "../../components/Button";
import { Styles } from "../../styles/Styles";
import ProfileField from "./ProfileField";

export default function ProfileScreen({ navigation }) {
    const token = useSelector((state) => state.auth.token)

    return <View style={[Styles.containerPadding, { paddingTop: 20 }]}>
        {token ? <>
            <ProfileField Icon={CardsIcon} text={'Личные данные'} onPress={() => navigation.navigate('PersonalInfoScreen')}/>
            <ProfileField Icon={FilledHeartIconGreen} text={'Избранное'} onPress={() => navigation.navigate('FavoritesScreen')} />
            <ProfileField Icon={HistoryIcon} text={'История покупок'} onPress={() => navigation.navigate('PurchaseHistoryScreen')}/>
        </> : <>
            <Button text={'Зарегистрироваться'} onPress={() => navigation.navigate('AuthScreen', { page: 'register' })} />
            <Button text={'Войти в личный кабинет'} noFill onPress={() => navigation.navigate('AuthScreen', { page: 'login' })} />
        </>}
        <ProfileField text={'О компании'} onPress={() => navigation.navigate('AboutCompany')} />
    </View>
}