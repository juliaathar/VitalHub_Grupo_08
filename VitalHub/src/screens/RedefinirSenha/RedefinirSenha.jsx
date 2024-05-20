import React, { useState } from "react";
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style";
import { ContainerLogo } from "../../components/ContainerLogo/Style";
import { NormalButton } from "../../components/Button/Buttons";
import { Container, ContainerInitial } from "../../components/Container/Style";
import { Paragraph } from "../../components/Paragraph/Style";
import { Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Logo } from "../../components/Logo/Style";

import api from "../../service/service";
import * as yup from 'yup';
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm";

export const RedefinirSenha = ({ navigation, route }) => {
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    async function AtualizarSenha() {
        setLoading(true)
        try {
            const schema = yup.object().shape({
                senha: yup.string()
                    .required("Campo obrigatório")
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 caracteres"
                    ),
                confirmarSenha: yup.string()
                    .required("Campo obrigatório")
                    .oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais')
            });

            await schema.validate({ senha, confirmarSenha: confirmar }, { abortEarly: false });

            await api.put(`/usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, { senhaNova: senha })
                .then(() => {
                    navigation.replace("Login")
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error('Erro ao redefinir senha:', error);
            }
        }finally{
            setLoading(false)
        }
    }

    return (
        <ContainerInitial>
            <ContainerLogo>
                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Redefinir senha</Title>

            <Paragraph>Insira e confirme a sua nova senha</Paragraph>

            <Input
                placeholder="Nova senha"
                secureTextEntry
                value={senha}
                onChangeText={(text) => setSenha(text)}
                style={{ borderColor: errors.senha ? '#C81D25' : '#49B3BA' }}
            />
            {errors.senha && <TextErrorForm style={{ color: '#C81D25' }}>{errors.senha}</TextErrorForm>}

            <Input
                placeholder="Confirmar senha"
                secureTextEntry
                value={confirmar}
                onChangeText={(text) => setConfirmar(text)}
                style={{ borderColor: errors.confirmarSenha ? '#C81D25' : '#49B3BA' }}
            />
            {errors.confirmarSenha && <TextErrorForm style={{ color: '#C81D25' }}>{errors.confirmarSenha}</TextErrorForm>}

            <NormalButton
                disabled={loading}
                title="Confirmar"
                fieldWidth={90}
                onPress={AtualizarSenha}
            />

            <ContentAccount disabled={loading} onPress={() => navigation.goBack()}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>

        </ContainerInitial>
    )
}
