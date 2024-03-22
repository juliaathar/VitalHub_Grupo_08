import { CancelarButton, CancelarLink, DecorLine, FormPhoto, ImageTaked, OptionLine, PhotoButton, PhotoField, TextButton } from "./Style"
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Label } from "../../components/FormField/Style"
import { Line } from "../../components/DoctorModal/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { TouchableOpacity } from "react-native"
import { Text } from "react-native"
import { useState } from "react"


export const Prescricao = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    console.log(photoUri);
    const [photoTaked, setPhotoTaked] = useState(false)

    if (photoUri) {
        setPhotoTaked(true);
    }

    return (
        <Container>
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
                                <ImageTaked
                                    source={{ uri: `${photoUri}` }}
                                />
                            ) : (
                                <Text style={{ fontFamily: "MontserratAlternates_500Medium", padding: 20 }}>Nenhuma foto informada</Text>
                            )}
                        </PhotoField>
                    </FormPhoto>

                    <OptionLine>
                        <PhotoButton onPress={() => navigation.navigate('CameraTeste')}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                            <TextButton>Enviar</TextButton>
                        </PhotoButton>

                        <CancelarButton style={{ width: `50%` }}>
                            <CancelarLink>Cancelar</CancelarLink>
                        </CancelarButton>
                    </OptionLine>

                    <DecorLine></DecorLine>

                    <FormField fieldWidth={90} labelText="" fieldValue={"Resultado do exame de sangue : tudo normal"} />

                    <TouchableOpacity style={{ marginBottom: 15, marginTop: 15 }} onPress={() => navigation.replace('Main')}>
                        <LinkMedium>Voltar</LinkMedium>
                    </TouchableOpacity>
                </Container>
            </ScrollForm>
        </Container>
    )
}