import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style"
import { CheckCode, CheckCodeBox } from "../../components/CheckCode/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { Title } from "../../components/Title/Style"
import { useEffect, useRef, useState } from "react"
import { Logo } from "../../components/Logo/Style"
import { AntDesign } from '@expo/vector-icons';
import api from "../../service/service"

export const VerificarEmail = ({ navigation, route }) => {
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null),]
    const [codigo, setCodigo] = useState("")

    function focusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }
    
    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function ValidarCodigo() {
        console.log(codigo);
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperarSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
        .then( () => {
            navigation.replace("RedefinirSenha", {emailRecuperacao : route.params.emailRecuperacao});
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        inputs[0].current.focus();
    },[])

    return (
        <Container>
            <ContainerLogo>
                <BackgroundOption>
                    <AntDesign name="close" size={24} color="#34898F" />
                </BackgroundOption>

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Verifique seu e-mail</Title>

            <Paragraph>Digite o codigo de 4 digitos enviado para {route.params.emailRecuperacao}</Paragraph>

            <CheckCodeBox>

                {
                    [0, 1, 2, 3].map((index) => (
                        <CheckCode
                            key={index}
                            ref={inputs[index]}
                            keyboardType="numeric"
                            placeholder={'0'}
                            maxLength={1}
                            caretHidden={true}
                            onChangeText={(text) => {
                                //Verificar se o texto não é vazio (pra voltar ao campo anterior)
                                if (text == "") {
                                    focusPrevInput(index)
                                } else {
                                    const novoCodigo = [...codigo] // Separa os valores em casinhas do array
                                    novoCodigo[index] = text // Corrige o valor de acordo com a posicao
                                    setCodigo(novoCodigo.join('')) // Junta todas em uma string

                                    focusNextInput(index)
                                }
                                //Verificar se o campo tem 1 caracter (passa pro próximo campo)
                            }}
                        />
                    ))
                }
            </CheckCodeBox>

            <NormalButton
                title={"Enviar"}
                fieldWidth={90}
                onPress={() => ValidarCodigo()}
            />

            <ContentAccount>
                <TextAccountLink>Reenviar Codigo</TextAccountLink>
            </ContentAccount>
        </Container>
    )
}