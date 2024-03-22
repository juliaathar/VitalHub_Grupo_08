import styled from "styled-components";
import Modal from "react-native-modal";

export const ModalForm = styled(Modal)`
    align-items: center;
    justify-content: space-between;
    width: 90%;
    flex: 0.9;
    border-radius: 5px;
    background-color: #FFFFFF;
`

export const ModalHeader = styled.View`
    align-items: center;
    margin-top: 25px;
    width: 80%;
`

export const ModalBody = styled.View`
    width: 80%;
    justify-content: space-between;
    //border: 1px solid black;
    flex: 0.8;
`

export const BoxData = styled.View`
    width: 100%;
    //border: 1px solid black;
    //margin-top: 10px;
`

export const BoxTitle = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 17px;
`

export const BoxText = styled.Text`
    font-family: 'Quicksand_500Medium';
    font-size: 14px;
`