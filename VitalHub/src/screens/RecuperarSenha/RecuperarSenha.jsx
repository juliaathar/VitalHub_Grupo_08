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
import * as yup from 'yup'; 
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm"

export const RecuperarSenha = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({}); 

    async function EnviarEmail() {
        try {
            const schema = yup.object().shape({
                email: yup.string().required("Campo obrigatório").email("E-mail inválido")
            });

            await schema.validate({ email }, { abortEarly: false });

            await api.post(`/RecuperarSenha?email=${email}`)
                .then(response => {
                    console.log(response.status);
                    navigation.replace("VerificarEmail", { emailRecuperacao: email })
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error('Erro ao recuperar senha:', error);
            }
        }
    }

    return (
        <Container >
            <ContainerLogo>
                <BackgroundOption onPress={() => navigation.goBack()}> 
                    <AntDesign name="arrowleft" size={24} color="#34898F" />
                </BackgroundOption>

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Recuperar senha</Title>

            <Paragraph>Digite abaixo o seu e-mail cadastrado que enviaremos um link para recuperação de senha</Paragraph>

            <Input
                placeholder={'E-mail'}
                value={email}
                onChangeText={(text) => { setEmail(text) }}
                style={{ borderColor: errors.email ? '#C81D25' : '#49B3BA' }} 
            />
            {errors.email && <TextErrorForm style={{ color: '#C81D25' }}>{errors.email}</TextErrorForm>} 

            <NormalButton
                title={"Continuar"}
                fieldWidth={90}
                onPress={() => EnviarEmail()}
            />
        </Container>
    )
}
