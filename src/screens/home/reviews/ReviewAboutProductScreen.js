import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "../../../components/Button";
import SearchInput from "../../../components/SearchInput";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import HorizontalProductItem from "../../catalog/components/HorizontalProductItem";
import Loading from "../../../components/Loading";
import { postRequestPaginationAuth } from "../../../api/RequestHelpers";
import { useSelector } from "react-redux";


export default function ReviewAboutProductScreen({ navigation }) {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://kantata.justcode.am/api/search_product')
    const firstPageUrl = 'https://kantata.justcode.am/api/search_product'

    const [isLoading, setIsLoading] = useState()
    const token = useSelector(state => state.auth.token)
    
    const [selectedProductIds, setSelectedProductIds] = useState([])
    
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
                    isSelected: false,
                    reviewAlreadyLeft: token && e.auth_user_review.length > 0 ? true : false
                }))
                value ? setProducts(myProducts) : setProducts([...products, ...myProducts])
                setNextUrl(body.data.next_page_url)
            } else setProducts([])
            setLoading(false);
            setIsLoading(false)
        });
    }

    const handleLoadMore = () => {
        if (nextUrl) {
            setIsLoading(true)
            onSearch()
        }
    };

    const renderFooter = () => {
        return <>
            {isLoading ? <View style={{ marginBottom: 30 }}>
                <Loading />
            </View> : null}
            {selectedProductIds.length ? <View style={{ height: 70 }} /> : null}
        </>
    };

    function onSelectItem(productInfo) {
        const updatedProducts = products.map(item => {
            if (item.id === productInfo.id) {
                item.isSelected ?
                    setSelectedProductIds(selectedProductIds.filter(id => id !== productInfo.id)) :
                    setSelectedProductIds([...selectedProductIds, productInfo.id])
                return { ...item, isSelected: item.isSelected ? false : true }
            }
            return item;
        });
        setProducts(updatedProducts);
    }

    return <View style={[Styles.container, { paddingTop: 20 }]}>
        <SearchInput value={searchValue} onChangeValue={onSearch} placeholder={'Поиск...'} />
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
                    renderItem={(item, i) => <HorizontalProductItem productInfo={item.item} key={i} hideBasket selectMode onPress={onSelectItem} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={1}
                    ListFooterComponent={renderFooter}
                />
            ))}
        {selectedProductIds.length > 0 && <View style={Styles.absoluteButton}>
            <Button text={'Далее'} backgroundColor={AppColors.GREEN_COLOR} onPress={() => navigation.navigate('LeaveAReviewScreen', { selectedIds: selectedProductIds, reviewType: 'Product' })} />
        </View>}
    </View>
}