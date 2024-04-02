import React, { useState } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container } from '../../components/Container/Style';
import { ContentAccount, TextAccount, TextAccountLink } from '../../components/ContentAccount/Style';
import { GoogleButton, NormalButton } from '../../components/Button/Buttons';
import { Input } from '../../components/Input/Style';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service/service';
import { LinkMedium } from '../../components/Links/Style';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [desativado, setDesativado] = useState(false);

  const handleLogin = async () => {
    try {
      if (!desativado) {
        const response = await api.post('http://172.16.39.82:4466/api/Login', {
          email: email,
          senha: senha
        });

        await AsyncStorage.setItem('token', JSON.stringify(response.data));

        navigation.replace('Main');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }

    setDesativado(true);

    setTimeout(() => {
      setDesativado(false);
    }, 3000);
  };

  return (
    <Container>
      <Logo source={require('../../assets/VitalHub_Logo1.png')} />
      <Title>Entrar ou criar conta</Title>
      <Input
        placeholder="Usuário ou Email"
        value={email}
        onChangeText={(newValue) => { setEmail(newValue) }}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(newValue) => { setSenha(newValue) }}
      />
      <TouchableOpacity style={{ width: "100%" }} onPress={() => navigation.navigate('RecuperarSenha')}>
        <LinkMedium>Esqueceu sua senha?</LinkMedium>
      </TouchableOpacity>
      <NormalButton title={"Entrar"} fieldWidth={90} onPress={handleLogin} disabled={desativado} />
      <GoogleButton title={"Entrar com Google"} fieldWidth={90} onPress={() => console.log('Entrar com Google')} />
      <ContentAccount onPress={() => navigation.navigate('CriarConta')}>
        <TextAccount>Não tem conta? <TextAccountLink>Crie uma conta agora!</TextAccountLink></TextAccount>
      </ContentAccount>
    </Container>
  );
};
