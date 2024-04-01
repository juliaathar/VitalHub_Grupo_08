import styled from "styled-components";

export const ModalBody = styled.TouchableOpacity`
    width: 90%;
    height: 105px;
    background-color: #FFFFFF;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px black;
    margin: 8px 16px;
    flex-direction: row;
`

export const Content = styled.View`
    width: 80%;
    height: max-content;
`

export const ModalTitle = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 16px;
`

export const ModalText = styled.Text`
    font-family: "Quicksand_500Medium";
    font-size: 14px;
    color: #8C8A97;
    height: 50%;
`

export const Erase = styled.TouchableOpacity`
    //width: 10%;
    width: ${props => props.erased ? 0 : 10}%;
    height: max-content;
`