import { CancelarButton, CancelarLink, DecorLine, FormPhoto, OptionLine, PhotoButton, PhotoField, TextButton } from "./Style"
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Title } from "../../components/Title/Style"
import { Label } from "../../components/FormField/Style"
import { Line } from "../../components/DoctorModal/Style"
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { LinkMedium } from "../../components/Links/Style"
import { useState } from "react"


export const Prescricao = ({ navigation, route }) => {
    const uri = route.params
    console.log(uri);
    const [photoTaked, setPhotoTaked] = useState(false)



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

                        {photoTaked ? (
                            <Image
                            // source={{ uri: `${uri}` }}
                            />
                        ) : (
                            <PhotoField>
                                <Text style={{ fontFamily: "MontserratAlternates_500Medium" }}>Nenhuma foto informada</Text>
                            </PhotoField>
                        )}
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