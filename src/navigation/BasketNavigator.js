import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import BasketScreen from '../screens/basket/BasketScreen';
import OrderingScreen from '../screens/basket/OrderingScreen';
import AuthScreen from '../screens/profile/auth/AuthScreen';
import VerificationScreen from '../screens/profile/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/profile/auth/ForgotPasswordScreen';
import ForgotPasswordVerificationScreen from '../screens/profile/auth/ForgotPasswordVerificationScreen';
import NewPasswordScreen from '../screens/profile/auth/NewPasswordScreen';
import { FavoritesScreen } from '../screens/profile/FavoritesScreen';
import ProductScreen from '../screens/catalog/ProductScreen';
const Stack = createNativeStackNavigator();
export const BasketNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'BasketScreen'}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
            })}
        >
            <Stack.Screen
                name="BasketScreen"
                component={BasketScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => <Header navigation={navigation} title={'Корзина'} />,
                })}
            />
            <Stack.Screen
                name="OrderingScreen"
                component={OrderingScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Оформление заказа'} backIcon shareIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Авторизация'} backIcon hideBorder />
                    ),
                })}
            />
            <Stack.Screen
                name="VerificationScreen"
                component={VerificationScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Подтверждение'} backIcon hideBorder />
                    ),
                })}
            />
            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Забыли пароль?'} backIcon hideBorder />
                    ),
                })}
            />
            <Stack.Screen
                name="ForgotPasswordVerificationScreen"
                component={ForgotPasswordVerificationScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Забыли пароль?'} backIcon hideBorder />
                    ),
                })}
            />
            <Stack.Screen
                name="NewPasswordScreen"
                component={NewPasswordScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Забыли пароль?'} backIcon hideBorder />
                    ),
                })}
            />

            <Stack.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Избранное'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={''} shareIcon backIcon />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};