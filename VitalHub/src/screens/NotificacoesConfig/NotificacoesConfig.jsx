import { BellButtonAll, BellButtonNone, BellButtonPer } from "../../components/BellButtons/BellButtons";
import { OptionButtons } from "../../components/OptionButtons/OptionButtons"
import { Container } from "../../components/Container/Style"
import { CardList, ContainerBox } from "../Home/Style"
import { StatusBar } from "react-native"
import { LinearBox } from "./Style"
import { useState } from "react"


export const NotificacoesConfig = () => {
    const [statusNoti, setStatusNoti] = useState("futuras")
    const [bellConfig, setBellConfig] = useState('todas')

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
                    textButton={"Futuras"}
                    actived={statusNoti === "futuras"}
                    onPress={() => setStatusNoti("futuras")}
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
            {statusNoti == "futuras" ? (
                <CardList/>
            ) : statusNoti == "atualizacoes" ? (
                <CardList/>
            ) : (
                <CardList/>
            )}
        </Container>
    )
}