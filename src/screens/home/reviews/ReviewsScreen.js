import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import Button from "../../../components/Button";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import ReviewItem from "./ReviewItem";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import { getRequest, getRequestPagination } from "../../../api/RequestHelpers";
export default function ReviewsScreen({ navigation, route }) {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState()
    const [nextUrl, setNextUrl] = useState('https://kantata.justcode.am/api/get_all_reviews/Product')
    const [isRefreshing, setIsRefreshing] = useState(false);
    const firstPageUrl = 'https://kantata.justcode.am/api/get_all_reviews/Product'

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            getReviews()
        });
        return unsubscribe;
    }, [navigation]);

    function getReviews(refresh) {
        getRequestPagination(refresh ? firstPageUrl : nextUrl).then(res => {
            console.log(res.data.data[0]);
            const myReviews = res.data.data.filter((el)=> {
                if(!el.get_product){
                  return false
                } else return true
              }).map(el => ({
                id: el.id,
                username: el.user_name,
                comment: el.text,
                rating: +el.stars,
                date: new Date(el.created_at).toLocaleDateString('ru', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
                productInfo: {
                    productName: el.get_product.title,
                    id: el.get_product.id,
                    subcategory: el.get_product.get_subcategory.title,
                    price: el.get_product.price,
                    images: el.get_product.get_product_image.map(e => e.image),
                },
            }))
            refresh ? setReviews(myReviews) : setReviews([...reviews, ...myReviews]);
            setNextUrl(res.data.next_page_url)
            setLoading(false);
            setIsRefreshing(false);
            setLoading(false);
            setIsLoading(false);
        });
    }

    const handleLoadMore = () => {
        if (nextUrl) {
            setIsLoading(true)
            getReviews()
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setReviews([])
        getReviews('refresh')
    };

    const renderFooter = () => {
        return <View style={{ marginBottom: 70 }}>
            {isLoading ? <View style={{ marginBottom: 30 }}>
                <Loading />
            </View> : null}
        </View>
    };
    
    return <View style={Styles.container}>
        {loading ? <Loading /> :
            <FlatList
                showsVerticalScrollIndicator={false}
                data={reviews}
                renderItem={(item, i) => <ReviewItem navigation={navigation} reviewInfo={item.item} />}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={1}
                ListFooterComponent={renderFooter}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
            />
        }
        <View style={Styles.absoluteButton}>
            <Button text={'Оставить отзыв'} backgroundColor={AppColors.PURPLE_COLOR} onPress={() => navigation.navigate('LeaveAReviewAboutScreen')} />
        </View>
    </View>
}