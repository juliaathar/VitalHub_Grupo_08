import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { LinkMedium } from "../../components/Links/Style"
import { TouchableOpacity, View } from "react-native"
import { Title } from "../../components/Title/Style"
import { useState } from "react"

export const Prontuario = ({ navigation }) => {

    const [formEdit, setFormEdit] = useState(true);
    const [descricao, setDescricao] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [prescricao, setPrescricao] = useState("");


    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />
                <View style={{ alignItems: "center" }}>

                    <Title>Nome do paciente</Title>
                    <Paragraph>paciente@gmail.com</Paragraph>

                    <FormField
                        fieldWidth={90}
                        editable={formEdit}
                        placeholder={"Descrição"}
                        labelText="Descrição da consulta"
                        fieldValue={descricao}
                        onChangeText={(newValue) => { setDescricao(newValue) }}
                    />
                    <FormField
                        fieldWidth={90}
                        editable={formEdit}
                        placeholder={"Diagnóstico"}
                        labelText="Diagnóstico do pacienteF"
                        fieldValue={diagnostico}
                        onChangeText={(newValue) => { setDiagnostico(newValue) }}
                    />
                    <FormField
                        fieldWidth={90}
                        editable={formEdit}
                        placeholder={"Prescrição medica"}
                        labelText="Prescrição médica"
                        fieldValue={prescricao}
                        onChangeText={(newValue) => { setPrescricao(newValue) }}
                    />

                    {formEdit == false ? (
                        <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }} fieldWidth={90} />
                    ) : (
                        <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false) }} fieldWidth={90} />
                    )}

                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </View>
            </ScrollForm>
        </Container>
    )
}