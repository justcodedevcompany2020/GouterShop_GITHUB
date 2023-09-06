import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { postRequest } from '../../../api/RequestHelpers';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { AppColors } from '../../../styles/AppColors';
import { Styles } from '../../../styles/Styles';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    pass: false,
    confirmPass: false,
    phone: false,
    confirmPassMsg: false,
    passMsg: false,
    emailMsg: false,
  });
  const [loading, setLoading] = useState(false)

  function validate() {
    let items = { ...errors };
    let error = false;
    setErrors({
      name: false,
      surname: false,
      email: false,
      pass: false,
      confirmPass: false,
      phone: false,
      confirmPassMsg: false,
      passMsg: false,
      emailMsg: false,
    })
    setEmailError(false)

    if (!name) {
      items.name = true;
      error = true;
    } else {
      items.name = false;
    }
    if (!surname) {
      items.surname = true;
      error = true;
    } else {
      items.surname = false;
    }
    if (!email) {
      items.email = true;
      items.emailMsg = false;
      error = true;
    } else if (!validateEmail()) {
      items.pass = true
      items.emailMsg = true
      error = true
    } else {
      items.email = false;
      items.emailMsg = false;
    }
    if (!pass) {
      items.pass = true;
      items.passMsg = false;
      error = true;
    } else if (pass && pass.length < 6) {
      items.pass = true;
      items.passMsg = true;
      error = true;
    } else {
      items.pass = false;
      items.passMsg = false;
    }

    if (!confirmPass) {
      items.confirmPass = true;
      items.confirmPassMsg = false;
      error = true;
    } else if ((pass && confirmPass) && (pass != confirmPass)) {
      items.confirmPassMsg = true;
      error = true;
    } else {
      items.confirmPass = false;
      items.confirmPassMsg = false;
    }

    if (!phone) {
      items.phone = true;
      error = true;
    } else {
      items.phone = false;
    }

    setErrors(items);
    return error ? false : true;
  }

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };


  function register() {
    setLoading(true)
    let isValidData = validate();
    isValidData ?
      postRequest('registration', {
        name: name,
        last_name: surname,
        email: email,
        password: pass,
        phone: phone,
      }).then(([status, body]) => {
        console.log(body);
        if(status === 201 || status ===  400) {
          navigation.navigate('VerificationScreen', { email: email });
        } else if(status === 401){
          setEmailError(true)
        }
        setLoading(false)
      }) : setLoading(false)
  }

  return (
    <>
      <Input
        placeholder={'Имя'}
        value={name}
        setValue={setName}
        error={errors.name}
      />
      <Input
        placeholder={'Фамилия'}
        value={surname}
        setValue={setSurname}
        error={errors.surname}
      />
      <Input
        placeholder={'Электронная почта'}
        value={email}
        setValue={setEmail}
        inputType={'email'}
        error={errors.email || errors.emailMsg}
      />
      {errors.emailMsg && (
        <Text style={Styles.redRegular12}>
          Введите корректный адрес эл. почты.
        </Text>
      )}
      {emailError && (
        <Text style={Styles.redRegular12}>
          Этот эл. адрес уже зарегистрирован.
        </Text>
      )}
      <Input
        placeholder={'Пароль'}
        value={pass}
        setValue={setPass}
        inputType={'pass'}
        error={errors.pass || errors.passMsg || errors.confirmPassMsg}
      />
      {errors.passMsg && (
        <Text style={Styles.redRegular12}>
          Пароль должен содержать не менее 6-ти символов.
        </Text>
      )}
      <Input
        placeholder={'Повторите пароль'}
        value={confirmPass}
        setValue={setConfirmPass}
        inputType={'pass'}
        error={errors.confirmPass || errors.confirmPassMsg}
      />
      {errors.confirmPassMsg && (
        <Text style={Styles.redRegular12}>Пароли не совпадают.</Text>
      )}
      <Input
        placeholder={'+34 (000) 000 - 000'}
        value={phone}
        setValue={setPhone}
        inputType={'phone'}
        error={errors.phone}
      />
      <View style={{ marginTop: 10 }}>
        <Button text={'Зарегистрироваться'} loading={loading} onPress={register} />
      </View>
    </>
  );
}