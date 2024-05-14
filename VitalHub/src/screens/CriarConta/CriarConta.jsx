import React, { useState } from "react";
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style";
import { NormalButton } from "../../components/Button/Buttons";
import { Paragraph } from "../../components/Paragraph/Style";
import { Container, ContainerInitial } from "../../components/Container/Style";
import { Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Logo } from "../../components/Logo/Style";
import * as yup from 'yup';
import { Text } from "react-native";
import api from "../../service/service";
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm";

export const CriarConta = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const cadastrarUsuario = async () => {
        setLoading(true);

        try {
            const schema = yup.object().shape({
                nome: yup.string().required("Campo obrigatório").matches(/^[^\s]+(\s+[^\s]+)+$/, "Nome e sobrenome necessários"),
                email: yup.string().email("Digite um e-mail válido").required("Campo obrigatório").matches(/@gmail.com$/, "O e-mail deve ser do Gmail"),
                senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("Campo obrigatório")
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
                        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 caracteres"),
                confirm: yup.string().oneOf([senha], "As senhas precisam ser iguais").required("Confirme a senha")
            });

            await schema.validate({ nome, email, senha, confirm }, { abortEarly: false });

            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("senha", senha);
            formData.append("email", email);
            formData.append("idTipoUsuario", '5FF2DF57-1B92-49D0-A516-F2B1172A0EDC');

            const response = await api.post("/Pacientes", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("deu certo");
                navigation.navigate('Login');
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.log("Erro ao cadastrar:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerInitial>
            <Logo source={require("../../assets/VitalHub_Logo1.png")} />

            <Title>Criar conta</Title>

            <Paragraph>Insira seus dados para realizar o cadastro.</Paragraph>

            <Input
                disabled={loading}
                placeholder="Nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
                style={{ borderColor: errors.nome ? '#C81D25' : '#49B3BA' }}
            />
            {errors.nome && <TextErrorForm style={{ color: '#C81D25' }}>{errors.nome}</TextErrorForm>}

            <Input
                disabled={loading}
                placeholder="E-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ borderColor: errors.email ? '#C81D25' : '#49B3BA' }}
            />
            {errors.email && <TextErrorForm style={{ color: '#C81D25' }}>{errors.email}</TextErrorForm>}

            <Input
                disabled={loading}

                placeholder="Senha"
                value={senha}
                onChangeText={(text) => setSenha(text)}
                secureTextEntry
                style={{ borderColor: errors.senha ? '#C81D25' : '#49B3BA' }}
            />
            {errors.senha && <TextErrorForm style={{ color: '#C81D25' }}>{errors.senha}</TextErrorForm>}

            <Input
                disabled={loading}
                placeholder="Confirmar Senha"
                value={confirm}
                onChangeText={(text) => setConfirm(text)}
                secureTextEntry
                style={{ borderColor: errors.confirm ? '#C81D25' : '#49B3BA' }}
            />
            {errors.confirm && <TextErrorForm style={{ color: '#C81D25' }}>{errors.confirm}</TextErrorForm>}

            <NormalButton disabled={loading} title="Cadastrar" fieldWidth={90} onPress={cadastrarUsuario} />

            <ContentAccount disabled={loading} onPress={() => navigation.navigate('Login')}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>
        </ContainerInitial>
    );
};
