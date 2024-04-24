import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { Title } from "../../components/Title/Style"
import { userDecodeToken } from "../../utils/Auth"
import { useEffect, useState } from "react"
import api from "../../service/service"
import { View } from "react-native"
import moment from "moment"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ButtonCamera, ProfileContainer } from "./Style";

export const Perfil = ({ navigation, route }) => {

    const { photoUri } = route.params || {};
    const [formEdit, setFormEdit] = useState(false);
    const [user, setUser] = useState();
    const [tokenUser, setTokenUser] = useState();

    async function loadProfile() {
        try {
            const token = await userDecodeToken()

            setTokenUser(token)

            const id = token.user;
            if (token.role === 'Paciente') {
                info = await api.get(`/Pacientes/BuscarPorID?id=${id}`);
            } else if (token.role === 'Médico') {
                info = await api.get(`/Medicos/BuscarPorID?id=${id}`);
            }
            if (info) { setUser(info.data) }

            //console.log(user + " linha 41");

        }
        catch (error) {
            return console.log(`erro ${error}`);
        }
    }

    async function handleLogout() {
        try {
            if (tokenUser) {
                console.log(tokenUser);
                await AsyncStorage.removeItem('tokenUser')
                console.log(tokenUser);

                navigation.replace('Login');
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    async function AlterarFoto() {
        const token = await userDecodeToken()
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: photoUri,
            name: `image.${photoUri.split(".")[3]}`,
            type: `image.${photoUri.split(".")[3]}`
        })

        await api.put(`/Usuario/AlterarFotoPerfil?id${token.user}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
            console.log(token.user);
            console.log(photoUri);
        })
    }

    async function updateUser() {
        try {
            const endpoint = tokenUser.role === 'Paciente' ? '/Pacientes/Update' : '/Medicos/Update';
            const updatedUser = endpoint === '/Pacientes/Update' ?
                {
                    cpf: user.cpf,
                    dataNascimento: "2024-04-24T12:27:47.518Z",
                    novoEndereco: {
                        cep: user.endereco.cep,
                        logradouro: user.endereco.logradouro,
                        numero: 0,
                        longitude: 0,
                        latitude: 0,
                        cidade: user.endereco.cidade
                    }
                }
                :
                {
                    foto: photoUri,
                    cep: user.endereco.cep,
                    logradouro: user.endereco.logradouro,
                    cidade: user.endereco.cidade,
                    numero: 0,
                    crm: user?.crm,
                }
            const response = await api.put(endpoint, updatedUser);
            if (response.status === 200) {
                console.log('User updated successfully');
                loadProfile();
            } else {
                // Handle errors
                console.log('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {

        loadProfile();
        console.log(user);
    }, []);

    useEffect(() => {
        if (photoUri) {
            AlterarFoto()
        }
    }, [photoUri])
    return (
        <Container>
            <ScrollForm>
                <ProfileContainer>
                    <ProfilePic source={photoUri ? { uri: photoUri } : require("../../assets/profile.png")} />

                    <ButtonCamera onPress={() => navigation.navigate('CameraScreen', { SetMediaLabrary: true, Tela: "Main" })}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                    </ButtonCamera>
                </ProfileContainer>
                <View style={{ alignItems: "center" }}>

                    <Title>{user?.idNavigation.nome}</Title>
                    <Paragraph>{user?.idNavigation.email}</Paragraph>



                    {tokenUser?.role === 'Paciente' && (
                        <>
                            <FormField
                                fieldWidth={90}
                                editable={formEdit}
                                labelText="Data de nascimento"
                                fieldValue={user ? moment(user.dataNascimento).format("DD/MM/YYYY") : ''}
                                onChangeText={""}
                            />
                            <FormField
                                fieldWidth={90}
                                editable={formEdit}
                                labelText="CPF"
                                fieldValue={user ? user.cpf : ""}
                                onChangeText={""}
                            />
                            <FormField
                                fieldWidth={90}
                                editable={formEdit}
                                labelText="Endereco"
                                fieldValue={user ? `${user.endereco.logradouro} ${user.endereco.numero}` : ""}
                                onChangeText={""}
                            />
                        </>
                    )}

                    {tokenUser?.role === 'Médico' && (
                        <>
                            <FormField fieldWidth={90} editable={false} labelText="Especialidade" fieldValue={user ? user.especialidade.especialidade1 : ``} />
                            <FormField fieldWidth={90} editable={formEdit} labelText="CRM" fieldValue={user?.crm} />
                            <FormField fieldWidth={90} editable={formEdit} labelText="Endereco" fieldValue={user ? `${user.endereco.logradouro} ${user.endereco.numero}` : ""} />
                        </>
                    )}

                    <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cep" fieldValue={user && user.endereco ? user.endereco.cep : ''} />
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cidade" fieldValue={user && user.endereco ? user.endereco.cidade : ''} />
                    </View>

                    <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false) }} fieldWidth={90} />
                    <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }} fieldWidth={90} />
                    <GoogleButton title={"Sair do app"} onPress={handleLogout} fieldWidth={70} />

                </View>
            </ScrollForm>
        </Container>
    )
}