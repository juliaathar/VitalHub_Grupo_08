import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"
import api from "../../service/service"
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text } from "react-native"
import { TextErrorForm } from "../../components/TextErrorForm/TextErrorForm"


const formSchema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    senha: yup
        .string()
        .required("Campo obrigatório")
        .min(8, "A senha deve ter no mínimo 8 caracteres.")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
        .matches(/[\W_]/, "A senha deve conter pelo menos um caractere especial.")
        .matches(/\d/, "A senha deve conter pelo menos um número."),
    confirm: yup
        .string()
        .required("Campo obrigatório")
        .oneOf([yup.ref("senha"), null], "As senhas devem coincidir"),
});

export const CriarConta = ({ navigation }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            confirm: "",
        },
    });

    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const [nome, setNome] = useState()
    const [confirm, setConfirm] = useState()



    const cadastrarUsuario = async (data) => {
        try {
            const { nome, email, senha } = data;

            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("senha", senha);
            formData.append("email", email);
            formData.append("idTipoUsuario", '5FF2DF57-1B92-49D0-A516-F2B1172A0EDC');

            console.log(formData);


            const response = await api.post("/Pacientes", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.status);
            if (response.status === 200) {
                console.log("deu certo");
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log("Erro ao cadastrar:", error);
        }
    };



    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_Logo1.png")} />

            <Title>Criar conta</Title>

            <Paragraph>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Paragraph>


            <Input
                placeholder="Nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
            />
            {errors.nome && <TextErrorForm>{errors.nome.message}</TextErrorForm>}

            <Input placeholder="E-mail" value={email} onChangeText={(emailInput) => setEmail(emailInput)} />
            {errors.email && <TextErrorForm>{errors.nome.message}</TextErrorForm>}

            <Input placeholder="Senha" value={senha} onChangeText={(senhaInput) => setSenha(senhaInput)} />
            {errors.senha && <TextErrorForm>{errors.nome.message}</TextErrorForm>}

            <Input placeholder="Confirmar Senha" value={confirm} onChangeText={(confirmInput) => setConfirm(confirmInput)} />
            {errors.confirm && <TextErrorForm>{errors.nome.message}</TextErrorForm>}


            <NormalButton title={"Cadastrar"} fieldWidth={90} onPress={handleSubmit(cadastrarUsuario)} />

            <ContentAccount onPress={() => navigation.navigate('Login')}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>
        </Container>
    )
}