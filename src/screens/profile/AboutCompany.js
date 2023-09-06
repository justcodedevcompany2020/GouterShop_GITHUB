import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../../styles/Styles";
import { useState } from "react";
import { getRequest, getRequestAuth } from "../../api/RequestHelpers";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AboutCompany() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    async function getCompanyInfo() {
        const myToken = await AsyncStorage.getItem('token')
        getRequestAuth('get_company_info', myToken).then(res => {
            console.log(res);
            setLoading(false)
            setData(res.data)
        })
    }

    useEffect(() => {
        //todotun
        getCompanyInfo()
    }, [])

    return <View style={Styles.container}>
        {loading ? <Loading /> : <WebView
            originWhitelist={['*']}
            source={{ html: data}}
            allowFileAccess={true}
            scalesPageToFit={true}
            
        />}
        {/* <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={[Styles.blackRegular20, { marginVertical: 20 }]}>Кантата</Text>
            <Text style={Styles.blackRegular15}>Мы вынуждены отталкиваться от того, что выбранный нами инновационный путь не даёт нам иного выбора, кроме определения прогресса профессионального сообщества. Вот вам яркий пример современных тенденций — социально-экономическое развитие предполагает независимые способы реализации соответствующих условий активизации. В своём стремлении улучшить пользовательский опыт мы упускаем, что стремящиеся вытеснить традиционное производство, нанотехнологии, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут преданы социально-демократической анафеме.</Text>
        </ScrollView> */}
    </View>
}