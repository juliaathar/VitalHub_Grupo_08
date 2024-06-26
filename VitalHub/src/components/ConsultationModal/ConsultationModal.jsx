import { TouchableOpacity, View } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { BoxData, BoxText, BoxTitle, ModalBody, ModalForm, ModalHeader } from "./Style"
import { LinkMedium } from "../Links/Style"
import { Title } from "../Title/Style"
import { Paragraph } from "../Paragraph/Style"
import moment from "moment"

export const ConsultationModal = ({
    onRequestClose,
    visible,
    navigation,
    dados,
    onPress
}) => {
    return (
        <ModalForm
            isVisible={visible}
            animationOutTiming={0}
        >
            <ModalHeader>
                <Title style={{fontSize: 20}}>Agendar consulta</Title>
                <Paragraph style={{fontSize: 16}}>Consulte os dados selecionados para a sua consulta</Paragraph>
            </ModalHeader>

            <ModalBody>
                <BoxData>
                    <BoxTitle>Data da consulta</BoxTitle>
                    <BoxText>{dados.dataConsulta ? moment(dados.dataConsulta).format("DD/MM/YYYY hh:mm") : "selecione uma data"}</BoxText>
                </BoxData>
                <BoxData>
                    <BoxTitle>Médico(a) da consulta</BoxTitle>
                    <BoxText>{dados.nomeMedico ? dados.nomeMedico : ""}</BoxText>
                    <BoxText>{dados.especialidade ? dados.especialidade : ""}</BoxText>
                </BoxData>
                <BoxData>
                    <BoxTitle>Local da consulta</BoxTitle>
                    <BoxText>Clinica {dados.clinicaNome ? dados.clinicaNome : ""}</BoxText>
                    <BoxText>{dados.localidade ? dados.localidade : ""}</BoxText>
                </BoxData>
                <BoxData>
                    <BoxTitle>Tipo da consulta</BoxTitle>
                    <BoxText>{dados.prioridadeLabel ? dados.prioridadeLabel : ""}</BoxText>
                </BoxData>
            </ModalBody>

            <NormalButton
                title={"Confirmar"}
                fieldWidth={80}
                onPress={onPress}
            />
            <TouchableOpacity onPress={onRequestClose} style={{ marginBottom: 25 }}>
                <LinkMedium>Cancelar</LinkMedium>
            </TouchableOpacity>
        </ModalForm>
    )
}