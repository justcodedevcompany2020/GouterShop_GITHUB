import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BasketIcon, BellIcon, HomeIcon, ProfileIcon, ShopsIcon } from './components/NavigationMenuSvgs';
import TabBarIcon from './components/TabBarIcon';
import { ProfileNavigator } from './ProfileNavigator';
import { HomeNavigator } from './HomeNavigator';
import { BasketNavigator } from './BasketNavigator';
import ShopsScreen from '../screens/shops/ShopsScreen';
import { checkToken } from '../store/actions/saveToken';
import { useDispatch } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import Header from './components/Header';

const Tab = createBottomTabNavigator();

export default function NavigationMenu() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(checkToken())
  }, [])

  return (
    <NavigationContainer>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Tab.Navigator
        initialRouteName="Home"
        // detachInactiveScreens={true}
        screenOptions={({ route }) => ({
          // unmountOnBlur:true,
          tabBarShowLabel: false,
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'DeliveryAddressScreen') {
              return {
                display: 'none',
              };
            }
            return { height: 90, borderTopWidth: 2, borderColor: '#868686' };
          })(route),
        })}
        backBehavior={'initialRoute'}
      >
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={({ navigation }) => ({
            title: '',
            headerTransparent: true,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} text={'Сообщения'} Icon={BellIcon} />
            ),
            header: () => (
              <Header navigation={navigation} title={'Сообщения'} />
            ),
          })}
        />
        <Tab.Screen
          name="Shops"
          component={ShopsScreen}
          options={({ navigation }) => ({
            title: '',
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} text={'Магазины'} Icon={ShopsIcon} />
            ),
          })}
        />
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} text={'Главная'} Icon={HomeIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="Basket"
          component={BasketNavigator}
          options={({ navigation }) => ({
            title: '',
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} text={'Корзина'} Icon={BasketIcon} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} text={'Профиль'} Icon={ProfileIcon} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
