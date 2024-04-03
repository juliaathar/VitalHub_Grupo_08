import { GoogleButton, NormalButton } from "../../components/Button/Buttons"
import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { Title } from "../../components/Title/Style"
import { View } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDecodeToken } from "../../utils/Auth"
import api from "../../service/service"

export const Perfil = ({ navigation }) => {

    const [formEdit, setFormEdit] = useState(false);

    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />
                <View style={{ alignItems: "center" }}>

                    <Title>{user.idNavigation.nome}</Title>
                    <Paragraph>teste</Paragraph>

                    <FormField fieldWidth={90} editable={formEdit} labelText="Data de nascimento" />
                    <FormField fieldWidth={90} editable={formEdit} labelText="CPF" />
                    <FormField fieldWidth={90} editable={formEdit} labelText="Endereco" />

                    <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cep" />
                        <FormField fieldWidth={45} editable={formEdit} labelText="Cidade" />
                    </View>

                    <NormalButton title={"Salvar"} onPress={() => { setFormEdit(false) }} fieldWidth={90} />
                    <NormalButton title={"editar"} onPress={() => { setFormEdit(true) }} fieldWidth={90} />
                    <GoogleButton title={"Sair do app"} onPress={() => navigation.replace("Main")} fieldWidth={70} />

                </View>
            </ScrollForm>
        </Container>
    )
}