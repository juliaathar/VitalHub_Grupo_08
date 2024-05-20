import React, { useEffect, useRef, useState } from "react";
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style";
import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style";
import { CheckCode, CheckCodeBox } from "../../components/CheckCode/Style";
import { GoogleButton, NormalButton } from "../../components/Button/Buttons";
import { Container, ContainerInitial } from "../../components/Container/Style";
import { Paragraph } from "../../components/Paragraph/Style";
import { Title } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { AntDesign } from '@expo/vector-icons';
import api from "../../service/service";
import * as yup from 'yup';
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm";




export const VerificarEmail = ({ navigation, route }) => {
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [codigo, setCodigo] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);

    function focusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus();
        }
    }

    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus();
        }
    }

    async function EnviarEmail(email) {
        setLoading(true)
        try {
            const schema = yup.object().shape({
                email: yup.string().required("Campo obrigatório").email("E-mail inválido")
            });

            await schema.validate({ email }, { abortEarly: false });

            await api.post(`/RecuperarSenha?email=${email}`)
                .then(response => {
                    console.log(response.status);
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
            setLoading(false)
        }
    }

    const reenviarCodigo = () => {
        EnviarEmail(route.params.emailRecuperacao);
    };


    async function ValidarCodigo() {
        setLoadingCode(true)
        try {
            const schema = yup.object().shape({
                codigo1: yup.string().required("Campo obrigatório").matches(/^\d{1}$/, "O código deve ter 4 dígitos"),
                codigo2: yup.string().required("Campo obrigatório").matches(/^\d{1}$/, "O código deve ter 4 dígitos"),
                codigo3: yup.string().required("Campo obrigatório").matches(/^\d{1}$/, "O código deve ter 4 dígitos"),
                codigo4: yup.string().required("Campo obrigatório").matches(/^\d{1}$/, "O código deve ter 4 dígitos")
            });

            await schema.validate({
                codigo1: codigo[0],
                codigo2: codigo[1],
                codigo3: codigo[2],
                codigo4: codigo[3]
            }, { abortEarly: false });

            const codigoPreenchido = codigo.join("");
            console.log(codigoPreenchido);

            await api.post(`/RecuperarSenha/ValidarCodigoRecuperarSenha?email=${route.params.emailRecuperacao}&codigo=${codigoPreenchido}`)
                .then(() => {
                    navigation.replace("RedefinirSenha", { emailRecuperacao: route.params.emailRecuperacao });
                }).catch(error => {
                    console.log(error);
                    setErrors({ codigoInvalido: "Código inválido" });
                });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error('Erro ao validar código:', error);
            }
        } finally {
            setLoadingCode(false)
        }
    }

    useEffect(() => {
        inputs[0].current.focus();
    }, []);

    return (
        <ContainerInitial>
            <ContainerLogo>
                {/* <BackgroundOption onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={24} color="#34898F" />
                    </BackgroundOption> */}

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Verifique seu e-mail</Title>

            <Paragraph>Digite o código de 4 dígitos enviado para {route.params.emailRecuperacao}</Paragraph>

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
                            value={codigo[index]}
                            onChangeText={(text) => {
                                if (text == "") {
                                    focusPrevInput(index);
                                } else {
                                    const novoCodigo = [...codigo];
                                    novoCodigo[index] = text;
                                    setCodigo(novoCodigo);
                                    focusNextInput(index);
                                }
                            }}
                        />
                    ))
                }
            </CheckCodeBox>

            {errors.codigoInvalido && <TextErrorForm style={{ color: '#C81D25', textAlign: 'center' }}>{errors.codigoInvalido}</TextErrorForm>}

            <NormalButton
            disabled={loadingCode}
                title={"Verificar"}
                fieldWidth={90}
                onPress={() => ValidarCodigo()}
            />

            <GoogleButton disabled={loading} title={"Reenviar código"} fieldWidth={90} onPress={reenviarCodigo} />

            <ContentAccount disabled={loading} onPress={() => navigation.goBack()}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>
        </ContainerInitial>
    );
};
