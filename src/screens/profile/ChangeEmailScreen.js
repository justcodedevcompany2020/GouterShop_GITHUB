import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Styles } from "../../styles/Styles";
import { postRequestAuth } from "../../api/RequestHelpers";
import { useSelector } from "react-redux";


export default function ChangeEmailScreen({ navigation }) {
    const { token } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailMsg, setEmailMsg] = useState(false)

    const validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    function onPressSend() {
        setLoading(true)

        if (!email) {
            setEmailError(true)
            setEmailMsg(false)
            setLoading(false)
            return
        } else if (!validateEmail()) {
            setEmailMsg('Введите корректный адрес эл. почты.')
            setEmailError(false)
            setLoading(false)
            return
        } else {
            setEmailError(false)
            setEmailMsg(false)
        }

        postRequestAuth('change_mail_data', token, {
            email: email
        }).then(res => {
            console.log(res);
            if(res.status == true){
                navigation.navigate('EmailVerificationScreen')
            } else if(res.message == 'this is your email' || res.message == 'this is registred email'){
                setEmailMsg('Этот эл. адрес уже зарегистрирован.')
            }
            setLoading(false)
        })
    }

    return <View style={[Styles.container, { paddingTop: 20 }]}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            <Input value={email} setValue={setEmail} placeholder={'Новая эл. почта '} error={emailMsg || emailError} />
            {emailMsg && (
                <Text style={Styles.redRegular12}>
                    {emailMsg}
                </Text>
            )}
            <Button text={'Отправить'} onPress={onPressSend} loading={loading} />
        </ScrollView>
    </View>
}