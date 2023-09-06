import React from "react";
import { ScrollView, View } from "react-native";
import { Styles } from "../../../styles/Styles";
import PostItem from "./PostItem";

export default function FeedScreen({ navigation, route }) {
    const {data} = route.params

    return <View style={Styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            {data.map((item, i) => <PostItem postInfo={item} key={i} onPressItem={() => navigation.navigate('PostSingleScreen', { title: item.title, item: item.news })} />)}
        </ScrollView>
    </View>
}
