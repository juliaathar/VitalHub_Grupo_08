import { useEffect, useState } from "react"
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

export const Prontuario = ({ navigation, route }) => {
    const { consulta } = route.params || {};

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');
    const [foto, setFoto] = useState('');

    const [formEdit, setFormEdit] = useState(false);

    async function ConsultaGet() {
        try {
            api.get(`/Consultas/BuscarPorId?id=${consulta.id}`)
                .then((response) => {

                    setEmail(response.data.paciente.idNavigation.email)
                    setNome(response.data.paciente.idNavigation.nome)
                    setFoto(response.data.paciente.idNavigation.foto)
                    setPrescricao(response.data.receita.medicamento)
                    setDiagnostico(response.data.diagnostico)
                    setDescricao(response.data.descricao)

                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(`Erro ao buscar prontuário: ${error.message}`);
        }
    }

    async function AtualizarProntuario() {
        console.log("OIIIIIIIIIIIII")
        console.log({
            id: consulta.id,
            consultaId: consulta.id,
            descricao: descricao,
            diagnostico: diagnostico,
            receita: {
                medicamento: prescricao
            }
        })
        try {
            const response = await api.put(`/Consultas/Prontuario`, {
                id : consulta.id,
                consultaId: consulta.id,
                descricao: descricao,
                diagnostico: diagnostico,
                receita: {
                    medicamento: prescricao
                }
            });

            //console.log(consulta.id);
            console.log(response.status);
        } catch (error) {
            console.log(`Erro ao atualizar prontuário: ${error.message}`);
        }
    }

    useEffect(() => {
        ConsultaGet();
        //console.log(consulta.id);
    }, [consulta])

    return (
        <Container>
            <ScrollForm>
                <ProfilePic source={foto != "" ? { uri: foto } : require("../../assets/profile.png")} />
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
                            onPress={() => { setFormEdit(true) }}
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

                    <TouchableOpacity onPress={() => navigation.replace('Main')}>
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </View>
            </ScrollForm>
        </Container>
    )
}
