import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Popup from "../../components/Popup";
import { Styles } from "../../styles/Styles";
import { postRequestAuth } from "../../api/RequestHelpers";
import { useSelector } from "react-redux";


export default function EmailVerificationScreen({ navigation }) {
    const { token } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [codeMsg, setCodeMsg] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    function onPressOk() {
        navigation.popToTop();
        navigation.navigate('Profile');
        setShowPopup(false);
    }

    function onPressConfirm() {
        setLoading(true)
        if (!code) {
            setCodeError(true)
            setCodeMsg(false)
            setLoading(false)
            return
        } else if (code.length < 4) {
            setCodeMsg('Код безопасности должен содержать не менее 4-ти символов.')
            setCodeError(false)
            setLoading(false)
            return
        } else {
            setCodeError(false)
            setCodeMsg(false)
        }

        postRequestAuth('update_mail', token, {
            remember_token: code
        }).then(res => {
            console.log(res)
            if(res.status == true){
                setShowPopup(true)
            } else if(res.message == 'not valid remember_code'){
                setCodeMsg('Неверный код')
            }
            setLoading(false)
        })
    }

    return <View style={[Styles.container, { paddingTop: 20 }]}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={[Styles.greyRegular16, { textAlign: 'center', marginBottom: 20 }]}>Введите код безопасности для подтверждения эл. почты</Text>
            <Input value={code} setValue={setCode} placeholder={'Код безопасности'} inputType={'code'} error={codeError || codeMsg} />
            {codeMsg && <Text style={Styles.redRegular12}>{codeMsg}</Text>}
            <Button text={'Подтвердить'} onPress={onPressConfirm} loading={loading}/>
        </ScrollView>
        <Popup showPopup={showPopup} title={'Ваша эл. почта успешно изменена'} text={''} btnText={'Ок'} onPressBtn={onPressOk} />
    </View>
}