import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Styles } from '../../styles/Styles';
import SearchInput from '../../components/SearchInput';
import HorizontalProductItem from './components/HorizontalProductItem';
import Loading from '../../components/Loading';
import { postRequestPaginationAuth } from '../../api/RequestHelpers';
import { useSelector } from 'react-redux';

export default function ProductSearchScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://kantata.justcode.am/api/search_product')
  const firstPageUrl = 'https://kantata.justcode.am/api/search_product'

  const [isLoading, setIsLoading] = useState()
  const token = useSelector(state => state.auth.token)

  function onSearch(value) {
    let myValue = value

    if (value) {
      setSearchValue(value)
    }

    //load more-y chi
    if (value != undefined) {
      //datarka
      if (!value) {
        setSearchValue(value)
        return
      }
      setLoading(true);
    } else {
      myValue = searchValue
    }

    postRequestPaginationAuth(value ? firstPageUrl : nextUrl, {
      search_text: myValue,
    }, token).then(([status, body]) => {
      if (status === 200) {
        const myProducts = body.data.data.map(e => ({
          id: e.id,
          productName: e.title,
          subcategory: e.get_subcategory.title,
          images: e.get_product_image.map(e => e.image),
        }))
        value ? setProducts(myProducts) : setProducts([...products, ...myProducts])
        setNextUrl(body.data.next_page_url)
      } else setProducts([])
      setLoading(false)
      setIsLoading(false)
    })
  }

  const handleLoadMore = () => {
    if (nextUrl) {
      setIsLoading(true)
      onSearch()
    }
  };

  const renderFooter = () => {
    return isLoading ? <View style={{ marginBottom: 30 }}>
      <Loading />
    </View> : null
  };


  return (
    <View style={Styles.container}>
      <Text style={[Styles.blackRegular22, { margin: 20 }]}>Выберите товар</Text>
      <SearchInput
        value={searchValue}
        onChangeValue={onSearch}
        placeholder={'Поиск...'}
      />
      {searchValue &&
        (loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <Text
            style={[
              Styles.greyRegular16,
              { textAlign: 'center', marginTop: 20 },
            ]}>
            Ничего не найдено
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 20 }}
            data={products}
            renderItem={(item, i) => <HorizontalProductItem productInfo={item.item} key={i} navigation={navigation} onPress={() => navigation.navigate('ProductScreen', { productId: item.item.id })} />}
            keyExtractor={item => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            ListFooterComponent={renderFooter}
          />
        ))}
    </View>
  );
}
