import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CheckMark } from "../../../../assets/svgs/HomeSvgs";
import Button from "../../../components/Button";
import SearchInput from "../../../components/SearchInput";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getRequest, postRequestPaginationAuth } from "../../../api/RequestHelpers";

export default function ReviewAboutGalleryScreen({ navigation }) {
    const [searchValue, setSearchValue] = useState()
    const [loading, setLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://kantata.justcode.am/api/search_gallery')
    const firstPageUrl = 'https://kantata.justcode.am/api/search_gallery'
    const [isLoading, setIsLoading] = useState()
    const token = useSelector(state => state.auth.token)
    const [selectedGalleryIds, setSelectedGalleryIds] = useState([])

    useEffect(() => {
        onSearch()
    }, [])

    function getAllGalleries() {
        getRequest('get_all_galleries').then(res => {
            let myShops = []
            res.data.forEach(element => {
                let galleryShops = element.get_shops.map(el => ({
                    id: el.id,
                    name: el.title,
                    address: el.address,
                    isSelected: false
                }))
                myShops.push(...galleryShops)
            });
            setGalleries(myShops)
            setLoading(false)
        })
    }

    function onSearch(value, loadmore) {
        let myValue = value
        setSearchValue(value)
        setLoading(true)

        postRequestPaginationAuth(loadmore ? nextUrl : firstPageUrl, {
            search_text: myValue,
        }, token).then(([status, body]) => {
            if (status === 200) {
                const myGalleries = body.data.data.map(el => ({
                    id: el.id,
                    name: el.title,
                    address: el.address,
                    isSelected: false
                }))
                loadmore ? setGalleries([...galleries, ...myGalleries]) : setGalleries(myGalleries) 
                setNextUrl(body.data.next_page_url)
            } else setGalleries([])

            setLoading(false);
            setIsLoading(false)
        });
    }

    const handleLoadMore = () => {
        if (nextUrl) {
            setIsLoading(true)
            onSearch(undefined, 'loadmore')
        }
    };

    const renderFooter = () => {
        return <>
            {isLoading ? <View style={{ marginBottom: 30 }}>
                <Loading />
            </View> : null}
            {selectedGalleryIds.length ? <View style={{ height: 70 }} /> : null}
        </>
    };

    function onSelectItem(productInfo) {
        const updatedProducts = galleries.map(item => {
            if (item.id === productInfo.id) {
                item.isSelected ?
                    setSelectedGalleryIds(selectedGalleryIds.filter(id => id !== productInfo.id)) :
                    setSelectedGalleryIds([...selectedGalleryIds, productInfo.id])
                return { ...item, isSelected: item.isSelected ? false : true }
            }
            return item;
        });
        setGalleries(updatedProducts);
    }



    return <View style={[Styles.container, { paddingTop: 20 }]}>
        <SearchInput value={searchValue} onChangeValue={onSearch} placeholder={'Поиск...'} />
        {(loading ? (
            <Loading />
        ) : searchValue && galleries.length === 0 ? (
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
                data={galleries}
                renderItem={(item, i) => <GalleryItem galleryInfo={item.item} key={i} onPress={onSelectItem} />}
                keyExtractor={(item, i) => i}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={1}
                ListFooterComponent={renderFooter}
            />
        ))}
        {selectedGalleryIds.length > 0 && < View style={Styles.absoluteButton}>
            <Button text={'Далее'} backgroundColor={AppColors.GREEN_COLOR} onPress={() => navigation.navigate('LeaveAReviewScreen', {selectedIds: selectedGalleryIds, reviewType: 'Gallery'})} />
        </View>}
    </View >
}

function GalleryItem({ galleryInfo, onPress }) {
    return <TouchableOpacity style={[Styles.flexRowJustifyBetween, { borderBottomWidth: 2, borderColor: AppColors.WHITE_SMOKE_COLOR, paddingVertical: 10, paddingRight: 5 }]} onPress={() => onPress(galleryInfo)}>
        <View>
            <Text style={Styles.blackSemiBold16}>{galleryInfo.name}</Text>
            <Text style={Styles.greyRegular14} >{galleryInfo.address}</Text>
        </View>
        {galleryInfo.isSelected && <CheckMark />}
    </TouchableOpacity>
}