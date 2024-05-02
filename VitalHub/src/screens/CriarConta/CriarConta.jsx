import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { useState } from "react"
import api from "../../service/service"

export const CriarConta = ({ navigation }) => {

    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const [nome, setNome] = useState()
    const [confirm, setConfirm] = useState()

    async function cadastrarUsuario() {
        const cadastro = {
            nome : nome,
            senha : senha,
            email : email,
            idTipoUsuario: '5FF2DF57-1B92-49D0-A516-F2B1172A0EDC'
        }
        console.log(cadastro);

        try {
            if (senha === confirm) {

                const response = await api.post("/Pacientes", cadastro);
                console.log(response.status);
                if (response.status === 200) {
                    console.log("deu certo");
                    navigation.navigate('Login');
                }
            }

        } catch (error) {
            console.log(`erro ao cadastrar ${error}`);
        }
    }


    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_Logo1.png")} />

            <Title>Criar conta</Title>

            <Paragraph>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Paragraph>

            <Input placeholder="Nome" value={nome} onChangeText={(nameInput) => setNome(nameInput)} />
            <Input placeholder="E-mail" value={email} onChangeText={(emailInput) => setEmail(emailInput)} />
            <Input placeholder="Senha" value={senha} onChangeText={(senhaInput) => setSenha(senhaInput)} />
            <Input placeholder="Confirmar Senha" value={confirm} onChangeText={(confirmInput) => setConfirm(confirmInput)} />

            <NormalButton title={"Cadastrar"} fieldWidth={90} onPress={cadastrarUsuario} />

            <ContentAccount onPress={() => navigation.navigate('Login')}>
                <TextAccountLink>Cancelar</TextAccountLink>
            </ContentAccount>
        </Container>
    )
}