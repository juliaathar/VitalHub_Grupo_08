import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { ConsultationData } from "../../components/ConsultationData/ConsultationData"
import { PromptuaryModal } from "../../components/PromptuaryModal/PromptuaryModal"
import { NewConsulModal } from "../../components/NewConsulModal/NewConsulModal"
import { OptionButtons } from "../../components/OptionButtons/OptionButtons"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { DoctorModal } from "../../components/DoctorModal/DoctorModal"
import { Container } from "../../components/Container/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CardList, ContainerBox, NewConsul } from "./Style"
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react"
import api from "../../service/service"

//notificacoes
//importa a notificacao
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

    const [consultas, setConsultas] = useState();
    //notificacoes
    //funcao para lidar con a chamada da notificacao
    const handleNotifications = async () => {

        //obtem o status das permissoes
        const { status } = await Notifications.getPermissionsAsync()

        //verifica se o usuario concedeu permissao para notificacoes
        if (status !== "granted") {
            alert("voce nao deixou as notificacoes ativas");
            return;
        }

        //obter o token de enviou de notificacao
        const token = await Notifications.getExpoPushTokenAsync()
        //console.log(token);

        //agendar uma notificacao parar ser exibida apos 5 segundos
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta cancelada",
                body: "voce cancelou a sua consulta"
            },
            trigger: null
        })
    }

    const profileLoad = async () => {
        try {
            const token = await userDecodeToken();
            console.log("Token do usuário:", token);
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
            console.log(`Erro ao carregar o usuário: ${error}`);
        }
    };

    async function ListarConsulta() {
        const url = (profile.role == "Médico" ? "Medicos" : "Pacientes")

        //console.log(`/${url}/BuscarPorData?data=${diaSelecionado}&id=${profile.user}`);
        await api.get(`/${url}/BuscarPorData?data=${diaSelecionado}&id=${profile.user}`)
            .then(async response => {
                await setConsultas(response.data);
                // console.log(`consultas, exito: ${consultas}`);
                console.log(response.data);
            }).catch(error => {
                // console.log("consultas, erro: " + error);
                //console.log(error);
            })
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
    }

    function MostrarModal(modal, consulta) {
        if (modal == "cancelar") {
            setModalCancel(true)
        } else if (modal == "doutor") {
            setModalPromptuary(true)
        } else if (modal == "local") {
            setModalDoctor(true)
        }

        setIdEncontrado(consulta)
        console.log(idEncontrado);
    }

    //atualiza a pagina de acordo com o login
    useEffect(() => {
        profileLoad();
        loadUser()
    }, [])

    useEffect(() => {
        ListarConsulta();
        console.log("Consulta recebida na Home:", idEncontrado);
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
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Pendente" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? item.medicoClinica.medico.crm : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade = {profile.role == "Paciente" ? "CRM" : "anos"}
                                    hora={(item.dataConsulta).slice(11, 16)}
                                    foto={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.foto) : (item.paciente.idNavigation.foto)}
                                    tipoConsulta={item.prioridade.prioridade}
                                    onPressCancel={() => MostrarModal("cancelar", item)}
                                    onPressCard={() => {
                                        profile.role === "Paciente" ? (
                                            MostrarModal("local", item)
                                        ) : (
                                            MostrarModal("local", item) //provisorio
                                        )
                                    }}
                                />
                                : null}
                        />

                    ) : statusLista == "realizado" ? (

                        <CardList
                            data={consultas}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Realizado" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    // nome={"Rubens"}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? item.medicoClinica.medico.crm : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade = {profile.role == "Paciente" ? "CRM" : "anos"}
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
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Cancelado" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
                                    nome={profile.role == "Paciente" ? (item.medicoClinica.medico.idNavigation.nome) : (item.paciente.idNavigation.nome)}
                                    idade={profile.role == "Paciente" ? item.medicoClinica.medico.crm : moment((item.paciente.dataNascimento), "YYYYMMDD").fromNow().slice(0, 2)}
                                    textIdade = {profile.role == "Paciente" ? "CRM" : "anos"}
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
                consulta={idEncontrado}

                tranparent={true}
                title={"Cancelar consulta"}
                paragraph={"Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?"}
            />
            <DoctorModal
                visible={modalDoctor}
                onRequestClose={() => setModalDoctor(false)}
                doctorName={idEncontrado.Nome}
                navigation={navigation}
                consulta={idEncontrado}
            />
            <NewConsulModal
                visible={modalNewConsul}
                onRequestClose={() => { setModalNewConsul(false) }}
                navigation={navigation}
            />

            <PromptuaryModal
                visible={modalPromptuary}
                onRequestClose={() => { setModalPromptuary(false) }}
                navigation={navigation}
                consulta={idEncontrado.id}
                idade={idEncontrado ? idEncontrado.paciente.dataNascimento : ""}
                nome={idEncontrado ? idEncontrado.paciente.idNavigation.nome : ""}
                email={idEncontrado ? idEncontrado.paciente.idNavigation.email : ""}
                foto={idEncontrado ? idEncontrado.paciente.idNavigation.foto : ""}
            />
        </>
    )
}