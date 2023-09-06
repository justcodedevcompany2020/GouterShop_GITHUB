import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import HomeScreen from '../screens/home/HomeScreen';
import DiscountScreen from '../screens/home/discounts/DiscountScreen';
import DiscountSingleScreen from '../screens/home/discounts/DiscountSingleScreen';
import FeedScreen from '../screens/home/feed/FeedScreen';
import PostSingleScreen from '../screens/home/feed/PostSingleScreen';
import CategoryScreen from '../screens/catalog/CategoryScreen';
import ProductSearchScreen from '../screens/catalog/ProductSearchScreen';
import ProductScreen from '../screens/catalog/ProductScreen';
import ReviewsScreen from '../screens/home/reviews/ReviewsScreen';
import LeaveAReviewAboutScreen from '../screens/home/reviews/LeaveAReviewAboutScreen';
import ReviewAboutProductScreen from '../screens/home/reviews/ReviewAboutProductScreen';
import ReviewAboutPurchaseScreen from '../screens/home/reviews/ReviewAboutPurchaseScreen';
import ReviewAboutGalleryScreen from '../screens/home/reviews/ReviewAboutGalleryScreen';
import LeaveAReviewScreen from '../screens/home/reviews/LeaveAReviewScreen';
import DeliveryAddressScreen from '../screens/home/DeliveryAddressScreen';
import ProductsScreen from '../screens/catalog/ProductsScreen';
import ProductReviewsScreen from '../screens/catalog/ProductReviewsScreen';
import MonthProductsScreen from '../screens/catalog/MonthProductsScreen';
import { CatalogNavigator } from './CatalogNavigator';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
            })}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => <Header navigation={navigation} title={''} searchIcon onPressSearch={() => navigation.navigate('ProductSearchScreen')} showAddress />,
                })}
            />
            <Stack.Screen
                name="DiscountNavigator"
                component={DiscountNavigator}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                })}
            />
            <Stack.Screen
                name="FeedNavigator"
                component={FeedNavigator}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                })}
            />
            <Stack.Screen
                name="ReviewsNavigator"
                component={ReviewsNavigator}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={route.params.title} searchIcon onPressSearch={() => navigation.navigate('ProductSearchScreen')} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="ProductsScreen"
                component={ProductsScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={route.params.title} searchIcon onPressSearch={() => navigation.navigate('ProductSearchScreen')} backIcon />
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
            <Stack.Screen
                name="ProductSearchScreen"
                component={ProductSearchScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={''} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="DeliveryAddressScreen"
                component={DeliveryAddressScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                })}
            />
            <Stack.Screen
                name="ProductReviewsScreen"
                component={ProductReviewsScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={''} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="MonthProductsScreen"
                component={MonthProductsScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Продукция месяца'} searchIcon onPressSearch={() => navigation.navigate('ProductSearchScreen')} backIcon />
                    ),
                })}
            />

            <Stack.Screen
                name="CatalogNavigator"
                component={CatalogNavigator}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                })}
            />
        </Stack.Navigator>
    );
};


const DiscountNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'DiscountScreen'}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
            })}
        >
            <Stack.Screen
                name="DiscountScreen"
                component={DiscountScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Акции'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="DiscountSingleScreen"
                component={DiscountSingleScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={route.params.title} shareIcon backIcon />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

const FeedNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'FeedScreen'}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
            })}
        >
            <Stack.Screen
                name="FeedScreen"
                component={FeedScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Лента'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="PostSingleScreen"
                component={PostSingleScreen}
                options={({ navigation, route }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={route.params.title} shareIcon backIcon />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

const ReviewsNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'ReviewsScreen'}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                unmountOnBlur: true
            })}
        >
            <Stack.Screen
                name="ReviewsScreen"
                component={ReviewsScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Все отзывы'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="LeaveAReviewAboutScreen"
                component={LeaveAReviewAboutScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Оставьте отзыв'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="ReviewAboutProductScreen"
                component={ReviewAboutProductScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Выберите товар'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="ReviewAboutPurchaseScreen"
                component={ReviewAboutPurchaseScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'История покупок'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="ReviewAboutGalleryScreen"
                component={ReviewAboutGalleryScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Галерея'} backIcon />
                    ),
                })}
            />
            <Stack.Screen
                name="LeaveAReviewScreen"
                component={LeaveAReviewScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    header: () => (
                        <Header navigation={navigation} title={'Оставьте отзыв'} backIcon />
                    ),
                })}
            />

        </Stack.Navigator>
    );
}