import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CategoriesDropDown from './components/CategoriesDropDown';
import { Styles } from '../../styles/Styles';
import { getRequest } from '../../api/RequestHelpers';
import Loading from '../../components/Loading';
import { MonthProducts, MyPurchases, Myfavorites } from '../../../assets/svgs/CatalogSvgs';
import { AppColors } from '../../styles/AppColors';

export default function CatalogScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)

  function getCategories() {
    getRequest('getCategores').then(res => {
      let categories = res.data.map(el => {
        return {
          id: el.id,
          title: el.title,
          subcategories: el.get_sub_category.map(el => {
            return { id: el.id, title: el.title, image: el.image };
          })
        };
      });
      setCategories(categories);
      setLoading(false)
    });
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={Styles.container}>
      {loading ? <Loading /> : <ScrollView>
        <View style={styles.blocksContainer}>
          <TouchableOpacity style={styles.blockContainer} onPress={() => navigation.navigate('MonthProductsScreen')}>
            <View style={[styles.block, { backgroundColor: '#E1EBF4' }]}>
              <MonthProducts />
            </View>
            <Text style={styles.blockText}>Продукция месяца</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockContainer} onPress={() => navigation.navigate('PurchaseHistoryScreen')}>
            <View style={[styles.block, { backgroundColor: '#E9E9F2' }]}>
              <MyPurchases />
            </View>
            <Text style={styles.blockText}>Мои покупки</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockContainer} onPress={() => navigation.navigate('FavoritesScreen')}>
            <View style={[styles.block, { backgroundColor: '#F8E1DF' }]}>
              <Myfavorites />
            </View>
            <Text style={styles.blockText}>Избранное</Text>
          </TouchableOpacity>
        </View>
        <CategoriesDropDown data={categories} navigation={navigation} />
      </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height:65,
    width:65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  blockText: {
    textAlign: 'center',
    color: AppColors.BLACK_COLOR,
    fontSize: 14,
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    marginVertical: 15
  },
  blockContainer: {
    width: '30%',
    alignItems: 'center',
    // justifyContent: 'center',
  }

})