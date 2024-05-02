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

            console.log(user.nome + " linha 41");
            console.log(info);
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
        const token = await userDecodeToken();
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: photoUri,
            name: `image.${photoUri.split(".").pop()}`,
            type: `image/${photoUri.split(".").pop()}`
        });
    
        try {
            const response = await api.put(`/Usuario/AlterarFotoPerfil?id=${token.user}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data); 
            console.log("sucessoo"); 
            loadProfile();
        } catch (error) {
            console.log("Erro ao alterar foto:", error);
        }
    }
    const getUserPhoto = () => {
        if (user && user.idNavigation && user.idNavigation.foto) {
            return { uri: user.idNavigation.foto };
        } else {
            return require("../../assets/profile.png");
        }
    };
    

    useEffect(() => {

        loadProfile();


        console.log(`${user} teste`);
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
                    {/* <ProfilePic source={user.idNavigation.foto ? { uri: photoUri } : require("../../assets/profile.png")} /> */}
                    <ProfilePic source={getUserPhoto()}/>

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