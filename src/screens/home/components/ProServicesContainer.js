import React from "react";
import { Image, View } from "react-native";

export default function ProServicesContainer() {
    return <View style={{marginHorizontal: 20}}>
        <Image source={require('../../../../assets/pngs/home/ProService.png')} style={{ width: '100%', height: 170, borderRadius: 10, marginTop: 30 }} />
        <Image source={require('../../../../assets/pngs/home/ProService.png')} style={{ width: '100%', height: 170, borderRadius: 10, marginTop: 30 }} />
        <Image source={require('../../../../assets/pngs/home/ProService.png')} style={{ width: '100%', height: 170, borderRadius: 10, marginTop: 30 }} />
    </View>
}

