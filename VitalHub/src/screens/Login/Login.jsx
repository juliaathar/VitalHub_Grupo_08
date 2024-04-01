import { ContentAccount, TextAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Container } from "../../components/Container/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Alert, TouchableOpacity } from "react-native"
import { Input } from "../../components/Input/Style"
import { Title } from "../../components/Title/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"

import api from "../../service/service"

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState('julia@gmail.com');
    const [senha, setSenha] = useState('julia');

    async function Login() {
        try {
            const response = await api.post('http://172.16.39.82:4466/api/Login', {
                email: email,
                senha: senha
            });

            await AsyncStorage.setItem('token', JSON.stringify(response.data)); //costumava ter .data depois de response

            navigation.replace("Main");
        } catch (error) {
            console.error('Erro ao fazer login:', error.response.data);
            Alert.alert('Erro ao fazer login', error.response.data.message || 'Verifique seus dados e tente novamente.');
        }
    }
   

    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_Logo1.png")} />

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

            <TouchableOpacity style={{ width: "100%"}} onPress={() => navigation.navigate('RecuperarSenha')}>
                <LinkMedium>Esqueceu sua senha?</LinkMedium>
            </TouchableOpacity>

            <NormalButton title={"Entrar"} fieldWidth={90} onPress={() => Login()} />

            <GoogleButton title={"Entrar com Google"} fieldWidth={90} />

            <ContentAccount onPress={() => navigation.navigate('CriarConta')}>
                <TextAccount>Nao tem conta? <TextAccountLink>Crie uma conta agora!</TextAccountLink></TextAccount>
            </ContentAccount>

        </Container>
    )
}