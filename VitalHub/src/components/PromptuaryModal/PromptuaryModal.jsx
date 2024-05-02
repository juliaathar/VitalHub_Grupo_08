import { Age, CenterContainer, Email, ModalBody, PatientData, PatientName, PerfilImg } from "./Style"
import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { LinkMedium } from "../Links/Style"
import { useEffect, useState } from "react"
import moment from "moment"

export const PromptuaryModal = ({
    visible,
    onRequestClose,
    navigation,
    consulta,
    role
}) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");
    const [confirm, setConfirm] = useState(false)

    // async function setValores() {
    //     setNome(consulta.paciente.idNavigation.nome);
    //     setEmail(consulta.paciente.idNavigation.email);
    //     setIdade(consulta.paciente.dataNascimento)
    // }
    async function Prontuario() {
        console.log("consulta modal prescricao");
        console.log(consulta);
        navigation.navigate('Prontuario', { consulta: consulta })
    }


    useEffect(() => {
        console.log(`ROLEEEEEEEEEEEEEEEEEEEEE${role}`);
        if (consulta != null) {
            // setValores();
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
                        <PerfilImg source={{ uri: "https://github.com/LeonKene-hub.png" }} />

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