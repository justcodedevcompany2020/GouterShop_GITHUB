import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { AppColors } from "../styles/AppColors";
import { Styles } from "../styles/Styles";
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'

export default function OrderInput({ label, placeholder, value, setValue, addressButton, date, dropdown, phone, options, error, onPressAddress }) {
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [myDate, setMyDate] = useState(new Date())

    function formatPhone(value) {
        let x = value
            .replace(/\D/g, '')
            .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})/);
        let myPhone = !x[2]
            ? '+34 ' + (x[1] != '34' ? x[1] : '')
            : !x[3]
                ? '+34 (' + x[2]
                : '+34 (' +
                x[2] +
                ') ' +
                (x[3] ? x[3] : '') +
                (x[4] ? ' - ' + x[4] : '')
        setValue(myPhone);
    }


    return <View>
        <Text style={Styles.blackSemiBold14}>{label}</Text>
        {addressButton ?
            <TouchableOpacity style={[styles.input, error && { borderColor: AppColors.RED_COLOR }]} onPress={onPressAddress}>
                <Text>{value}</Text>
            </TouchableOpacity>
            : dropdown ?
                <SelectDropdown
                    data={options}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        setValue(selectedItem)
                    }}
                    defaultValue={value}
                    buttonStyle={[styles.input, { paddingHorizontal: 5, width: '100%' }, error && { borderColor: AppColors.RED_COLOR }]}
                    dropdownStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -26, }}
                    buttonTextStyle={[Styles.blackRegular12, { textAlign: 'left' }]}
                    defaultButtonText={label}
                    selectedRowStyle={{ backgroundColor: '#D3D3D3' }}
                    rowTextStyle={[Styles.blackRegular12, { textAlign: 'left' }]}
                /> : date ? <>
                    <TouchableOpacity style={styles.input} onPress={() => setOpenDatePicker(true)}>
                        <Text>{moment(myDate).format('D.M.YYYY')}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        mode="date"
                        cancelText="отменить"
                        confirmText="подтвердить"
                        title={'Выберите дату'}
                        open={openDatePicker}
                        date={myDate}
                        minimumDate={new Date()}
                        onConfirm={(date) => {
                            setOpenDatePicker(false)
                            setMyDate(date)
                        }}
                        onCancel={() => {
                            setOpenDatePicker(false)
                        }}
                    />
                </> : <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={phone ? formatPhone : setValue}
                    keyboardType={phone ? 'numeric' : 'default'}
                    style={[Styles.blackRegular12, styles.input,  error && { borderColor: AppColors.RED_COLOR }]}
                    maxLength={phone ? 19 : 255}
                />}
    </View>
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: AppColors.WHITE_SMOKE_COLOR,
        borderRadius: 6,
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})