import { ContentAccount, TextAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Input } from "../../components/Input/Style"
import { Title } from "../../components/Title/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"
import { TouchableOpacity } from "react-native"

import api from "../../service/service"

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Login() {
        //chamar api de login
        //console.log("response:")

        const response = await api.post('/Login', {
            email: email,
            senha: senha
        });

        console.log(response)
        //navigation.replace("Main")
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