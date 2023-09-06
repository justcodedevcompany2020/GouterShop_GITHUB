import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";
import { postRequestAuth } from "../../../api/RequestHelpers";
import { useSelector } from "react-redux";
export default function LeaveAReviewScreen({ navigation, route }) {
    const { selectedIds, reviewType } = route.params
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')
    const token = useSelector(state => state.auth.token)
    const [loading, setLoading] = useState(false)

    function addReview() {
        setLoading(true)
        postRequestAuth('add_review', token, {
            object_id: selectedIds,
            review_type: reviewType,
            comment: comment,
            starsCount: rating
        }).then(res => {
            if (res.status) {
                navigation.replace('ReviewsScreen')
                setLoading(false)
            }
        })
    }

    return <View style={Styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={[Styles.blackSemiBold20, { marginVertical: 20 }]}>Комментарий</Text>
            <Input placeholder={'Напишите отзыв'} value={comment} setValue={setComment} multiline/>
            <Text style={[Styles.blackSemiBold20, { marginBottom: 10 }]}>Оценка</Text>
            <View style={Styles.flexRow}>
                {[...Array(rating)].map((e, i) => (
                    <TouchableOpacity
                    style={{marginRight: 5}}
                        onPress={() => {
                            setRating(i + 1);
                        }}
                        key={i}>
                        <Image source={require('../../../../assets/pngs/star.png')} style={{width: 35, height: 35}}/>
                    </TouchableOpacity>
                ))}
                {[...Array(5 - rating)].map((e, i) => (
                    <TouchableOpacity
                    style={{marginRight: 5}}
                        onPress={() => {
                            setRating(rating + i + 1);
                        }}
                        key={i}>
                        <Image source={require('../../../../assets/pngs/starGrey.png')} style={{width: 35, height: 35}}/>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
        {rating > 0 && <View style={Styles.absoluteButton}>
            <Button text={'Отправить'} backgroundColor={AppColors.GREEN_COLOR} onPress={token ? addReview : () => navigation.navigate('Profile')} loading={loading} />
        </View>}
    </View>
}