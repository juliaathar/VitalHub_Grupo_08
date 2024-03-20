import styled from "styled-components";
import Modal from "react-native-modal";
import { Title } from "../Title/Style";
import { Paragraph } from "../Paragraph/Style";

export const ModalBody = styled(Modal)`
    width: 90%;
    position: fixed;
    align-items: center;
    justify-content: center;
`

export const CenterContainer = styled.View`
    width: 90%;
    height: 450px;
    background-color: #FFFFFF;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`

export const PerfilImg = styled.Image`
    width: 80%;
    height: 181px;
    border-radius: 10px;
`

export const PatientData = styled.View`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
`

export const PatientName = styled(Title)`
    margin-top: 30px;
`

export const Age = styled(Paragraph)`
    font-size: 14px;
    color: #4E4B59;
`

export const Email = styled(Age)`
    color: #5F5C6B;
`