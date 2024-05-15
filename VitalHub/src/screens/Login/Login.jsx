import React, { useState } from 'react';
import { ContentAccount, TextAccount, TextAccountLink } from '../../components/ContentAccount/Style';
import { GoogleButton, NormalButton } from '../../components/Button/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, ContainerInitial } from '../../components/Container/Style';
import { LinkMedium } from '../../components/Links/Style';
import { Input } from '../../components/Input/Style';
import { Title } from '../../components/Title/Style';
import { Logo } from '../../components/Logo/Style';
import { TouchableOpacity, } from 'react-native';
import api from '../../service/service';
import * as yup from 'yup';
import { TextErrorForm } from '../../components/TextErrorForm/TextErrorForm';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('julia@gmail.com');
  const [senha, setSenha] = useState('julia');
  const [desativado, setDesativado] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setDesativado(true);

    try {
      const schema = yup.object().shape({
        email: yup.string().required("Campo obrigatório"),
        senha: yup.string().required("Campo obrigatório")
      });

      await schema.validate({ email, senha }, { abortEarly: false });

      const response = await api.post('/Login', {
        email: email,
        senha: senha
      });

      await AsyncStorage.setItem('token', JSON.stringify(response.data));
      navigation.replace('Main');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        let validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);

        setTimeout(() => {
          setErrors({});
        }, 3000);
      } else {
        console.error('Erro ao fazer login:', error);
      }
    } finally {
      setLoading(false);
      setDesativado(false);
    }
  };

  return (
    <ContainerInitial>
      <Logo source={require('../../assets/VitalHub_Logo1.png')} />
      <Title>Entrar ou criar conta</Title>
      <Input
        disabled={loading}
        placeholder="E-mail"
        value={email}
        onChangeText={(newValue) => { setEmail(newValue) }}
        style={{ borderColor: errors.email ? '#C81D25' : '#49B3BA' }}
      />
      {errors.email && <TextErrorForm style={{ color: '#C81D25' }}>{errors.email}</TextErrorForm>}
      <Input
        disabled={loading}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(newValue) => { setSenha(newValue) }}
        style={{ borderColor: errors.senha ? '#C81D25' : '#49B3BA' }}
      />
      {errors.senha && <TextErrorForm style={{ color: '#C81D25' }}>{errors.senha}</TextErrorForm>}
      <TouchableOpacity disabled={desativado || loading} style={{ width: "100%" }} onPress={() => navigation.navigate('RecuperarSenha')}>
        <LinkMedium>Esqueceu sua senha?</LinkMedium>
      </TouchableOpacity>
      <NormalButton title={"Entrar"} fieldWidth={90} onPress={handleLogin} disabled={desativado || loading} />
      <GoogleButton title={"Entrar com Google"} fieldWidth={90} onPress={() => console.log('Entrar com Google')} />
      <ContentAccount disabled={desativado || loading} onPress={() => navigation.navigate('CriarConta')}>
        <TextAccount>Não tem conta? <TextAccountLink>Crie uma conta agora!</TextAccountLink></TextAccount>
      </ContentAccount>
    </ContainerInitial>
  );
};
