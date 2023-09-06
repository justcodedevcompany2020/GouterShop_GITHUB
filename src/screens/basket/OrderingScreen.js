import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import OrderInput from "../../components/OrderInput";
import Popup from "../../components/Popup";
import Select from "../../components/Select";
import { AppColors } from "../../styles/AppColors";
import { Styles } from "../../styles/Styles";
import OrderInfoBlock from "./OrderInfoBlock";
import { getRequestAuth, postRequestAuth } from "../../api/RequestHelpers";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeliveryAddressScreen from "../home/DeliveryAddressScreen";
import { useRef } from "react";

export default function OrderingScreen({ navigation }) {
    const [selectedPaymentType, setSelectedPaymentType] = useState(0)
    const paymentTypes = [
        { id: 0, text: 'Банковский перевод' },
        { id: 1, text: 'Банковская карта на сайте' },
        { id: 2, text: 'Наличный расчёт при получении' },
        { id: 3, text: 'Банковская карта при получении' },
    ]

    const [selectedCommunicationWay, setSelectedCommunicationWay] = useState(0)
    const communicationWays = [
        { id: 0, text: 'Звонок не нужен. Буду отслеживать заказ самостоятельно в личном кабинете, по электронной почте или в моб. приложении)' },
        { id: 1, text: 'Перезвоните мне. Хочу подтвердить заказ по телефону' },
    ]

    const [selectedToDo, setSelectedToDo] = useState(0)
    const toDos = [
        { id: 0, text: 'Позвонить и согласовать изменения' },
        { id: 1, text: 'Не звонить и подобрать аналог' },
    ]

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState()
    const deliveryMethods = ['Доставка курьером', 'Cамовывоз']

    const [deliveryAddress, setDeliveryAddress] = useState()
    const [date, setDate] = useState(new Date())
    const [phone, setPhone] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [comment, setComment] = useState('')

    const [totalPrice, setTotalPrice] = useState()
    const [products, setProducts] = useState()

    const [showPopup, setShowPopup] = useState(false)
    const [req1, setReq1] = useState(false)
    const [req2, setReq2] = useState(false)
    const [req3, setReq3] = useState(false)

    const [errors, setErrors] = useState({
        addressErr: false,
        deliveryMethodErr: false,
        phoneErr: false,
        nameErr: false,
        emailErr: false,
        emailErrMsg: false
    })
    const [modalVisible, setModalVisible] = useState(false);
    const scrollRef = useRef()
    const [orderLoading, setOrderLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setReq1(false)
            setReq2(false)
            setReq3(false)
            setErrors({
                addressErr: false,
                deliveryMethodErr: false,
                phoneErr: false,
                nameErr: false,
                emailErr: false,
                emailErrMsg: false
            })
            const myToken = await AsyncStorage.getItem('token')
            if (myToken) {
                getUserInfo(myToken)
            } else navigation.navigate('BasketScreen')
        });
        return unsubscribe;
    }, [navigation]);

    async function getUserInfo(myToken) {
        getRequestAuth('get_user_by_id', myToken).then(res => {
            setName(res.data.name + ' ' + res.data.last_name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setReq1(true)
        })
        getRequestAuth('get_delivery_address', myToken).then(res => {
            setDeliveryAddress(res.delivery_address.address)
            setReq2(true)
        })
        getRequestAuth('get_basket_products', myToken).then(res => {
            const myProducts = res.data.map(el => {
                return {
                    id: el.get_products.id,
                    count: el.product_count,
                    productName: el.get_products.title,
                    subcategory: el.get_products.get_subcategory.title,
                    price: el.get_products.price,
                    images: el.get_products.get_product_image.map(e => e.image),
                    isFavorite: el.get_products.get_favorites_authuser?.length > 0 ? true : false,
                    newPrice: el.get_products.discount,
                    rating: el.get_products.review_avg_stars ?? 5,
                };
            })
            setProducts(myProducts)
            setTotalPrice(res.price_sum)
            setReq3(true)
        });
    }

    async function placeOrder() {
        setOrderLoading(true)
        const myToken = await AsyncStorage.getItem('token')
        const data = {
            address: deliveryAddress,
            delivery_type: deliveryMethods[selectedDeliveryMethod],
            delivery_date: date,
            phone: phone,
            name: name,
            email: email,
            comment: comment,
            what_to_do_if_the_product_is_over: toDos[selectedToDo].text,
            comunication_type: communicationWays[selectedCommunicationWay].text
        }
        if(!isValidData()){
            setOrderLoading(false)
        } else postRequestAuth('add_order', myToken, data).then(res => {
            console.log(res)
            if(res.status){
                setShowPopup(true)
                setOrderLoading(false)
            }
        })
    }

    useEffect(() => {
        setErrors({...errors, deliveryMethodErr: false})
    }, [selectedDeliveryMethod])


    function isValidData() {
        let myErrors = { ...errors }
        const myPhone = phone.replace(/\D/g, '')
        let error = false

        if (!deliveryAddress) {
            myErrors.addressErr = true
            error = true
        } else myErrors.addressErr = false

        if (!selectedDeliveryMethod) {
            myErrors.deliveryMethodErr = true
            error = true
        } else myErrors.deliveryMethodErr = false

        if (!phone) {
            myErrors.phoneErr = true
            error = true
        } else if (myPhone.length < 10) {
            myErrors.phoneErr = true
            error = true
        } else myErrors.phoneErr = false

        if (!name) {
            myErrors.nameErr = true
            error = true
        } else myErrors.nameErr = false

        if (!email) {
            myErrors.emailErr = true;
            myErrors.emailErrMsg = false;
            error = true;
        } else if (!validateEmail()) {
            myErrors.emailErrMsg = true
            myErrors.emailErr = false
            error = true
        } else {
            myErrors.emailErr = false;
            myErrors.emailErrMsg = false;
        }

        error && scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
        setErrors(myErrors)
        return !error
    }

    const validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function onPressOk() {
        navigation.popToTop()
        navigation.navigate('BasketScreen')
        setShowPopup(false)
    }

    function onSuccessAddress(address){
        setDeliveryAddress(address)
        setModalVisible(false)
        setErrors({...errors, addressErr : false})
    }

    return <View style={[Styles.container, { paddingTop: 20 }]}>
        {!req1 || !req2 || !req3 ? <Loading /> :
            <ScrollView style={{ paddingHorizontal: 20 }} ref={scrollRef}>
                <Text style={[Styles.blackSemiBold18, { marginBottom: 30 }]}>Укажите информация для доставки</Text>
                <OrderInput label={'Адрес доставки'} value={deliveryAddress ?? `Укажите адрес доставки`} setValue={setDeliveryAddress} addressButton error={errors.addressErr} onPressAddress={() => setModalVisible(true)} />
                <OrderInput label={'Способ доставки'} value={selectedDeliveryMethod} setValue={setSelectedDeliveryMethod} dropdown options={deliveryMethods} error={errors.deliveryMethodErr} />
                <OrderInput label={'Дата доставки'} value={date} setValue={setDate} date />
                <OrderInput label={'Телефон'} value={phone} setValue={setPhone} phone  placeholder={'+34 (000) 000 - 000'} error={errors.phoneErr} />
                <OrderInput label={'Имя'} value={name} setValue={setName} placeholder={'Имя Фамилия'} error={errors.nameErr} />
                <OrderInput label={'Электронная почта'} value={email} setValue={setEmail} placeholder={'Электронная почта'} error={errors.emailErr || errors.emailErrMsg} />
                {errors.emailErrMsg && (
                    <Text style={Styles.redRegular12}>
                        Введите корректный адрес эл. почты.
                    </Text>
                )}
                <OrderInput label={'Комментарий'} value={comment} setValue={setComment} />
                <Text style={[Styles.blackSemiBold18, { marginBottom: 15 }]}>Выберите способ оплаты</Text>
                <Select data={paymentTypes} selectedIndex={selectedPaymentType} setSelectedIndex={setSelectedPaymentType} />
                <Text style={[Styles.blackSemiBold18, { marginBottom: 15 }]}>Проверьте ваш заказ</Text>
                <OrderInfoBlock products={products} totalPrice={totalPrice} />
                <Text style={[Styles.blackSemiBold18, { marginBottom: 15 }]}>Что делать, если какой-то товар закончился?</Text>
                <Select data={toDos} selectedIndex={selectedToDo} setSelectedIndex={setSelectedToDo} />
                <Text style={[Styles.blackSemiBold18, { marginBottom: 15 }]}>Укажите удобный способ коммуникации по заказу с Вами</Text>
                <Select data={communicationWays} selectedIndex={selectedCommunicationWay} setSelectedIndex={setSelectedCommunicationWay} />
                <Button text={'Оформить заказ'} marginBottom={20} onPress={placeOrder} loading={orderLoading} />
                <Text style={[Styles.greyRegular12, { textAlign: 'center', marginBottom: 20 }]}>{`Нажимая на кнопку <<Оформить заказ>> вы соглашаетесь с `} <Text style={{ color: AppColors.GREEN_COLOR }}>пользовательским соглашением</Text></Text>
            </ScrollView>}
        <Popup showPopup={showPopup} title={'Заказ успешно оформлен'} text={''} btnText={'Ок'} onPressBtn={onPressOk} />
        <DeliveryAddressScreen modalVisible={modalVisible} setModalVisible={setModalVisible}  onSuccess={onSuccessAddress} />
    </View>
}