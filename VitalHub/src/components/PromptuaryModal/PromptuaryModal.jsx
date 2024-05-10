import { Age, CenterContainer, Email, ModalBody, PatientData, PatientName, PerfilImg } from "./Style"
import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { LinkMedium } from "../Links/Style"
import { useEffect, useState } from "react"
import moment from "moment"

export const PromptuaryModal = ({
    nome ="",
    email ="",
    idade ="",
    foto ="",
    visible,
    onRequestClose,
    navigation,
    consulta,
}) => {
    const [confirm, setConfirm] = useState(false)

    function Prontuario() {
        navigation.navigate('Prontuario', { consulta: consulta })
    }

    useEffect(() => {
        if (consulta != null) {
            setConfirm(true)
        }

    }, [consulta]);

    return (
        <>
            {confirm ? (
                <ModalBody
                    isVisible={visible}
                >
                    <CenterContainer>
                        <PerfilImg source={ foto != "" ? {uri : foto} : { uri: "https://github.com/LeonKene-hub.png" }} />

                        <PatientName>{nome}</PatientName>

                        <PatientData>
                            <Age>{moment(idade, "YYYYMMDD").fromNow().slice(0, 2)} anos</Age>
                            <Email>{email}</Email>
                        </PatientData>

                        <NormalButton
                            fieldWidth={90}
                            title={"inserir prontuario"}
                            onPress={() => { Prontuario() }}
                        />

                        <TouchableOpacity onPress={onRequestClose} style={{ marginBottom: 15 }}>
                            <LinkMedium>Cancelar</LinkMedium>
                        </TouchableOpacity>
                    </CenterContainer>
                </ModalBody>

            ) : (
                null
            )}
        </>
    )
}