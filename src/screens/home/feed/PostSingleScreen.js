import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {url} from '../../../api/RequestHelpers';
import {Styles} from '../../../styles/Styles';

export default function PostSingleScreen({route}) {
  const {width} = Dimensions.get('window');
  const {item} = route.params;

  function NewsItem({item}) {
    return (
      <View>
        <Image
          style={{width: width, height: 260}}
          source={{uri: `${url}uploads/${item.image}`}}
        />
        {item.shortText && <View style={styles.attention}>
          <Text style={[Styles.blackSemiBold24, {marginBottom: 20}]}>
            {item.shortTextTitle}
          </Text>
          <Text style={[Styles.greyRegular14, {textAlign: 'center'}]}>
            {item.shortText}
          </Text>
        </View>}
        <Text style={[Styles.blackRegular16, { padding: 20 }]}>{item.shortText}</Text> 
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {item.map((el, i) => <NewsItem item={el} key={i}/>)}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingVertical: 15,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FFE664',
    margin: 20,
  },
  attention: {
    backgroundColor: '#EEEEEE',
    paddingVertical: 50,
    paddingHorizontal: 35,
    alignItems: 'center',
  },
});
