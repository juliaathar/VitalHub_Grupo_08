import { CancelarButton, CancelarLink, DecorLine, FormPhoto, ImageTaked, ImageTouch, OptionLine, PhotoButton, PhotoField, PhotosList, TextButton } from "./Style"
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Line } from "../../components/DoctorModal/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Label } from "../../components/FormField/Style"
import { Title } from "../../components/Title/Style"
import { TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import { Text } from "react-native"
import { PhotoTaked } from "../../components/Photo/Photo"
import api from "../../service/service"


export const Prescricao = ({ navigation, route }) => {
    const { photoUri, id } = route.params || {};
    const [modalPhoto, setModalPhoto] = useState(false);
    const [modalUri, setModalUri] = useState('');
    const [photoTaked, setPhotoTaked] = useState(false)
    const [descricao, setDescricao] = useState("")
    const [photos, setPhotos] = useState([]);
    const [lista, setLista] = useState([]);

    const [novoProntuario, setNovoProntuario] = useState()

    async function ConsultaGet() {
        await api.get(`/Consultas/BuscarPorId?id=${id}`)
            .then(async response => {
                //console.log("Consulta get");
                //console.log("consultas ------------------------------------------------------------------------------- " + JSON.stringify(response.data));
                await setNovoProntuario(response.data);
                console.log(novoProntuario);
            })
            .catch(error => {
                console.log(`Erro em ConsultaGet: ${error}`);
            })

        // await api.get(`/Exame/BuscarPorIdConsulta?id=${id}`)
        // .then(async response => {
        //     console.log("exames------------------------------------------------------------------------------- " + JSON.stringify(response.data))
        //     await setNovoExame(response.data)
        //     console.log(novoExame);
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }

    const getUserPhoto = () => {
        if (novoProntuario) {
            return { uri: novoProntuario.medicoClinica.medico.idNavigation.foto };
        } else {
            return require("../../assets/profile.png");
        }
    };

    async function InserirExame() {
        const formData = new FormData()
        formData.append("ConsultaId", novoProntuario.id)
        formData.append("Arquivo", {
            uri: photoUri,
            name: `image.${photoUri.split('.').pop()}`,
            type: `image/${photoUri.split('.').pop()}`
        });
        console.log(formData);
        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setDescricao(descricao + '\n' + response.data.descricao)
            console.log(response.status);
        }).catch(error => {
            console.log(error + " inserir exames deu errado ");
        })
    }
    useEffect(() => {
        ConsultaGet();
    }, [])

    useEffect(() => {
        arrayOCR()
    },[novoProntuario])

    useEffect(() => {
        if (photoUri !== undefined) {
            setPhotos(prevPhotos => [...prevPhotos, { uri: photoUri, id: photoUri }]);
        }
        if (photoUri) {
            setPhotoTaked(true);
            InserirExame()
        }
    }, [photoUri]);

    function arrayOCR() {
        const exames = novoProntuario ? novoProntuario.exames : []

        exames.map( (item, index) => {
            setLista(`${lista} \n ${item.descricao}`);
        })
    }

    return (
        <>
            <ScrollForm>
                <ProfilePic source={getUserPhoto()} />

                <Container>
                    <Title style={{ marginTop: 15 }}>{novoProntuario ? novoProntuario.medicoClinica.medico.idNavigation.nome : "vazio"}</Title>
                    <Line>
                        <Paragraph>{novoProntuario ? novoProntuario.medicoClinica.medico.especialidade.especialidade1 : "vazio"}</Paragraph>
                        <Paragraph>{novoProntuario ? novoProntuario.medicoClinica.medico.crm : "vazio"}</Paragraph>
                    </Line>

                    <FormField
                        fieldWidth={90}
                        labelText="Descrição da consulta"
                        fieldValue={novoProntuario ? novoProntuario.descricao : "vazio"}
                    />
                    <FormField
                        fieldWidth={90}
                        labelText="Diagnóstico do paciente"
                        fieldValue={novoProntuario ? novoProntuario.diagnostico : "vazio"}
                    />
                    <FormField
                        fieldWidth={90}
                        labelText="Prescrição médica"
                        fieldValue={novoProntuario && novoProntuario.receita && novoProntuario.receita.medicamento || "vazio"}
                    />

                    <FormPhoto>
                        <Label>Exames médicos</Label>

                        <PhotoField>
                            {photoTaked ? (
                                <PhotosList
                                    numColumns={2}
                                    data={photos}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <ImageTouch onPress={() => (setModalPhoto(true), setModalUri(item.uri))}>
                                            <ImageTaked
                                                source={{ uri: `${item.uri}` }}
                                            />
                                        </ImageTouch>
                                    }
                                />
                            ) : (
                                <Text style={{ fontFamily: "MontserratAlternates_500Medium", padding: 20 }}>Nenhuma foto informada</Text>
                            )}
                        </PhotoField>
                    </FormPhoto>

                    <OptionLine>
                        <PhotoButton onPress={() => navigation.navigate('CameraScreen', { Tela: "Prescricao" })}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                            <TextButton>Enviar</TextButton>
                        </PhotoButton>

                        <CancelarButton style={{ width: `50%` }}>
                            <CancelarLink>Cancelar</CancelarLink>
                        </CancelarButton>
                    </OptionLine>

                    <DecorLine />

                    <FormField
                        fieldWidth={90}
                        labelText=""
                        fieldValue={novoProntuario ?
                            lista
                            :
                            "nada"
                        }
                    />

                    <TouchableOpacity style={{ marginBottom: 15, marginTop: 15 }} onPress={() => navigation.replace('Main')}>
                        <LinkMedium>Voltar</LinkMedium>
                    </TouchableOpacity>
                </Container>
            </ScrollForm>

            <PhotoTaked
                titleButton="Deletar"
                RequestSave={() => setModalPhoto(false)}
                uriPhoto={modalUri}
                visible={modalPhoto}
                onRequestClose={() => setModalPhoto(false)}
            />
        </>
    )
}