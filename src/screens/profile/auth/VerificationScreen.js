import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { postRequest } from '../../../api/RequestHelpers';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Popup from '../../../components/Popup';
import { saveToken } from '../../../store/actions/saveToken';
import { Styles } from '../../../styles/Styles';

export default function VerificationScreen({ navigation, route }) {
  const { email } = route.params;
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(email);
  }, []);

  function onPressConfirm() {
    navigation.popToTop();
    navigation.navigate('Home');
    setShowPopup(false);
  }
  function onPressVerify() {
    setLoading(true)
    if (!code) {
      setCodeError(true);
      setShowErrorMsg(false)
      setLoading(false)
    } else if (code.length < 4) {
      setCodeError(true);
      setShowErrorMsg(
        'Код безопасности должен содержать не менее 4-ти символов.',
      );
      setLoading(false)
    } else {
      setCodeError(false);
      setShowErrorMsg(false);

      postRequest('user_verification', {
        mail: email,
        mail_code: code,
      }).then(([status, body])=> {
        if(status === 200){
          setShowPopup(true);
          dispatch(saveToken(body.token));
        } else if(422) {
          setCodeError(true);
          setShowErrorMsg('Неверный код');
        }
        setLoading(false)
      });
    }
  }

  return (
    <View style={Styles.containerPadding}>
      <Text
        style={[
          Styles.greyRegular16,
          { textAlign: 'center', marginVertical: 20 },
        ]}>
        Мы отправили код безопасности на вашу эл. почту,введите её ниже для
        подтверждения
      </Text>
      <Input
        placeholder={'Код безопасности'}
        value={code}
        setValue={setCode}
        inputType={'code'}
        error={codeError}
      />
      {showErrorMsg && <Text style={Styles.redRegular12}>{showErrorMsg}</Text>}
      <Button text={'Подтвердить'} onPress={onPressVerify} loading={loading} />
      <Popup
        showPopup={showPopup}
        title={'Ваш аккаунт успешно подтверждён'}
        text={''}
        btnText={'Ок'}
        onPressBtn={onPressConfirm}
      />
    </View>
  );
}
