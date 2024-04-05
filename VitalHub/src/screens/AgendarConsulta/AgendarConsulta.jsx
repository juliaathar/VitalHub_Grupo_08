import { ConsultationModal } from "../../components/ConsultationModal/ConsultationModal"
import { CalendarApp } from "../../components/CalendarApp/CalendarApp";
import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { MedCard } from "../../components/MedCard/MedCard"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { TouchableOpacity } from "react-native"
import { Body, RenderInside } from "./Style"
import { useEffect, useState } from "react"
import { CardList } from "../Home/Style"
import api from "../../service/service"

export const AgendarConsulta = ({ navigation, route }) => {
    //status da pagina
    const [status, setStatus] = useState("clínica");
    const {nivel, localidade} = route.params || {};

    //chamados pela API
    const [medicosLista, setMedicosLista] = useState(null)
    const [clinicasLista, setClinicasLista] = useState(null)
    const [dados, setDados] = useState([])

    //front-end
    const [medicoSelected, setMedicoSelected] = useState("");//id do medico selecionado
    const [clinicaSelected, setClinicaSelected] = useState("");//id da clinica selecionada

    //calendario e select
    const [diaSelected, setDiaSelected] = useState("");//id do dia selecionada
    const [consulModal, setConsulModal] = useState(false); //mudar para false

    //traz os medicos da api
    async function ListarMedicos() {
        //Instanciar
        await api.get("http://172.16.39.82:4466/api/Medicos")
            .then(async (response) => {
                setMedicosLista(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    //traz as clinicas da api
    async function ListarClinicas() {
        await api.get("http://172.16.39.82:4466/api/Clinica/ListarTodas")
            .then(async (response) => {
                setClinicasLista(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    function CompilarDados() {

        const dados = {
            data: diaSelected,
            nomeMedico: medicoSelected.idNavigation.nome,
            especialidade: medicoSelected.especialidade.especialidade1,
            nivel: nivel,
            localidade: localidade
        }
        setDados(dados)
    }


    //atualiza as chamadas
    useEffect(() => {
        ListarMedicos()
        ListarClinicas()
    }, [])

    return (
        <>
            <Container style={{ justifyContent: "center", alignItems: "center", margin: 0 }}>
                <Body>
                    <Title style={{ marginTop: 25, marginBottom: 25 }}>Selecionar {status}</Title>

                    <RenderInside>
                        {status === "clínica" ?
                            (
                                <CardList
                                    data={clinicasLista}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <ClinicCard
                                            nomeClinica={item.nomeFantasia}
                                            nota={""}
                                            dias={""}
                                            local={item.endereco.logradouro}
                                            //funções
                                            actived={clinicaSelected == item.id}
                                            onPress={() => setClinicaSelected(item.id)}
                                        />
                                    }
                                />
                            ) : status === "médico" ? (
                                <CardList
                                    data={medicosLista}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <MedCard
                                            medicos={item}
                                            //funções
                                            actived={medicoSelected.id == item.id}
                                            onPress={() => setMedicoSelected(item)}
                                        />
                                    }
                                />
                            ) : (
                                <CalendarApp 
                                    setDiaSelected = {setDiaSelected}
                                />
                            )
                        }
                    </RenderInside>

                    <NormalButton
                        title={"Continuar"}
                        onPress={() => {
                            switch (status) {
                                case "":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    clinicaSelected === "" ? setStatus("clínica") :
                                        setStatus("médico")
                                    break;
                                case "médico":
                                    medicoSelected === "" ? setStatus("médico") :
                                        setStatus("data")
                                    break;
                                case "data":
                                    (setConsulModal(true), CompilarDados())
                                    break;
                                default:
                                    setStatus("data")
                                    break;
                            }
                        }}
                    />

                    <TouchableOpacity
                        style={{ marginBottom: 15 }}
                        onPress={() => {
                            switch (status) {
                                case "data":
                                    setStatus("médico")
                                    break;
                                case "médico":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    { navigation.replace('Main') }
                                    break;
                                default:
                                    setStatus("clínica")
                                    break;
                            }
                        }}
                    >
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </Body>
            </Container>

            <ConsultationModal
                visible={consulModal}
                onRequestClose={() => setConsulModal(false)}
                navigation={navigation}
                dados={dados}
            />
        </>
    )
}