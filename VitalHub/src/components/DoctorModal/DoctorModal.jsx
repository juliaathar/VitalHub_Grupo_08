import { BodyModal, Center, DocImg, Line } from "./Style"
import { NormalButton } from "../Button/Buttons"
import { TouchableOpacity } from "react-native"
import { Paragraph } from "../Paragraph/Style"
import { LinkMedium } from "../Links/Style"
import { useEffect, useState } from "react"
import api from "../../service/service"
import { Title } from "../Title/Style"
import { userDecodeToken } from "../../utils/Auth"

export const DoctorModal = ({
    onRequestClose,
    visible,
    navigation,

    consulta,
    role,
}) => {
    const [nome, setNome] = useState()
    const [crm, setCrm] = useState()
    const [medico, setMedico] = useState()

    async function medicoInfo() {
        setNome(consulta.medicoClinica.medico.idNavigation.nome)
        setCrm(consulta.medicoClinica.medico.crm)
    }

    async function LocalMapTela(consulta) {
        console.log("consulta modal prescricao");
        navigation.navigate('LocalMap', { clinicaId: consulta.medicoClinica.clinicaId })
    }

    useEffect(() => {
        medicoInfo();
    }, [consulta])

    return (
        <BodyModal
            isVisible={visible}
            animationOutTiming={0}
        >
            <Center>
                <DocImg source={{ uri: "https://github.com/LeonKene-hub.png" }} />

                <Title style={{ marginTop: 15 }}>{nome}</Title>

                <Line>
                    <Paragraph>{"especialidade"}</Paragraph>
                    <Paragraph>{crm}</Paragraph>
                </Line>

                <NormalButton
                    title={"ver local da consulta"}
                    fieldWidth={90}
                    onPress={() => (LocalMapTela(consulta))}
                />

                <TouchableOpacity onPress={onRequestClose} style={{ marginBottom: 15 }}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </Center>
        </BodyModal>
    )
}