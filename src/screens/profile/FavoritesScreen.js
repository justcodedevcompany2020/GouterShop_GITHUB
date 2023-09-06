import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { WhiteArrowRight } from '../../../assets/svgs/HomeSvgs';
import { getRequestPagination, postRequestAuth } from '../../api/RequestHelpers';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { Styles } from '../../styles/Styles';
import ProductItem from '../catalog/components/ProductItem';

export function FavoritesScreen({ navigation }) {
  const token = useSelector(state => state.auth.token);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(`https://kantata.justcode.am/api/get_favorites`)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const firstPageUrl = `https://kantata.justcode.am/api/get_favorites`
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true)
      getFavorites('refresh');
    });
    return unsubscribe;
  }, [navigation]);
  function getFavorites(refresh) {
    getRequestPagination(refresh ? firstPageUrl : nextUrl, token).then(res => {
      let myProducts = res.data.data.filter((el) => {
        if (!el.get_product) {
          return false;
        }
        return true;
      }).map(el => ({
        id: el.get_product.id,
        productName: el.get_product.title,
        subcategory: el.get_product.get_subcategory.title,
        price: el.get_product.price,
        images: el.get_product.get_product_image.map(e => e.image),
        rating: el.review_avg_stars,
        newPrice: el.get_product.discount
      }));

      refresh ? setFavorites(myProducts) : setFavorites([...favorites, ...myProducts]);
      setNextUrl(res.data.next_page_url)
      setLoading(false);
      setIsLoading(false);
      setIsRefreshing(false);
    });
  }

  async function onPressDelete(item) {
    await postRequestAuth('remove_favorite', token, {
      product_id: item.id,
    }).then(res => {
      if (res.status) {
        let index = favorites.indexOf(item);
        if (index !== -1)
          setFavorites([
            ...favorites.slice(0, index),
            ...favorites.slice(index + 1, favorites.length),
          ]);
      }
    })
  }

  const handleLoadMore = () => {
    if (nextUrl) {
      setIsLoading(true)
      getFavorites()
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getFavorites('refresh')
  };

  const renderFooter = () => {
    return isLoading ? <View style={{ marginBottom: 30 }}>
      <Loading />
    </View> : null
  };
  return (
    <View style={Styles.container}>
      {loading ? (
        <Loading />
      ) : favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20, marginBottom: 80, paddingTop: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={favorites}
          numColumns={2}
          renderItem={(item, i) => (
            <ProductItem
              productInfo={item.item}
              favoritesMode
              navigation={navigation}
              onPressCross={onPressDelete}
              key={i}
            />
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1.5}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <Text
          style={[Styles.greyRegular16, { textAlign: 'center', marginTop: 20 }]}>
          Ничего не найдено
        </Text>
      )}
      <View style={Styles.absoluteButton}>
        <Button
          text={'Весь каталог'}
          Icon={WhiteArrowRight}
          onPress={() => navigation.navigate('CatalogNavigator', { screen: 'CatalogScreen' })}
        />
      </View>
    </View>
  );
}