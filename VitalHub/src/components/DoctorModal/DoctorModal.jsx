import { BodyModal, Center, DocImg, Line } from "./Style"
import { NormalButton } from "../Button/Buttons"
import { TouchableOpacity } from "react-native"
import { Paragraph } from "../Paragraph/Style"
import { LinkMedium } from "../Links/Style"
import { useEffect, useState } from "react"
import { Title } from "../Title/Style"

export const DoctorModal = ({
    onRequestClose,
    visible,
    navigation,
    consulta,
    nome ="",
    crm ="",
    especialidade ="",
    foto
}) => {


    async function LocalMapTela(consulta) {
        navigation.navigate('LocalMap', { clinicaId: consulta.medicoClinica.clinicaId })
    }

    return (
        <BodyModal
            isVisible={visible}
            animationOutTiming={0}
        >
            <Center>
                <DocImg source={foto != "" ? {uri: foto} : { uri: "https://github.com/LeonKene-hub.png" }} />

                <Title style={{ marginTop: 15 }}>{nome}</Title>

                <Line>
                    <Paragraph>{especialidade}</Paragraph>
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