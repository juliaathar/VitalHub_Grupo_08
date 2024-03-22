import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { ConsultationData } from "../../components/ConsultationData/ConsultationData"
import { PromptuaryModal } from "../../components/PromptuaryModal/PromptuaryModal"
import { NewConsulModal } from "../../components/NewConsulModal/NewConsulModal"
import { OptionButtons } from "../../components/OptionButtons/OptionButtons"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { DoctorModal } from "../../components/DoctorModal/DoctorModal"
import { Container } from "../../components/Container/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CardList, ContainerBox, NewConsul } from "./Style"
import { Header } from "../../components/Header/Header"
import { useState } from "react"

//notificacoes
//importa a notificacao
import * as Notifications from "expo-notifications"
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

    const [modalCancel, setModalCancel] = useState(false);
    const [modalNewConsul, setModalNewConsul] = useState(false);
    const [modalDoctor, setModalDoctor] = useState(false);
    const [modalPromptuary, setModalPromptuary] = useState(false);

    const [idEncontrado, setIdEncontrado] = useState("");

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

    const dados = [
        {
            id: 1,
            Nome: "Dr.1",
            Idade: 35,
            Email: "teste1@senai.com",
            Situacao: "pendente"
        },
        {
            id: 2,
            Nome: "Dr.2",
            Idade: 44,
            Email: "student@hotmail.com",
            Situacao: "realizado"
        },
        {
            id: 3,
            Nome: "Dr.3",
            Idade: 37,
            Email: "master3@gmal.com",
            Situacao: "pendente"
        },
        {
            id: 4,
            Nome: "Dr.4",
            Idade: 28,
            Email: "student@hotmail.com",
            Situacao: "cancelado"
        },
        {
            id: 5,
            Nome: "Dr.5",
            Idade: 55,
            Email: "student@hotmail.com",
            Situacao: "realizado"
        },
    ]

    return (
        <>
            <Container>
                <Header
                    navigation={navigation}
                />

                <CalendarHome />

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
                            data={dados}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.Situacao === "pendente" ?
                                <ConsultationData
                                    nome={item.Nome}
                                    situacao={item.Situacao}
                                    onPressCancel={() => setModalCancel(true)}
                                    onPressCard={() => { setModalDoctor(true); setIdEncontrado(item); }}
                                /> : <></>}
                        />

                    ) : statusLista == "realizado" ? (

                        <CardList
                            data={dados}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.Situacao === "realizado" ?
                                <ConsultationData
                                    nome={item.Nome}
                                    situacao={item.Situacao}
                                    onPressAppoiment={() => {
                                        profile === "Paciente" ? (
                                            navigation.navigate('Prescricao')
                                        ) : (
                                            setModalPromptuary(true), setIdEncontrado(item)
                                        )
                                    }}

                                /> : <></>}
                        />

                    ) : (

                        <CardList
                            data={dados}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => item.Situacao === "cancelado" ?
                                <ConsultationData
                                    nome={item.Nome}
                                    situacao={item.Situacao}
                                /> : <></>}
                        />
                    )
                }

                {/* adicionar consulta */}

                {profile === "Paciente" ? (
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