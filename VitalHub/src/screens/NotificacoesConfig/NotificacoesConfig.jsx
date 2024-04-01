import { BellButtonAll, BellButtonNone, BellButtonPer } from "../../components/BellButtons/BellButtons";
import { OptionButtons } from "../../components/OptionButtons/OptionButtons"
import { Container } from "../../components/Container/Style"
import { CardList, ContainerBox } from "../Home/Style"
import { StatusBar } from "react-native"
import { LinearBox } from "./Style"
import { useState } from "react"
import { NotificationCard } from "../../components/NotiifcationCard/NotificationCard";


export const NotificacoesConfig = () => {
    const [statusNoti, setStatusNoti] = useState("lembretes")
    const [bellConfig, setBellConfig] = useState('todas')

    //provisorio
    const dados = [
        { id: 1, title: "Consulta", text: "Julia consulta", type: "atualizacoes" },
        { id: 2, title: "Consulta", text: "Pedro consulta", type: "lembretes" },
        { id: 3, title: "Resultado", text: "Gabriel resultado", type: "antigas" },
        { id: 4, title: "Cancelada", text: "Pedro Cancelada", type: "antigas" },
        { id: 5, title: "Consulta", text: "Macedo Consulta", type: "atualizacoes" },
        { id: 6, title: "Cancelada", text: "Julia Cancelada", type: "lembretes" }
    ]

    return (
        <Container>
            {/* <StatusBar hidden={true} /> */}

            {/* cabecalho com opcoes basicas */}
            <LinearBox>
                <BellButtonAll
                    onPress={() => setBellConfig("todas")}
                    actived={bellConfig === "todas" ? true : false}
                />
                <BellButtonNone
                    onPress={() => setBellConfig("nenhuma")}
                    actived={bellConfig === "nenhuma" ? true : false}
                />
                <BellButtonPer
                    onPress={() => setBellConfig("personalizado")}
                    actived={bellConfig === "personalizado" ? true : false}
                />
            </LinearBox>

            {/* opcoes de filtro de lista de notificicacoes */}
            <ContainerBox>
                <OptionButtons
                    textButton={"Lembretes"}
                    actived={statusNoti === "lembretes"}
                    onPress={() => setStatusNoti("lembretes")}
                />

                <OptionButtons
                    textButton={"Atualizações"}
                    actived={statusNoti === "atualizacoes"}
                    onPress={() => setStatusNoti("atualizacoes")}
                />

                <OptionButtons
                    textButton={"Antigas"}
                    actived={statusNoti === "antigas"}
                    onPress={() => setStatusNoti("antigas")}
                />
            </ContainerBox>

            {/* lista de notificacoes */}
            {
                statusNoti == "lembretes" ? (
                    <CardList
                        data={dados}
                        keyExtrator={(item) => item.id}
                        renderItem={({ item }) => item.type === "lembretes" ?
                            <NotificationCard
                                title={item.title}
                                text={item.text}
                            /> : null}
                    />
                ) : statusNoti == "atualizacoes" ? (
                    <CardList
                        data={dados}
                        keyExtrator={(item) => item.id}
                        renderItem={({ item }) => item.type === "atualizacoes" ?
                            <NotificationCard
                                title={item.title}
                                text={item.text}
                            /> : null}
                    />
                ) : (
                    <CardList
                        data={dados}
                        keyExtrator={(item) => item.id}
                        renderItem={({ item }) => item.type === "antigas" ?
                            <NotificationCard
                                title={item.title}
                                text={item.text}
                                erased={true}
                            /> : null}
                    />
                )
            }
        </Container>
    )
}