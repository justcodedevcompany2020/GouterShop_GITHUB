import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { postRequest } from '../../../api/RequestHelpers';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Popup from '../../../components/Popup';
import { saveToken } from '../../../store/actions/saveToken';
import { Styles } from '../../../styles/Styles';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPopup, setShowPopup] = useState(false)
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({
    pass: false,
    email: false,
  });
  const [loading, setLoading] = useState(false)

  function onPressLogin() {
    setLoading(true)
    setError(false)
    setPassError(false)
    setEmailError(false)
    let isValidInfo = validateData();
    isValidInfo ?
    postRequest('user_login', {
      email: email,
      password: pass,
    }).then(([status, data]) => {
      console.log(status, data);
      if (status === 200) {
        dispatch(saveToken(data.token));
          navigation.popToTop();
          navigation.navigate('Home');
        } else if (status === 402 || status === 405) {
          setError('Неверный ввод данных. Повторите попытку.');
        } else if(status === 403){
          setError('Данная эл. почта не зарегистрирована')
        } else if (status === 401) {
          setShowPopup(true)
        }
        setLoading(false)
      }) : setLoading(false)
  }

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  function validateData() {
    let myErrors = { ...errors };
    let error = false;

    if (!pass) {
      myErrors.pass = true;
      error = true;
    } else if (pass.length < 6) {
      myErrors.pass = false;
      error = true;
      setError('Неверный ввод данных. Повторите попытку.')
    } else {
      myErrors.pass = false;
    }

    if (!email) {
      myErrors.email = true;
      error = true;
    } else if (!validateEmail()) {
      myErrors.email = false;
      error = true;
      setError('Неверный ввод данных. Повторите попытку.')
    } else {
      myErrors.email = false;
    }

    setErrors(myErrors);
    return !error;
  }

  return (
    <>
      <Input
        placeholder={'Электронная почта'}
        value={email}
        setValue={setEmail}
        inputType={'default'}
        error={errors.email}
      />
      <Input
        placeholder={'Пароль'}
        value={pass}
        setValue={setPass}
        inputType={'pass'}
        error={errors.pass}
        secure
      />
      {(error || passError || emailError) && <Text style={Styles.redRegular12}>{error}</Text>}
      <View style={{ marginTop: 10 }}>
        <Button text={'Войти'} onPress={onPressLogin} loading={loading} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={[Styles.greySemiBold12, { textAlign: 'center' }]}>
            Забыли пароль?
          </Text>
        </TouchableOpacity>
      </View>
      <Popup showPopup={showPopup} title={'Мы отправили вам код подтверждения на эл.почту для прохождения верификации'} text={''} btnText={'Ок'} onPressBtn={() => {
        setShowPopup(false)
        navigation.navigate('VerificationScreen', { email: email })
      }} />
    </>
  );
}
