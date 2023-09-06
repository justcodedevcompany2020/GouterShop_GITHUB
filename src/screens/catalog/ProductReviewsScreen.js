import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { YellowStarIcon } from '../../../assets/svgs/CatalogSvgs';
import { getRequest } from '../../api/RequestHelpers';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import ProductReviewItem from './components/ProductReviewItem';

export default function ProductReviewsScreen({ navigation, route }) {
  const { id } = route.params;
  const [reviewsInfo, setReviewsInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductReviews();
  }, []);

  function getProductReviews() {
    getRequest(`get_product_reviews/${id}`).then(res => {
      let reviewInfo = {
        productName: res.data.title,
        subcategoryName: res.data.get_subcategory.title,
        rating: res.data.review_avg_stars,
        reviews: res.data.review.map(el => ({
          username: el.user_name,
          comment: el.text,
          rating: el.stars,
          date: new Date(el.created_at).toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        })),
      };
      setReviewsInfo(reviewInfo);
      setLoading(false);
    });
  }

  return (
    <View style={Styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView>
            <View style={styles.productInfo}>
              <Text style={Styles.blackSemiBold20}>
                {reviewsInfo.productName}
              </Text>
              <Text style={[Styles.greyRegular14, { marginVertical: 5 }]}>
                {reviewsInfo.subcategoryName}
              </Text>
              <View style={Styles.flexRow}>
                <YellowStarIcon />
                <Text style={styles.rating}>{reviewsInfo.rating} </Text>
              </View>
            </View>
            {reviewsInfo &&
              reviewsInfo.reviews.map((item, i) => (
                <ProductReviewItem reviewInfo={item} key={i} />
              ))}
            <View style={{ height: 80 }} />
          </ScrollView>
          <View style={Styles.absoluteButton}>
            <Button
              text={'Оставить отзыв '}
              onPress={() => navigation.navigate('ReviewsNavigator', { screen: 'LeaveAReviewScreen', params: { selectedIds: [id], reviewType: 'Product' } },)}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    color: AppColors.YELLOW_COLOR,
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 4,
  },
  productInfo: {
    padding: 20,
    borderBottomWidth: 2,
    borderColor: AppColors.WHITE_SMOKE_COLOR,
  },
});
