import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {url} from '../../../api/RequestHelpers';
import {Styles} from '../../../styles/Styles';
import TitleAll from './TitleAll';
import { Dimensions } from 'react-native';

const {width} = Dimensions.get('window')
export default function DiscountBlock({navigation, data}) {

  return (
    <>
      <TitleAll title={'Акции'} onPressAll={() => navigation.navigate('DiscountNavigator', {
            screen: 'DiscountScreen',
            params: {discountInfo: data},
          })}/>
        <ScrollView horizontal style={{ marginLeft: 20 }} showsHorizontalScrollIndicator={false}>
            {data.map((item, i) => <View style={{marginRight: 10, marginBottom: 5}} key={i}>
                <Image source={{uri: `${url}uploads/${item.img}`}} style={{ width: width/100*70, height: 115 }} />
                <Text style={Styles.blackSemiBold14}>{item.title}</Text>
            </View>)}
        </ScrollView>
    </>
  );
}
