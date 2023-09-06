import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { AppColors } from '../../styles/AppColors';

export default function TabBarIcon({focused, Icon, text}) {
  return <View style={styles.tabBarStyle}>
      <Icon focused={focused}/>
      <Text style={focused ? styles.activeTabTitle : styles.nonActiveTabTitle}>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
  tabBarStyle: {
    alignItems: 'center',
  },
  nonActiveTabTitle: {
    fontSize: 10,
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    color: AppColors.BLACK_COLOR
  },
  activeTabTitle: {
    fontSize: 10,
    marginTop: 8,
    color: AppColors.GREEN_COLOR,
    fontFamily: 'OpenSans-SemiBold',
  },
});
