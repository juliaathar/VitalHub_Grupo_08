import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api from "../../service/service"


export const RedefinirSenha = ({navigation, route}) => {
    const [senha, setSenha] = useState();
    const [confirmar, setConfirmar] = useState(); 

    async function AtualizarSenha() {
        if (senha === confirmar) {
            await api.put(`/usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {senhaNova : senha})
            .then( () => {
                navigation.replace("Login")
            })
            .catch( (error) => {
                console.log(error);
            })
        }
    }
    return (
        <Container>
            <ContainerLogo>
                <BackgroundOption>
                    <AntDesign name="arrowleft" size={24} color="#34898F" />
                </BackgroundOption>

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Redefinir senha</Title>

            <Paragraph>Insira e confirme a sua nova senha</Paragraph>

            <Input 
                placeholder="Nova Senha" 
                secureTextEntry={true} 

                onChangeText={(text) => setSenha(text)}
            />

            <Input 
                placeholder="Confirmar nova senha" 
                secureTextEntry={true} 

                onChangeText={(text) => setConfirmar(text)}
            />

            <NormalButton 
                title={"Confirme a sua senha"} 
                fieldWidth={90} 
                onPress={() => AtualizarSenha()}
            />

        </Container>
    )
}