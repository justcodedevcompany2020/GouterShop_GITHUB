import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Popup from "../../components/Popup";
import { deleteToken } from "../../store/actions/saveToken";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";
import { getRequestAuth, postRequestAuth } from "../../api/RequestHelpers";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import Loading from "../../components/Loading";

export default function PersonalInfoScreen({ navigation }) {
    const { token } = useSelector(state => state.auth)

    const [userInfo, setUserInfo] = useState()
    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState('000000000000')

    const [showPopup, setShowPopup] = useState(false)
    const [currentEditingField, setCurrentEditingField] = useState(null)

    const [nameChanged, setNameChanged] = useState(false)
    const [lastnameChanged, setLastnameChanged] = useState(false)
    const [phoneChanged, setPhoneChanged] = useState(false)

    const [nameErr, setNameErr] = useState(false)
    const [lastnameErr, setLastnameErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)

    const dispatch = useDispatch()

    function onPressDelete() {
        //request delete
        setShowPopup(false);
        navigation.popToTop()
        navigation.navigate('Home')
        dispatch(deleteToken())
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    function getUserInfo() {
        getRequestAuth('get_user_by_id', token).then(res => {
            console.log(res);
            setUserInfo(res.data)
            setName(res.data.name)
            setLastname(res.data.last_name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setIsLoading(false)
            setRefreshing(false)
        })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserInfo()
    }, []);

    function changeUserData() {
        console.log({
            name: nameChanged ? name : null,
            last_name: lastnameChanged ? lastname : null,
            phone: phoneChanged ? phone : null
        });

        setSaveLoading(true)
        setCurrentEditingField(null)

        if (!name) {
            setNameErr(true)
        } else {
            setNameErr(false)
        }
        if (!lastname) {
            setLastnameErr(true)
        } else {
            setLastnameErr(false)
        }
        if (!phone) {
            setPhoneErr(true)
        } else {
            setPhoneErr(false)
        }

        if (!name || !lastname || !phone) {
            setSaveLoading(false)
        } else postRequestAuth('change_user_data', token, {
            name: nameChanged ? name : null,
            last_name: lastnameChanged ? lastname : null,
            phone: phoneChanged ? phone : null
        }).then(res => {
            if (res.status == true) {
                setNameChanged(false)
                setLastnameChanged(false)
                setPhoneChanged(false)
            }
            setSaveLoading(false)
            console.log(res)
        })
    }


    return <View style={[Styles.container, { paddingTop: 20 }]}>
        {isLoading ? <Loading /> : <ScrollView style={{ paddingHorizontal: 20 }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[AppColors.GREEN_COLOR]} />
        }>
            {refreshing ? null : <View>
                <Input
                    value={name}
                    setValue={(e) => {
                        setName(e);
                        setNameChanged(e === userInfo.name ? false : true)
                    }}
                    notEditable
                    onPressEdit={() => setCurrentEditingField('name')}
                    isCurrentEditingField={currentEditingField == 'name'}
                    error={nameErr}
                    placeholder={'Имя'}
                />
                <Input
                    value={lastname}
                    setValue={(e) => {
                        setLastname(e);
                        setLastnameChanged(e === userInfo.last_name ? false : true)
                    }}
                    notEditable
                    onPressEdit={() => setCurrentEditingField('lastname')}
                    isCurrentEditingField={currentEditingField == 'lastname'}
                    error={lastnameErr}
                    placeholder={'Фамилия'}
                />
                <Input
                    value={phone}
                    setValue={(e) => {
                        setPhone(e);
                        setPhoneChanged(e === userInfo.phone ? false : true)
                    }}
                    notEditable
                    inputType={'phone'}
                    onPressEdit={() => setCurrentEditingField('phone')}
                    isCurrentEditingField={currentEditingField == 'phone'}
                    error={phoneErr}
                    placeholder={'+34 (000) 000 - 000'}
                />
                <Input
                    value={email}
                    setValue={setEmail}
                    notEditable
                    onPressEdit={() => {
                        setCurrentEditingField(null)
                        navigation.navigate('ChangeEmailScreen')
                    }}
                />
                <Input
                    value={pass}
                    setValue={setPass}
                    notEditable
                    inputType={'pass'}
                    onPressEdit={() => {
                        setCurrentEditingField(null)
                        navigation.navigate('ChangePasswordScreen')
                    }}
                />
                <TouchableOpacity style={styles.delete} onPress={() => setShowPopup(true)}>
                    <Text style={styles.deleteText}>Удалить свой акканут</Text>
                </TouchableOpacity>
            </View>}
        </ScrollView>}
        {(nameChanged || phoneChanged || lastnameChanged) && <View style={Styles.absoluteButton}>
            <Button text={'Сохранить'} onPress={changeUserData} loading={saveLoading} />
        </View>}
        <Popup showPopup={showPopup} title={'Удалить'} text={'Вы уверены, что хотите удалить свой аккаунт?'} firstBtnText={'Да'} secondBtnText={'Нет'} firstBtnTextColor={AppColors.RED_COLOR} firstOnPress={onPressDelete} secondOnPress={() => setShowPopup(false)} />
    </View>
}

const styles = StyleSheet.create({
    deleteText: {
        color: AppColors.RED_COLOR,
        fontFamily: 'OpenSans-Regular',
    },
    delete: {
        alignSelf: 'center',
        marginTop: 10
    }

})