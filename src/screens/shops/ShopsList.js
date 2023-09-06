import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import SearchInput from '../../components/SearchInput';
import ShopsDropDown from './ShopsDropDown';
import SingleShopScreen from './SingleShopScreen';

export default function ShopsList({navigation, data}) {
  const [searchValue, setSearchValue] = useState('');
  const [currentShop, setCurrentShop] = useState(null);


  return (
    <View style={{flex: 1}}>
      {currentShop ? (
        <SingleShopScreen
          shopInfo={currentShop}
          setCurrentShop={setCurrentShop}
        />
      ) : (
        <>
          <SearchInput
            value={searchValue}
            onChangeValue={setSearchValue}
            placeholder={'Поиск по названию или адресу'}
          />
          <ScrollView style={{paddingHorizontal: 20}}>
            <ShopsDropDown
              data={data}
              setCurrentShop={setCurrentShop}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}
