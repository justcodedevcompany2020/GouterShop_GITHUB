import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getRequest} from '../../api/RequestHelpers';
import {AppColors} from '../../styles/AppColors';
import {Styles} from '../../styles/Styles';
import MapScreen from './MapScreen';
import ShopsList from './ShopsList';
import Loading from '../../components/Loading';

export default function ShopsScreen({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [cities, setCities] = useState();
  const [galleries, setGalleries] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // getCities();
    getGalleries();
  }, []);

  function getCities() {
    getRequest('get_cities').then(res => {
      let cities = res.data.map(el => ({city: el.city, id: el.id}));
      setCities(cities);
    });
  }

  function getGalleries() {
    getRequest(`get_gallery_by_city/2`).then(res => {
      let galleries = res.data.map(e => ({
        id: e.id,
        title: e.title,
        state: e.color,
        shops: e.get_shops.map(el => ({
          id: el.id,
          galleryId: el.gallery_id,
          cityId: el.city_id,
          title: el.title,
          address: el.address,
          phone: el.phone,
          image: el.image,
          workTime: el.work_time,
          description: el.text,
          lat: el.lat,
          lon: el.lon,
        })),
      }));
      setGalleries(galleries)
      setLoading(false)
    });
  }

  return (
    <View style={[Styles.container, {marginTop: 0, paddingTop: 60}]}>
      <Text style={[Styles.blackSemiBold20, {textAlign: 'center'}]}>
        Магазины
      </Text>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedIndex === 0 && {backgroundColor: AppColors.WHITE_COLOR},
            ]}
            onPress={() => setSelectedIndex(0)}>
            <Text style={[Styles.blackRegular14, {textAlign: 'center'}]}>
              Карта
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedIndex === 1 && {backgroundColor: AppColors.WHITE_COLOR},
            ]}
            onPress={() => setSelectedIndex(1)}>
            <Text style={[Styles.blackRegular14, {textAlign: 'center'}]}>
              Список
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedIndex === 0 ? (
        <MapScreen />
      ) : loading ?  <Loading/>  : <ShopsList navigation={navigation} data={galleries}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    backgroundColor: AppColors.WHITE_SMOKE_COLOR,
    height: 40,
    marginTop: 40,
    padding: 2,
    marginBottom: 20,
  },
  tab: {
    width: '50%',
    borderRadius: 5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
