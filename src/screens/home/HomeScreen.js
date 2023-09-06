import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { WhiteArrowRight } from '../../../assets/svgs/HomeSvgs';
import { getRequest, url } from '../../api/RequestHelpers';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { Styles } from '../../styles/Styles';
import FeedBlock from './components/FeedBlock';
import ProServicesContainer from './components/ProServicesContainer';
import ReviewsBlock from './components/ReviewsBlock';
import DiscountBlock from './components/DiscountBlock';
import Slider from './components/Slider';
import StoriesBlock from './components/StoriesBlock';
import SectionsBlock from './components/SectionsBlock';
import MonthProducts from './components/MonthProducts';
import { RefreshControl } from 'react-native';
import { AppColors } from '../../styles/AppColors';
import SplashScreen from 'react-native-splash-screen';

export default function HomeScreen({ navigation }) {
  const [sliderImages, setSliderImages] = useState([]);
  const [discountInfo, setDiscountInfo] = useState([]);
  const [stories, setStories] = useState([]);
  const [news, setNews] = useState([]);
  const [sections, setSections] = useState({})
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true)
  const [monthProducts, setMonthProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getHomeData()
  }, []);

  function getHomeData() {
    getRequest('get_home_page_data').then(res => {
      setSliderImages(res.slider)

      setStories(res.histores.filter((el) => {
        if (!el.history_image.length) {
          return false
        } else return true
      }).map((el, i) => ({
        id: el.id,
        user_id: i,
        user_name: el.title,
        user_image: `${url}uploads/${el.history_image[0].image}`,
        stories: el.history_image.map((el, i) => ({
          story_id: i,
          story_image: `${url}uploads/${el.image}`
        })),
      })))

      setSections(res.sections.map(el => ({
        id: el.id,
        title: el.title,
        products: el.get_product.map(e => ({
          id: e.id,
          productName: e.title,
          subcategory: e.get_subcategory.title,
          price: e.price,
          images: e.get_product_image.map(e => e.image),
          newPrice: e.discount,
          rating: e.averageReview
        })),
      })))

      setDiscountInfo(res.stocks.map(el => ({
        id: el.id,
        img: el.image,
        long_description: el.long_description,
        short_description: el.short_description,
        title: el.title,
      })))

      setNews(res.news_list.map(el => ({
        id: el.id,
        image: el.image,
        title: el.title,
        news: el.get_news.map(e => ({
          id: e.id,
          image: e.image,
          longText: e.longText,
          shortText: e.short_text,
          shortTextTitle: e.short_text_title,
        }
        )),
      })))

      setReviews(res.reviews.filter((el) => {
        if (!el.get_product) {
          return false
        } else return true
      }).map(el => ({
        username: el.user_name,
        comment: el.text,
        date: new Date(el.created_at).toLocaleDateString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        productInfo: {
          productName: el.get_product.title,
          id: el.get_product.id,
          subcategory: el.get_product.get_subcategory.title,
          images: el.get_product.get_product_image.map(e => e.image),
        },
      })))

      setMonthProducts(res.discount.map(el => ({
        id: el.id,
        productName: el.title,
        subcategory: el.get_subcategory.title,
        price: el.price,
        images: el.get_product_image.map(el => el.image),
        newPrice: el.discount,
        rating: el.review_avg_stars ?? 5
      })))
      SplashScreen.hide()
      setLoading(false)
      setRefreshing(false);
    })
  }



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHomeData()
  }, []);


  return (
    <View style={Styles.container}>
      <ScrollView
        style={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[AppColors.GREEN_COLOR]} />
        }>
        {loading ? <Loading /> : (refreshing ? null :
          <>
            <Slider images={sliderImages} />
            <StoriesBlock navigation={navigation} stories={stories} />
            <SectionsBlock navigation={navigation} sections={sections} />
            <MonthProducts navigation={navigation} monthProducts={monthProducts} />
            <DiscountBlock navigation={navigation} data={discountInfo} />
            <ProServicesContainer />
            <FeedBlock navigation={navigation} data={news} />
            <ReviewsBlock data={reviews} navigation={navigation} />
          </>)
        }
      </ScrollView>
      <View style={Styles.absoluteButton}>
        <Button
          text={'Весь каталог'}
          Icon={WhiteArrowRight}
          onPress={() => navigation.navigate('CatalogNavigator', {screen: 'CatalogScreen'})}
        />
      </View>
    </View>
  );
}