import React, { useState } from "react";
import { Text, View } from "react-native";
import { postRequest } from "../../../api/RequestHelpers";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { Styles } from "../../../styles/Styles";
import Popup from "../../../components/Popup";

export default function NewPasswordScreen({ navigation, route }) {
    const { email, code } = route.params
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)
    const [errors, setErrors] = useState({
        pass: false,
        confirmPass: false,
    });
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    function onPressConfirm() {
        navigation.popToTop();
        setShowPopup(false);
    }

    function updatePass() {
        setLoading(true)
        let isValid = validateData()
        isValid ? postRequest('update_password', {
            email: email,
            remember_code: code,
            password: newPass,
            password_confirmation: confirmPass
        }).then(([status, body]) => {
            console.log(status, body);
            if (status === 200) {
                setShowPopup(true)
            }
            setLoading(false)
        }) : setLoading(false)
    }

    function validateData() {
        let myErrors = { ...errors };
        let error = false;

        if (!newPass) {
            myErrors.pass = true;
            error = true;
            setPassError(false);
        } else if (newPass.length < 6) {
            error = true;
            setPassError(true);
        } else {
            myErrors.pass = false;
            setPassError(false);
        }

        if (!confirmPass) {
            myErrors.confirmPass = true;
            error = true;
        } else {
            myErrors.confirmPass = false;
        }

        if (!error && newPass !== confirmPass) {
            error = true
            setConfirmPassError(true)
        } else {
            setConfirmPassError(false)
        }

        setErrors(myErrors);
        return !error;
    }

    return (
        <View style={Styles.containerPadding}>
            <Text style={[Styles.greyRegular16, { textAlign: 'center', paddingVertical: 15 }]}>Введите новый пароль</Text>
            <Input placeholder={'Новый пароль'} value={newPass} setValue={setNewPass} inputType={'pass'} error={passError || errors.pass || confirmPassError} />
            {passError && (
                <Text style={Styles.redRegular12}>
                    Пароль должен содержать не менее 6-ти символов.
                </Text>
            )}
            <Input placeholder={'Повтор пароля'} value={confirmPass} setValue={setConfirmPass} inputType={'pass'} error={confirmPassError || errors.confirmPass} />
            {confirmPassError && (
                <Text style={Styles.redRegular12}>Пароли не совпадают.</Text>
            )}
            <Button text={'Сохранить'} onPress={updatePass} loading={loading} />
            <Popup showPopup={showPopup} title={'Ваш пароль успешно изменен.'} text={''} btnText={'Ок'} onPressBtn={onPressConfirm} />
        </View>
    )
}