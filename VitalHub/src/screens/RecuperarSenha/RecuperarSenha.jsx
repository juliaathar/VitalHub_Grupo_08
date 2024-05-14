import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container, ContainerInitial } from "../../components/Container/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"
import api from "../../service/service"
import * as yup from 'yup';
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm"
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style"

export const RecuperarSenha = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    async function EnviarEmail() {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <ContainerInitial  >
            <ContainerLogo>
                {/* <BackgroundOption onPress={() => navigation.goBack()}> 
                    <AntDesign name="arrowleft" size={24} color="#34898F" />
                </BackgroundOption> */}

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Recuperar senha</Title>

            <Paragraph>Digite abaixo o seu e-mail cadastrado que enviaremos um link para recuperação de senha</Paragraph>

            <Input
                disabled={loading}
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
                disabled={loading}

            />
            <ContentAccount disabled={loading} onPress={() => navigation.goBack()}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>
        </ContainerInitial>
    )
}
