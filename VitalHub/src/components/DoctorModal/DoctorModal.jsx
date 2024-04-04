import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { Paragraph } from "../Paragraph/Style"
import { Title } from "../Title/Style"
import { LinkMedium } from "../Links/Style"
import { BodyModal, Center, DocImg, Line } from "./Style"

export const DoctorModal = ({
    onRequestClose,
    doctorName,
    especialidade,
    codigo,
    visible,
    navigation,

    consulta,
    role
}) => {

    async function LocalMapTela(consulta) {
        console.log("consulta modal prescricao");
        //console.log(consulta);
        navigation.navigate('LocalMap', {clinicaId: consulta.medicoClinica.clinicaId})
    }

    return (
        <BodyModal
            isVisible={visible}
            animationOutTiming={0}
        >
            <Center>
                <DocImg source={{ uri: "https://github.com/LeonKene-hub.png" }} />
                

                <Title style={{marginTop: 15}}>{"doctorName"}</Title>

                <Line>
                    <Paragraph>{"especialidade"}</Paragraph>
                    <Paragraph>{"codigo"}</Paragraph>
                </Line>

                <NormalButton 
                    title={"ver local da consulta"}
                    fieldWidth={90}
                    onPress={() => (LocalMapTela(consulta))}
                />

                <TouchableOpacity onPress={onRequestClose} style={{marginBottom: 15}}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </Center>
        </BodyModal>
    )
}