import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { ConsultationData } from "../../components/ConsultationData/ConsultationData"
import { PromptuaryModal } from "../../components/PromptuaryModal/PromptuaryModal"
import { NewConsulModal } from "../../components/NewConsulModal/NewConsulModal"
import { OptionButtons } from "../../components/OptionButtons/OptionButtons"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { DoctorModal } from "../../components/DoctorModal/DoctorModal"
import { CardList, ContainerBox, NewConsul, Nothing } from "./Style"
import { Container } from "../../components/Container/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react"
import api from "../../service/service"

//notificacoes
//importa a notificacao
import { Paragraph } from "../../components/Paragraph/Style"
import * as Notifications from "expo-notifications"
import { userDecodeToken } from "../../utils/Auth"
import moment from "moment"

//solicitar a permissao
Notifications.requestPermissionsAsync()
//definir como as notificacoes devem ser tratadas
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        //mostra alerta quando a notificacao for recebida
        shouldShowAlert: true,

        //configura som ao receber a notificacao
        shouldPlaySound: true,

        //configura numero de notificaoes no icone do app
        shouldSetBadge: false,
    })
});


export const Home = ({ navigation }) => {
    const [statusLista, setStatusLista] = useState("pendente");
    const [profile, setProfile] = useState('Paciente')
    const [user, setUser] = useState()
    const [diaSelecionado, setDiaSelecionado] = useState(moment().format("YYYY-DD-MM"))

    const [modalCancel, setModalCancel] = useState(false);
    const [modalNewConsul, setModalNewConsul] = useState(false);
    const [modalDoctor, setModalDoctor] = useState(false);
    const [modalPromptuary, setModalPromptuary] = useState(false);
    const [idEncontrado, setIdEncontrado] = useState("");
    const [consultas, setConsultas] = useState([]);

    const profileLoad = async () => {
        try {
            const token = await userDecodeToken();
            //console.log("Token do usuário:", token);
            setProfile(token);
            setDiaSelecionado(moment().format("YYYY-MM-DD"));
            loadUser(token.user);
        } catch (error) {
            console.error('Erro ao carregar o perfil do usuário:', error);
        }
    };

    const loadUser = async (userId) => {
        try {
            const resp = await api.get(`/Usuario/BuscarPorID?id=${userId}`);
            //console.log("Dados do usuário:", resp.data);
            setUser(resp.data);
        } catch (error) {
            //console.log(`Erro usuário: ${error}`);
        }
    };

    async function ListarConsulta() {
        const url = (profile.role == "Médico" ? "Medicos" : "Pacientes")


        await api.get(`/${url}/BuscarPorData?data=${diaSelecionado}&id=${profile.user}`)
            .then(async response => {
                await setConsultas(response.data);
                //console.log(diaSelecionado);
                //console.log(response.data);

            }).catch(error => {
                //console.log(error);
            })
        ChecarDataConsulta()
    }

    async function CancelarConsulta(item) {
        await api.patch(`/Consultas/Status?idConsulta=${item.id}&status=Cancelado`)
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                console.log(`Erro em cancelar a consulta! : ${error}`);
            })
        setModalCancel(false)
        //ListarConsulta()
    }

    async function ChecarDataConsulta() {
        const dataAtual = moment().format('YYYY-MM-DD')
        const horaAtual = moment().format('h:mm:ss')

        consultas.forEach(consulta => {
            //console.log( consulta.dataConsulta)
            const data = consulta.dataConsulta.split("T");

             console.log("Data e horario da consulta " + data[0], data[1]);
            // console.log("data e hora atual " + dataAtual, horaAtual);

            if (data[0] < dataAtual) {
                RealizarPorData(consulta)
            }
        });
    }

    async function RealizarPorData(consulta) {
        console.log("================================entrou===================================");
        await api.patch(`/Consultas/Status?idConsulta=${consulta.id}&status=Realizado`)
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                console.log(`Erro em realizar a consulta! : ${error}`);
            })
        ListarConsulta()
    }

    function MostrarModal(modal, consulta) {
        setIdEncontrado(consulta)
        // profile.role == "Paciente" ? 
        // setIdEncontrado()
        // :
        // setIdEncontrado()

        if (modal == "cancelar") {
            setModalCancel(true)
        } else if (modal == "doutor") {
            setModalPromptuary(true)
        } else if (modal == "local") {
            setModalDoctor(true)
        }
        //console.log(consulta);
    }

    const emptyComponent = () => {
        return (
            <Nothing>
                <Paragraph>Ops! Nenhuma consulta aqui</Paragraph>
            </Nothing>
        )
    }

    useEffect(() => {
        profileLoad();
        loadUser()
    }, [])

    useEffect(() => {
        ListarConsulta();
    }, [diaSelecionado])

    return (
        <>
            <Container>
                <Header
                    navigation={navigation}
                    name={user && user.nome}
                    foto={user && user.foto}
                />

                <CalendarHome
                    setDiaSelecionado={setDiaSelecionado}
                />

                <ContainerBox>
                    <OptionButtons
                        textButton={"Agendadas"}
                        actived={statusLista === "pendente"}
                        onPress={() => setStatusLista("pendente")}
                    />

                    <OptionButtons
                        textButton={"Realizadas"}
                        actived={statusLista === "realizado"}
                        onPress={() => setStatusLista("realizado")}
                    />

                    <OptionButtons
                        textButton={"Canceladas"}
                        actived={statusLista === "cancelado"}
                        onPress={() => setStatusLista("cancelado")}
                    />
                </ContainerBox>

                {
                    statusLista == "pendente" ? (
                        <CardList
                            data={consultas}
                            ListEmptyComponent={emptyComponent}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Pendente" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? (item.medicoClinica.medico.crm) : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade={profile.role == "Paciente" ? "CRM" : "anos"}
                                    hora={(item.dataConsulta).slice(11, 16)}
                                    foto={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.foto) : (item.paciente.idNavigation.foto)}
                                    tipoConsulta={item.prioridade.prioridade}
                                    onPressCancel={() => MostrarModal("cancelar", item)}
                                    onPressCard={() => {
                                        profile.role == "Paciente" ? (
                                            MostrarModal("local", item)
                                        ) : (
                                            null
                                        )
                                    }}
                                />
                                : null}
                        />

                    ) : statusLista == "realizado" ? (

                        <CardList
                            data={consultas}
                            ListEmptyComponent={emptyComponent}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Realizado" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    // nome={"Rubens"}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? item.medicoClinica.medico.crm : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade={profile.role == "Paciente" ? "CRM" : "anos"}
                                    foto={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.foto) : (item.paciente.idNavigation.foto)}
                                    hora={(item.dataConsulta).slice(11, 16)}
                                    tipoConsulta={item.prioridade.prioridade}
                                    onPressAppoiment={() => {
                                        profile.role === "Paciente" ? (
                                            navigation.navigate('Prescricao', { id: item.id })
                                        ) : (
                                            MostrarModal("doutor", item)
                                        )
                                    }}

                                />
                                : null}
                        />

                    ) : (

                        <CardList
                            data={consultas}
                            ListEmptyComponent={emptyComponent}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Cancelado" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? item.medicoClinica.medico.crm : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade={profile.role == "Paciente" ? "CRM" : "anos"}
                                    foto={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.foto) : (item.paciente.idNavigation.foto)}
                                    hora={(item.dataConsulta).slice(11, 16)}
                                    tipoConsulta={item.prioridade.prioridade}
                                /> : null}
                        />
                    )
                }

                {/* adicionar consulta */}

                {profile.role === "Paciente" ? (
                    <NewConsul onPress={() => setModalNewConsul(true)}>
                        <MaterialCommunityIcons name="stethoscope" size={32} color="#FBFBFB" />
                    </NewConsul>
                ) : (
                    <></>
                )}

            </Container>

            <CancellationModal
                visible={modalCancel}
                onRequestClose={() => { setModalCancel(false) }}
                onPress={() => CancelarConsulta(idEncontrado)}
                tranparent={true}
                title={"Cancelar consulta"}
                paragraph={"Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?"}
            />

            {profile.role === "Paciente" ?
                <DoctorModal
                    visible={modalDoctor}
                    onRequestClose={() => setModalDoctor(false)}
                    navigation={navigation}
                    consulta={idEncontrado}
                    nome={idEncontrado && idEncontrado.medicoClinica ? idEncontrado.medicoClinica.medico.idNavigation.nome : ""}
                    crm={idEncontrado && idEncontrado.medicoClinica ? idEncontrado.medicoClinica.medico.crm : ""}
                    especialidade={idEncontrado && idEncontrado.medicoClinica ? idEncontrado.medicoClinica.medico.especialidade.especialidade1 : ""}
                    foto={idEncontrado && idEncontrado.medicoClinica ? idEncontrado.medicoClinica.medico.idNavigation.foto : ""}
                />
                :
                <PromptuaryModal
                    visible={modalPromptuary}
                    onRequestClose={() => { setModalPromptuary(false) }}
                    navigation={navigation}
                    consulta={idEncontrado}
                    idade={idEncontrado && idEncontrado.paciente && idEncontrado.paciente.dataNascimento ? idEncontrado.paciente.dataNascimento : ""}
                    nome={idEncontrado ? idEncontrado.paciente.idNavigation.nome : ""}
                    email={idEncontrado ? idEncontrado.paciente.idNavigation.email : ""}
                    foto={idEncontrado ? idEncontrado.paciente.idNavigation.foto : ""}
                />
            }


            <NewConsulModal
                visible={modalNewConsul}
                onRequestClose={() => { setModalNewConsul(false) }}
                navigation={navigation}
            />
        </>
    )
}