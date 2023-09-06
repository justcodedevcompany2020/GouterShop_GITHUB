import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { YellowStarIcon } from "../../../../assets/svgs/HomeSvgs";
import { AppColors } from "../../../styles/AppColors";
import { Styles } from "../../../styles/Styles";


export default function ProductReviewItem({ reviewInfo }) {
    return <View style={styles.container}>
        <Text style={Styles.blackSemiBold18}>{reviewInfo.username}</Text>
        <Text style={[Styles.blackRegular14, { marginVertical: 10 }]}>{reviewInfo.comment}</Text>
        <Text style={Styles.greyRegular14}>{reviewInfo.date}</Text>
        <View style={Styles.flexRow}>
            {[...Array(+reviewInfo.rating)].map((item, i) => <View style={styles.star} key={i} >
                <YellowStarIcon />
            </View>)}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomWidth: 2,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
    },
    star: {
        marginRight: 3,
        marginTop: 5
    }
})