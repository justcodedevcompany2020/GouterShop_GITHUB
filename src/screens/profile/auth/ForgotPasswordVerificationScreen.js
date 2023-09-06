import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {postRequest} from '../../../api/RequestHelpers';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import {Styles} from '../../../styles/Styles';

export default function ForgotPasswordVerificationScreen({navigation, route}) {
  const {email} = route.params;
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false)

  function confirm() {
    setLoading(true)
    if (!code) {
      setCodeError(true);
      setShowErrorMsg(false);
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
      postRequest('check_remember_token', {
        email: email,
        remember_code: code,
      }).then(([status, body]) => {
        if (status === 200) {
          navigation.navigate('NewPasswordScreen', {email: email, code: code});
        } else if (402) {
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
          {textAlign: 'center', marginVertical: 20},
        ]}>
        Мы отправили код безопасности на вашу эл. почту,введите её ниже для
        подтверждения
      </Text>
      <Input
        placeholder={'Код безопасности'}
        value={code}
        setValue={setCode}
        inputType={'code'}
        error={codeError || showErrorMsg}
      />
      {showErrorMsg && <Text style={Styles.redRegular12}>{showErrorMsg}</Text>}
      <Button text={'Подтвердить'} onPress={confirm} loading={loading}/>
    </View>
  );
}
