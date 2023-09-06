import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultIcon } from '../../../assets/svgs/CatalogSvgs';
import { getRequestPagination } from '../../api/RequestHelpers';
import Loading from '../../components/Loading';
import { Styles } from '../../styles/Styles';
import ProductItem from './components/ProductItem';
import Popup from '../../components/Popup';

export default function CategoryScreen({ navigation, route }) {
  const { id, title } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token)
  const [nextUrl, setNextUrl] = useState(`https://kantata.justcode.am/api/get_product_by_subcategory_id/${id}`)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const firstPageUrl = `https://kantata.justcode.am/api/get_product_by_subcategory_id/${id}`
  const [isLoading, setIsLoading] = useState()
  const [productsCount, setProductsCount] = useState()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true)
      getProducts()
    });
    return unsubscribe;
  }, [navigation]);

  function getProducts(refresh) {
    getRequestPagination(refresh ? firstPageUrl : nextUrl, token).then(res => {
      setProductsCount(res.data_count)
      const myProducts = res.data.data.map(el => {
        return {
          id: el.id,
          productName: el.title,
          subcategory: title,
          price: el.price,
          description: el.description,
          degreeOfRoast: el.degreeOfRoast,
          compound: el.compound,
          images: el.get_product_image.map(e => e.image),
          isFavorite: token && el.get_favorites_authuser?.length > 0 ? true : false,
          reviewCount: el.review_count,
          rating: el.review_avg_stars ?? 5,
          newPrice: el.discount
        };
      })
      refresh ? setProducts(myProducts) : setProducts([...products, ...myProducts]);
      setNextUrl(res.data.next_page_url)
      setIsRefreshing(false);
      setLoading(false);
      setIsLoading(false);
    });
  }

  const handleLoadMore = () => {
    if (nextUrl) {
      setIsLoading(true)
      getProducts()
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setProducts([])
    setProductsCount(null)
    getProducts('refresh')
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
      ) : (
        <>
          <View style={[Styles.flexRowJustifyBetween, { padding: 20 }]}>
            <Text style={Styles.greyRegular14}>Товаров: {productsCount}</Text>
            <TouchableOpacity style={Styles.flexRow}>
              <DefaultIcon />
              <Text style={[Styles.greyRegular14, { marginLeft: 5 }]}>
                По умолчанию
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 20 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={products}
            numColumns={2}
            renderItem={(item, i) => (
              <ProductItem
                productInfo={item.item}
                products={products}
                setProducts={setProducts}
                navigation={navigation}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            ListFooterComponent={renderFooter}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </>
      )}
      <Popup
        showPopup={showPopup}
        title={'Добавлено в корзину'}
        text={''}
        btnText={'Ок'}
        onPressBtn={() => setShowPopup(false)}
      />
    </View>
  );
}
