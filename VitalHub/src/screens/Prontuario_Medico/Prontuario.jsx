import { FormField } from "../../components/FormField/FormField"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style"
import { Container } from "../../components/Container/Style"
import { ProfilePic } from "../../components/Profile/Style"
import { LinkMedium } from "../../components/Links/Style"
import { TouchableOpacity, View } from "react-native"
import { Title } from "../../components/Title/Style"
import { useEffect, useState } from "react"
import api from "../../service/service"

export const Prontuario = ({ navigation, route }) => {
    const { consulta } = route.params || {};

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');

    const [formEdit, setFormEdit] = useState(false);
    const [novoProntuario, setNovoProntuario] = useState({});

    async function GetConsulta() {
        try {
            api.get(`/Consultas/BuscarPorId?id=${consulta}`)
            .then( (response) => {
                setNovoProntuario(response.data)
                console.log(novoProntuario);

                setNome(novoProntuario.paciente.idNavigation.nome)
                setEmail(novoProntuario.paciente.idNavigation.email)
                setDescricao(novoProntuario.descricao)
                setDiagnostico(novoProntuario.diagnostico)
                setPrescricao("vazio")

            })
            .catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(`Erro ao buscar prontuário: ${error.message}`);
        }
    }

    async function AtualizarProntuario() {
        try {
            const response = await api.put(`/Consultas/Prontuario/${novoProntuario.id}`, novoProntuario);
            console.log(`nao entrou no if!`);


            if (response.status === 200) {
                console.log(`Prontuário atualizado com sucesso!`);
            } else {
                console.log(`Erro ao atualizar prontuário: ${response.statusText}`);
            }
        } catch (error) {
            console.log(`Erro ao atualizar prontuário: ${error.message}`);
        }
    }
    

    useEffect(() => {
        console.log('Consulta recebida:', consulta);
        GetConsulta()
    }, []);
    

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
