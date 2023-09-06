import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import Button from "../../components/Button";
import { Styles } from "../../styles/Styles";
import ProductItem from "../catalog/components/ProductItem";
import { useSelector } from "react-redux";
import { getRequestPagination, postRequestAuth } from "../../api/RequestHelpers";
import Loading from "../../components/Loading";
import { useEffect } from "react";

export default function PurchaseHistoryScreen({ navigation }) {
  const { token } = useSelector(state => state.auth)
  const [nextUrl, setNextUrl] = useState(`https://kantata.justcode.am/api/get_orders`)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const firstPageUrl = `https://kantata.justcode.am/api/get_orders`
  const [isLoading, setIsLoading] = useState()
  const [loading, setLoading] = useState(true);
  const [purchasesInfo, setPurchasesInfo] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true)
      getOrders('refresh');
    });
    return unsubscribe;
  }, [navigation]);

  function getOrders(refresh) {
    getRequestPagination(refresh ? firstPageUrl : nextUrl, token).then(res => {
      let products = []
      res.data.data.forEach((element, i) => {
        let myProducts = element.get_order_products.map(el => ({
          id: el.id + i,
          productName: el.title,
          subcategory: el.get_subcategory.title,
          price: el.price,
          images: el.get_product_image.map(e => e.image),
          rating: el.review_avg_stars ?? 5,
          newPrice: el.discount,
          date: new Date(element.delivery_date).toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          orderId: el.pivot.order_id,
          productId: el.id
        }));
        products.push(...myProducts)
      })
      refresh ? setPurchasesInfo(products) : setPurchasesInfo([...purchasesInfo, ...products]);
      setNextUrl(res.data.next_page_url)
      setIsRefreshing(false);
      setLoading(false);
      setIsLoading(false);
    });
  }

  const handleLoadMore = () => {
    if (nextUrl) {
      setIsLoading(true)
      getOrders()
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPurchasesInfo([])
    getOrders('refresh')
  };

  const renderFooter = () => {
    return isLoading ? <View style={{ marginBottom: 30 }}>
      <Loading />
    </View> : null
  };

  async function onPressDelete(item) {
    await postRequestAuth('delete_orders_by_product_id', token, {
      order_id: item.orderId,
      product_id: item.productId
    }).then(res => {
      if (res.status) {
        let index = purchasesInfo.indexOf(item);
        if (index !== -1)
          setPurchasesInfo([
            ...purchasesInfo.slice(0, index),
            ...purchasesInfo.slice(index + 1, purchasesInfo.length),
          ]);
      }
    })
  }


  return <View style={Styles.container}>
    {loading ? <Loading /> : purchasesInfo.length > 0 ? <FlatList
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      data={purchasesInfo}
      numColumns={2}
      renderItem={(item, i) => (
        <ProductItem
          productInfo={item.item}
          navigation={navigation}
          historyMode
          onPressCross={onPressDelete}
          key={i}
        />
      )}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={1}
      ListFooterComponent={renderFooter}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={[Styles.greySemiBold24, { textAlign: 'center' }]}>История покупок пуста</Text>
      <Text style={[Styles.greySemiBold12, { textAlign: 'center', marginVertical: 15 }]}>Выбирайте товары из католога или из списка избранных</Text>
      <Button text={'Перейти в избранное'} width={'100%'} marginBottom={10} onPress={() => navigation.navigate('FavoritesScreen')} />
      <Button text={'Выбрать из каталога'} width={'100%'} noFill onPress={() => navigation.navigate('CatalogNavigator', {screen: 'CatalogScreen'})} />
    </View>}
  </View>
}