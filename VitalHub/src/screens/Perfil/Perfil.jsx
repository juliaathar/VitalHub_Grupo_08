import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { Title } from "../../components/Title/Style"
import { View } from "react-native"
import { useState } from "react"

export const Perfil = ({ navigation }) => {

    const [formEdit, setFormEdit] = useState(false);


    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />
                <View style={{ alignItems: "center" }}>

                    <Title>Nome do paciente</Title>
                    <Paragraph>paciente@gmail.com</Paragraph>

                    <FormField fieldWidth={90} editable={formEdit} labelText="Data de nascimento" />
                    <FormField fieldWidth={90} editable={formEdit} labelText="CPF" />
                    <FormField fieldWidth={90} editable={formEdit} labelText="Endereco" />

                    <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cep" />
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cidade" />
                    </View>

                    <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false) }} fieldWidth={90} />
                    <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }} fieldWidth={90} />
                    <GoogleButton title={"Voltar"} onPress={() => navigation.replace("Main")} fieldWidth={80} />

                </View>
            </ScrollForm>
        </Container>
    )
}