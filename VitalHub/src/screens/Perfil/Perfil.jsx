import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { Title } from "../../components/Title/Style"
import { View } from "react-native"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../service/service"

export const Perfil = ({ navigation }) => {

    const [formEdit, setFormEdit] = useState(false);

    const [user, setUser] = useState();

    const [tokenUser, setTokenUser] = useState();


    async function loadProfile() {
        try {
            const token = await userDecodeToken()

            setTokenUser(token)

            const id = token.user;
            // console.log(id);
            if (token.role === 'Paciente') {
                info = await api.get(`/Pacientes/BuscarPorID?id=${id}`);
            } else if (token.role === 'Médico') {
                info = await api.get(`/Medicos/BuscarPorID?id=${id}`);
            }
            // console.log('Dados obtidos da API:', info)
            if (info) { setUser(info.data) }
            console.log(user);
            console.log('ersrerserser');

        }
        catch (error) {
            return console.log(`erro ${error}`);
        }
    }

    useEffect(() => {

        loadProfile();

    }, []);

    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />
                <View style={{ alignItems: "center" }}>

                    <Title>{user?.idNavigation.nome}</Title>
                    <Paragraph>{user?.idNavigation.email}</Paragraph>



                    {tokenUser?.role === 'Paciente' && (
                        <>
                            <FormField fieldWidth={90} editable={formEdit} labelText="Data de nascimento" />
                            <FormField fieldWidth={90} editable={formEdit} labelText="CPF" />
                            <FormField fieldWidth={90} editable={formEdit} labelText="Endereco" />
                        </>
                    )}

                    {tokenUser?.role === 'Médico' && (
                        <>
                            <FormField fieldWidth={90} editable={formEdit} labelText="Especialidade" fieldValue={user?.especialidade.especialidade1} />
                            <FormField fieldWidth={90} editable={formEdit} labelText="CRM" fieldValue={user?.crm} />
                            <FormField fieldWidth={90} editable={formEdit} labelText="Endereco" fieldValue={user?.endereco.logradouro} />
                        </>
                    )}
                    
                    <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cep" fieldValue={user?.endereco.cep} />
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cidade" fieldValue={user?.endereco.cidade} />
                    </View>

                    <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false) }} fieldWidth={90} />
                    <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }} fieldWidth={90} />
                    <GoogleButton title={"Sair do app"} onPress={() => navigation.replace("Main")} fieldWidth={70} />

                </View>
            </ScrollForm>
        </Container>
    )
}