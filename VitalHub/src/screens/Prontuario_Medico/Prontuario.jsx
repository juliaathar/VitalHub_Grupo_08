import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { LinkMedium } from "../../components/Links/Style"
import { TouchableOpacity, View } from "react-native"
import { Title } from "../../components/Title/Style"
import api from "../../service/service"
import { useState } from "react"

export const Prontuario = ({ navigation, route }) => {
    const { consulta } = route.params || {};
    
    const nome = consulta.paciente.idNavigation.nome;
    const email = consulta.paciente.idNavigation.email;

    const [descricao, setDescricao] = useState(consulta.descricao);
    const [diagnostico, setDiagnostico] = useState(consulta.diagnostico);
    const [prescricao, setPrescricao] = useState(consulta.receita.medicamento);
    
    const [formEdit, setFormEdit] = useState(false);
    const [novoProntuario, setNovoProntuario] = useState({})

    async function AtualizarProntuario() {
        await api.pacth(`/Consultas/Prontuario` , novoProntuario)
            .then(response => {
                console.log(`Prontuario atualizado com exito! ${response.status}`);
            })
            .catch(error => {
                console.log(`Erro ao atualizar: ${error}`);
            })
    }

    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={require("../../assets/profile.png")} />
                <View style={{ alignItems: "center" }}>

                    <Title> {nome} </Title>
                    <Paragraph> {email} </Paragraph>

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
                        labelText="Diagnóstico do paciente"
                        fieldValue={diagnostico}
                        onChangeText={(newValue) => { setDiagnostico(newValue) }}
                    />
                    <FormField
                        fieldWidth={90}
                        editable={formEdit}
                        placeholder={"Prescrição médica"}
                        labelText="Prescrição médica"
                        fieldValue={prescricao}
                        onChangeText={(newValue) => { setPrescricao(newValue) }}
                    />

                    {formEdit == false ? (
                        <NormalButton
                            title={"editar"}
                            fieldWidth={90}
                            onPress={() => {
                                setNovoProntuario({
                                    descricao: descricao,
                                    diagnostico: diagnostico,
                                    prescricao: prescricao
                                })
                                setFormEdit(true)
                            }}
                        />
                    ) : (
                        <NormalButton
                            title={"Salvar"}
                            fieldWidth={90}
                            onPress={() => {
                                AtualizarProntuario()
                                setFormEdit(false)
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </View>
            </ScrollForm>
        </Container>
    )
}