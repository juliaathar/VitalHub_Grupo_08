import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api from "../../service/service"


export const RecuperarSenha = ({ navigation }) => {

    const [email, setEmail] = useState("leonkene18@gmail.com");

    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)
        .then( response => {
            console.log(response.status);
            navigation.replace("VerificarEmail", { emailRecuperacao : email })
        })
        .catch( error => {
            console.log(error);
        })
        navigation.replace("VerificarEmail", { emailRecuperacao : email })
    }

    return (
        <Container >
            <ContainerLogo>
                <BackgroundOption>
                    <AntDesign name="arrowleft" size={24} color="#34898F" />
                </BackgroundOption>

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Recuperar senha</Title>

            <Paragraph>Digite abaixo o seu email cadastrado que enviaremos um link para recuperacao de senha</Paragraph>

            <Input
                placeholder={'Usuário ou Email'}
                value={email}
                onChangeText={(text) => {setEmail(text)}}
            />

            <NormalButton 
                title={"Continuar"} 
                fieldWidth={90} 
                onPress={() => EnviarEmail()}
            />
        </Container>
    )
}