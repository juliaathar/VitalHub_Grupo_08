import { CenteredView, ModalBody, ModalContainer } from "./Style"
import { NormalButton } from "../Button/Buttons"
import { TouchableOpacity } from "react-native"
import { Paragraph } from "../Paragraph/Style"
import { LinkMedium } from "../Links/Style"
import { Title } from "../Title/Style"


export const CancellationModal = ({
    title,
    paragraph,
    visible,
    onRequestClose,
    onPress,
}) => {
    return (
        <ModalBody
            isVisible={visible}
        >
            <CenteredView>
                <ModalContainer>
                    <Title>{title}</Title>
                    <Paragraph>{paragraph}</Paragraph>

                    <NormalButton fieldWidth={90} title={"Confirmar"} onPress={onPress}/>

                    <TouchableOpacity onPress={onRequestClose}>
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </ModalContainer>
            </CenteredView>
        </ModalBody>
    )
}