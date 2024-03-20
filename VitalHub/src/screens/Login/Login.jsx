import { ContentAccount, TextAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Input } from "../../components/Input/Style"
import { Title } from "../../components/Title/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"
import { TouchableOpacity } from "react-native"

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState('marchetti@gmail.com')
    const [senha, setSenha] = useState('0002225')

    async function Login() {
        if (email === 'marchetti@gmail.com' && senha === '0002225') {
            navigation.replace("Main")
        } else {
            console.log("senha ou email errado")
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