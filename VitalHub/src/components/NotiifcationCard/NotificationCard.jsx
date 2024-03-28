import { Content, Erase, ModalBody, ModalText, ModalTitle } from './Style';
import { AntDesign } from '@expo/vector-icons';

export const NotificationCard = ({
    title = "",
    text = "",
    onPressCard,
    requestClose,
    erased = false
}) => {
    return (
        <ModalBody onPress={onPressCard}>
            <Content>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{text}</ModalText>
            </Content>
            <Erase onPress={requestClose} erased={erased}>
                <AntDesign name="close" size={24} color="black" />
            </Erase>
        </ModalBody>
    )
}