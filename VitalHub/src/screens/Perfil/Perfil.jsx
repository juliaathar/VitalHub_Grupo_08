import { GoogleButton, NormalButton } from "../../components/Button/Buttons";
import { Masks, useMaskedInputProps } from 'react-native-mask-input';
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
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style";

export const Perfil = ({ navigation, route }) => {

    const { photoUri } = route.params || {};
    const [formEdit, setFormEdit] = useState(false);
    const [user, setUser] = useState();
    // const [loading, setLoading] = useState(false);

    const [tokenUser, setTokenUser] = useState();

    //Dados do formulario
    //Paciente
    const [dataNascimento, setDataNascimento] = useState("00/00/0000")
    const [cpf, setCpf] = useState()

    //Geral
    const [logradouro, setLogradouro] = useState()
    const [numeroEndereco, setNumeroEndereco] = useState()
    const [cep, setCep] = useState()
    const [cidade, setCidade] = useState()

    //mascaras
    const dataMasked = useMaskedInputProps({
        value: dataNascimento,
        onChangeText: setDataNascimento,
        mask: Masks.DATE_DDMMYYYY
    });

    const cpfMasked = useMaskedInputProps({
        value: cpf,
        onChangeText: setCpf,
        mask: Masks.BRL_CPF
    })

    const maskedCEP = useMaskedInputProps({
        value: cep,
        onChangeText: setCep,
        mask: Masks.ZIP_CODE
    })

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

            //console.log(info.data);
        }
        catch (error) {
            return console.log(`erro ${error}`);
        }
    }

    function PreencherCampos() {
        tokenUser?.role === 'Paciente' ? (
            setDataNascimento(user ? moment(user.dataNascimento).format("DD/MM/YYYY") : ''),
            setCpf(user ? user.cpf : "")
        ) : ("")

        setCep(user && user.endereco ? user.endereco.cep : '')
        setLogradouro(user ? user.endereco.logradouro : "")
        setNumeroEndereco(user ? user.endereco.numero : "")
        setCidade(user && user.endereco ? user.endereco.cidade : '')
    }

    async function handleLogout() {
        try {
            if (tokenUser) {
                //console.log(tokenUser);
                await AsyncStorage.removeItem('tokenUser')
                //console.log(tokenUser);

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
            //console.log(response.data);
            console.log("sucessoo");
            loadProfile();
        } catch (error) {
            console.log("Erro ao alterar foto:", error);
        }
    }
    async function AtualizarPerfil() {
        const [dia, mes, ano] = dataNascimento.split("/")
        const novaData = new Date(`${ano}-${mes}-${dia}`)

        tokenUser?.role === 'Paciente' ? (
            //Paciente
            api.patch(`/Pacientes?idUsuario=${user.id}`, {
                cpf: cpf,
                dataNascimento: novaData,
                novoEndereco: {
                    cep: cep,
                    logradouro: logradouro,
                    numero: numeroEndereco,
                    cidade: cidade,
                    latitude: 0,
                    longitude: 0
                }
            })
                .then((response) => {
                    console.log(response.status);
                })
                .catch(error => {
                    console.log(error + "Paciente atualizando");
                })
        ) : (
            api.patch(`/Medicos?idUsuario=${user.id}`, {
                cep: cep,
                logradouro: logradouro,
                cidade: cidade,
                numero: numeroEndereco
            })
                .then((response) => {
                    console.log(response.status);
                })
                .catch(error => {
                    console.log(error + "Medico atualizando");
                })
        )
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
    }, []);
    useEffect(() => {
        PreencherCampos()
    }, [user])
    useEffect(() => {
        if (photoUri) {
            AlterarFoto()
        }
    }, [photoUri])

    return (
        <Container>
            <ScrollForm>
                <ProfileContainer>
                    <ProfilePic source={getUserPhoto()} />

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
                                fieldValue={dataMasked.value}
                                onChangeText={(data) => { setDataNascimento(data) }}
                                KeyType="numeric"
                                placeholder={"Insira sua data de nascimento"}
                            />
                            <FormField
                                fieldWidth={90}
                                editable={formEdit}
                                labelText="CPF"
                                fieldValue={cpfMasked.value == "" && !formEdit ? "Informe seu CPF" : cpfMasked.value}
                                onChangeText={(c) => { setCpf(c) }}
                                KeyType="numeric"
                                placeholder={"Informe seu CPF"}
                            />
                        </>
                    )}

                    {tokenUser?.role === 'Médico' && (
                        <>
                            <FormField
                                fieldWidth={90}
                                editable={false}
                                labelText="Especialidade"
                                fieldValue={user ? user.especialidade.especialidade1 : ``}
                            />
                            <FormField
                                fieldWidth={90}
                                editable={false}
                                labelText="CRM"
                                fieldValue={user?.crm}
                            />
                        </>
                    )}

                    {!formEdit ? (
                        <FormField
                            fieldWidth={90}
                            editable={formEdit}
                            labelText="Endereco"
                            fieldValue={user && user.endereco.logradouro && user.endereco.numero ? `${logradouro} ${numeroEndereco}` : "Informe seu endereço"}
                        />
                    ) : (
                        <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                            <FormField
                                fieldWidth={65}
                                editable={formEdit}
                                labelText="Logradouro"
                                fieldValue={logradouro}
                                onChangeText={(l) => { setLogradouro(l) }}
                                placeholder={"informe seu logradouro"}
                            />
                            <FormField
                                fieldWidth={30}
                                editable={formEdit}
                                labelText="Número"
                                fieldValue={numeroEndereco}
                                onChangeText={(n) => { setNumeroEndereco(n) }}
                                KeyType="numeric"
                                placeholder={"informe o numero"}
                            />
                        </View>
                    )}

                    <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormField
                            fieldWidth={45}
                            editable={formEdit}
                            labelText="CEP"
                            fieldValue={maskedCEP.value == "" && !formEdit ? "Informe" : maskedCEP.value}
                            onChangeText={(c) => { setCep(c) }}
                            maxLength={8}
                            KeyType="numeric"
                            placeholder={"informe seu CEP"}
                        />
                        <FormField
                            fieldWidth={45}
                            editable={formEdit}
                            labelText="Cidade"
                            fieldValue={cidade == "" && !formEdit ? "Informe" : cidade}
                            onChangeText={(c) => { setCidade(c) }}
                            placeholder={"informe a cidade"}
                        />
                    </View>

                    {formEdit ? (
                        <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false), AtualizarPerfil() }}
                            fieldWidth={90} />
                    ) : (
                        <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }}
                            fieldWidth={90} />
                    )}

                    {formEdit ? (
                        <GoogleButton title={"Cancelar"} onPress={() => setFormEdit(false)}
                            fieldWidth={90} />
                    ) : (

                        // <GoogleButton title={"Sair do app"} onPress={handleLogout}
                        // fieldWidth={90} />
                        <ContentAccount onPress={handleLogout}>
                            <TextAccountLink>Sair</TextAccountLink>
                        </ContentAccount>
                    )}



                </View>
            </ScrollForm>
        </Container>
    )
}