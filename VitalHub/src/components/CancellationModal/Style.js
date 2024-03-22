import styled from "styled-components";
import Modal from "react-native-modal";

export const ModalBody = styled(Modal)`
    width: 90%;
    position: fixed;
`

export const ModalContainer = styled.View`
    width: 100%;
    height: 320px;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #FBFBFB;
`

export const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`