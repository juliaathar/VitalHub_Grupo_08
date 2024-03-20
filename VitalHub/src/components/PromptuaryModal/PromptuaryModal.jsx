import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { LinkMedium } from "../Links/Style"
import { Age, CenterContainer, Email, ModalBody, PatientData, PatientName, PerfilImg } from "./Style"

export const PromptuaryModal = ({
    name,
    age,
    email,
    visible,
    onRequestClose,
    imgLink,
    navigation
}) => {
    async function Protuario() {
        navigation.navigate('Prontuario')
    }
    return (
        <ModalBody
            isVisible={visible}
        >
            <CenterContainer>
                <PerfilImg source={{ uri: "https://github.com/LeonKene-hub.png" }}/>

                <PatientName>{name}</PatientName>

                <PatientData>
                    <Age>{age} anos</Age>
                    <Email>{email}</Email>
                </PatientData>

                <NormalButton fieldWidth={90} title={"inserir prontuario"} onPress={() => {Protuario()}}/>

                <TouchableOpacity onPress={onRequestClose}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </CenterContainer>
        </ModalBody>
    )
}