import { ConsultationModal } from "../../components/ConsultationModal/ConsultationModal"
import { CalendarApp } from "../../components/CalendarApp/CalendarApp";
import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { NormalButton } from "../../components/Button/Buttons"
import { Paragraph } from "../../components/Paragraph/Style";
import { Container } from "../../components/Container/Style"
import { MedCard } from "../../components/MedCard/MedCard"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { userDecodeToken } from "../../utils/Auth"
import { CardList, Nothing } from "../Home/Style"
import { TouchableOpacity } from "react-native"
import { Body, RenderInside } from "./Style"
import { useEffect, useState } from "react"
import api from "../../service/service"


export const AgendarConsulta = ({ navigation, route }) => {
    //status da pagina
    const { nivel, localidade } = route.params || {};
    const [profile, setProfile] = useState("");
    const [status, setStatus] = useState("clínica"); //status define o titulo e tambem o conteudo da tela

    //chamados pela API
    const [medicosLista, setMedicosLista] = useState(null); //lista de medicos
    const [clinicasLista, setClinicasLista] = useState(null); //lista de clinicas
    const [dados, setDados] = useState([]) //dados que serao usados para o cadastro

    //front-end
    const [medicoSelected, setMedicoSelected] = useState(""); //id do medico selecionado
    const [clinicaSelected, setClinicaSelected] = useState(""); //id da clinica selecionada
    const [negado, setNegado] = useState(true) //validação do botão

    //calendario e select
    const [diaSelected, setDiaSelected] = useState(""); //id do dia selecionada
    const [horaSelected, setHoraSelected] = useState(""); // dia selecionado no calendario
    const [consulModal, setConsulModal] = useState(false); //mudar modal final de cadastro

    //traz os medicos da api
    async function ListarMedicos() {
        //Instanciar
        await api.get(`/Medicos/BuscarPorIdClinica?id=${clinicaSelected.id}`)
            .then(async (response) => {
                setMedicosLista(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    //traz as clinicas da api
    async function ListarClinicas() {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${localidade}`)
            .then(async (response) => {
                setClinicasLista(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    async function ProfileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setProfile(token)
        }
    }

    //Reuni todos os dados para realizar a requisicao
    async function CompilarDados() {
        const dataConsulta = `${diaSelected} ${horaSelected}`
        console.clear()
        const dadosInserir = {
            dataConsulta: dataConsulta,
            medicoId: medicoSelected.id,
            nomeMedico: medicoSelected.idNavigation.nome,
            especialidade: medicoSelected.especialidade.especialidade1,
            medicoClinica: medicoSelected.id,
            clinicaId: clinicaSelected.id,
            clinicaNome: clinicaSelected.nomeFantasia,
            prioridadeId: nivel.id,
            prioridadeLabel: nivel.prioridade,
            localidade: localidade
        }
        await setDados(dadosInserir)
    }

    async function CadastrarConsulta() {
        await api.post('/Consultas/Cadastrar', {
            pacienteId: profile.user,
            situacaoId: "791B5F13-EECA-4229-B751-712E702D8837",
            medicoClinicaId: dados.medicoClinica,
            prioridadeId: dados.prioridadeId,
            dataConsulta: dados.dataConsulta,
            descricao: "",
            diagnostico: ""
        })
            .then((response) => {
                console.log(`Cadastro de consulta feita: ${response.status}`);
                //console.log(response.data);
                navigation.replace("Main")
            }).catch(error => {
                console.log(`Erro no cadastro de consulta: ${error}`);
            })
    }

    const emptyComponent = () => {
        return (
            <Nothing>
                <Paragraph>Ops! Nenhuma encontrada em {localidade}</Paragraph>
            </Nothing>
        )
    }

    function validarButton() {
        switch (status) {
            case "clínica":
                clinicaSelected === "" ? setNegado(true) : setNegado(false)
                break;

            case "médico":
                medicoSelected === "" ? setNegado(true) : setNegado(false)
                break;

            case "data":
                diaSelected && horaSelected ? setNegado(true) : setNegado(false)
                break;

            default:
                break;
        }
    }

    //atualiza as chamadas
    useEffect(() => {
        ListarClinicas()
        ProfileLoad()
    }, [])

    //atualizar o botão
    useEffect(() => {
        validarButton()
    }, [status, clinicaSelected, medicoSelected, horaSelected])

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
                                    ListEmptyComponent={emptyComponent}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <ClinicCard
                                            nomeClinica={item.nomeFantasia}
                                            nota={""}
                                            dias={""}
                                            local={item.endereco.logradouro}
                                            //funções
                                            actived={clinicaSelected.id == item.id}
                                            onPress={() => setClinicaSelected(item)}
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
                                    setDiaSelected={setDiaSelected}
                                    setHoraSelected={setHoraSelected}
                                />
                            )
                        }
                    </RenderInside>

                    <NormalButton
                        title={"Continuar"}
                        denied={negado}

                        onPress={() => {
                            switch (status) {
                                case "":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    clinicaSelected === "" ? setStatus("clínica") : (setStatus("médico"), ListarMedicos())
                                    break;
                                case "médico":
                                    medicoSelected === "" ? setStatus("médico") : setStatus("data")
                                    break;
                                case "data":
                                    diaSelected && horaSelected ? (setConsulModal(true), CompilarDados()) : ""
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
                onRequestClose={() => (setConsulModal(false))}
                navigation={navigation}
                dados={dados}
                onPress={() => CadastrarConsulta()}
            />
        </>
    )
}