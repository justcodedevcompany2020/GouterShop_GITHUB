import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { url } from "../../../api/RequestHelpers";
import { Styles } from "../../../styles/Styles";
import TitleAll from "./TitleAll";

export default function FeedBlock({navigation, data}) {
    return <>
        <TitleAll title={'Лента'} onPressAll={() => navigation.navigate('FeedNavigator', {screen: 'FeedScreen', params: {data: data}})} />
        <ScrollView horizontal style={{ marginLeft: 20 }} showsHorizontalScrollIndicator={false}>
            {data.map((item, i) => <View style={{marginRight: 10, marginBottom: 5, width: 190}} key={i}>
                <Image source={{uri: `${url}uploads/${item.image}`}} style={{ width: 190, height: 115, borderRadius: 10, marginBottom: 10 }} />
                <Text style={Styles.blackSemiBold14}>{item.title}</Text>
            </View>)}
        </ScrollView>
    </>
}

