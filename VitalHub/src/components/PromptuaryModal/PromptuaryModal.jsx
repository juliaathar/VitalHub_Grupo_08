import { Age, CenterContainer, Email, ModalBody, PatientData, PatientName, PerfilImg } from "./Style"
import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { LinkMedium } from "../Links/Style"

export const PromptuaryModal = ({
    visible,
    onRequestClose,
    navigation,

    consulta,
    role
}) => {

    async function Prontuario() {
        console.log("consulta modal prescricao");
        console.log(consulta);
        navigation.navigate('Prontuario')
    }

    return (
        <ModalBody
            isVisible={visible}
        >
            <CenterContainer>
                <PerfilImg source={{ uri: "https://github.com/LeonKene-hub.png" }}/>

                <PatientName>{"nome"}</PatientName>

                <PatientData>
                    <Age>{"idade"} anos</Age>
                    <Email>{"email"}</Email>
                </PatientData>

                <NormalButton 
                    fieldWidth={90} 
                    title={"inserir prontuario"} 
                    onPress={() => {Prontuario()}}
                />

                <TouchableOpacity onPress={onRequestClose} style={{marginBottom: 15}}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </CenterContainer>
        </ModalBody>
    )
}