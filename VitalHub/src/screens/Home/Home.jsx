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
    const [nome,setNome] = useState("")
    const [diaSelecionado, setDiaSelecionado] = useState(moment().format("YYYY-DD-MM"))

    const [modalCancel, setModalCancel] = useState(false);
    const [modalNewConsul, setModalNewConsul] = useState(false);
    const [modalDoctor, setModalDoctor] = useState(false);
    const [modalPromptuary, setModalPromptuary] = useState(false);

    const [idEncontrado, setIdEncontrado] = useState("");
    const [consultas, setConsultas] = useState([])
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
        console.log(token);

        //agendar uma notificacao parar ser exibida apos 5 segundos
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta cancelada",
                body: "voce cancelou a sua consulta"
            },
            trigger: null
        })
    }

    async function profileLoad() {
        const token = await userDecodeToken();
        console.log(token)

        setNome(token.name)
        setProfile(token)
        setDiaSelecionado(moment().format("YYYY-MM-DD"))
    }

    async function ListarConsulta() {
        const url = (profile.role == "Médico" ? "Medicos" : "Pacientes")

        await api.get(`/${url}/BuscarPorData?data=${diaSelecionado}&id=${profile.user}`)
        .then( response => {
            setConsultas(response.data);
            console.log("consultas, exito:");
            console.log(response.data);
        }).catch(error => {
            console.log("consultas, erro:");
            console.log(error);
        })
    }

    //atualiza a pagina de acordo com o login
    useEffect(() => {
        profileLoad();
    },[])
    useEffect(() => {
        ListarConsulta();
    }, [diaSelecionado])

    return (
        <>
            <Container>
                <Header
                    navigation={navigation}
                    name={profile.name}
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
                                    onPressCancel={() => setModalCancel(true)}
                                    onPressCard={() => { setModalDoctor(true); setIdEncontrado(item); }}
                                /> : null}
                        />

                    ) : statusLista == "realizado" ? (

                        <CardList
                            data={consultas}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.situacao.situacao === "Realizado" ?
                                <ConsultationData   
                                    situacao={item.situacao.situacao}
                                    onPressAppoiment={() => {
                                        profile.role === "Paciente" ? (
                                            navigation.navigate('Prescricao')
                                        ) : (
                                            setModalPromptuary(true), setIdEncontrado(item)
                                        )
                                    }}

                                /> : null}
                        />

                    ) : (

                        <CardList
                            data={consultas}
                            keyExtractor={(item) => item.id}
                            situacao={item.situacao.situacao}
                            renderItem={({ item }) => item.situacao.situacao === "Cancelado" ?
                                <ConsultationData
                                    situacao={item.situacao.situacao}
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
                onPress={handleNotifications}

                tranparent={true}
                title={"Cancelar consulta"}
                paragraph={"Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?"}
            />
            <DoctorModal
                visible={modalDoctor}
                onRequestClose={() => setModalDoctor(false)}
                doctorName={idEncontrado.Nome}
                navigation={navigation}
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

                name={idEncontrado.Nome}
                age={idEncontrado.Idade}
                email={idEncontrado.Email}
            />
        </>
    )
}