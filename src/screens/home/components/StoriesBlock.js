import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { url } from "../../../api/RequestHelpers";
import { AppColors } from "../../../styles/AppColors";
import TitleAll from "./TitleAll";
import InstaStory from "react-native-insta-story";
import { Image } from "react-native";

export default function StoriesBlock({ navigation, stories }) {

    return <View>
        <TitleAll title={'Истории'} hideAll />
        <InstaStory
            pressedAvatarTextColor={'black'}
            avatarSize={90}
            storyImageStyle={{resizeMode: 'contain'}}  
            avatarImageStyle={{ borderRadius: 15 }}
            avatarWrapperStyle={{ borderRadius: 15, borderWidth: 0 }}
            avatarTextStyle={{ fontSize: 14 }}
            renderCloseComponent={({ item, onPress }) => (
                <TouchableOpacity onPress={onPress}>
                    <Image source={require('../../../../assets/pngs/home/close.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            )}
            swipeText=""
            data={stories}
            duration={5}
        />
    </View>
}


const styles = StyleSheet.create({
    categoryContainer: {
        borderRadius: 10,
        marginRight: 8,
    },
    image: {
        width: 90,
        height: 90,
        justifyContent: 'flex-end',
    },
    categoryName: {
        color: AppColors.WHITE_COLOR,
        fontSize: 12,
        fontFamily: 'OpenSans-SemiBold',
        padding: 8,
    },
    blackBack: {
        backgroundColor: '#00000050',
        borderRadius: 10,
        height: '100%',
        justifyContent: 'flex-end'
    },
});