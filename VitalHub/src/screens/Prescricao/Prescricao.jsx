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


export const Prescricao = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const [modalPhoto, setModalPhoto] = useState(false);
    const [modalUri, setModalUri] = useState('');
    const [photoTaked, setPhotoTaked] = useState(false)
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (photoUri !== undefined) {
            setPhotos(prevPhotos => [...prevPhotos, { uri: photoUri, id: photoUri }]);
        }
        if (photoUri) {
            setPhotoTaked(true);
        }
    }, [photoUri]);

    return (
        <>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />

                <Container>
                    <Title>Dr. Claudio</Title>
                    <Line>
                        <Paragraph>{"especialidade"}</Paragraph>
                        <Paragraph>{"codigo"}</Paragraph>
                    </Line>

                    <FormField fieldWidth={90} labelText="Descrição da consulta" />
                    <FormField fieldWidth={90} labelText="Diagnóstico do paciente" />
                    <FormField fieldWidth={90} labelText="Prescrição médica" />


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
                        <PhotoButton onPress={() => navigation.navigate('CameraScreen')}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                            <TextButton>Enviar</TextButton>
                        </PhotoButton>

                        <CancelarButton style={{ width: `50%` }}>
                            <CancelarLink>Cancelar</CancelarLink>
                        </CancelarButton>
                    </OptionLine>

                    <DecorLine/>

                    <FormField fieldWidth={90} labelText="" fieldValue={"Resultado do exame de sangue : tudo normal"} />

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