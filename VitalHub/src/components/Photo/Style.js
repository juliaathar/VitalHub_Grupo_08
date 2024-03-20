import styled from "styled-components";
import Modal from "react-native-modal";

export const ModalPhoto = styled(Modal)`
    position: fixed;
    align-items: center;
    flex: 0.9;
    width: 90%;
    background-color: #FBFBFB;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-evenly;
    top: 50px;
    margin-top: 16px;
`

export const PhotoFile = styled.Image`
    flex: 0.8;
    width: 90%;
`

export const CloseButton = styled.TouchableOpacity`
    background-color: transparent;
    height: 40px;
    width: 40%;
    border-radius: 10px;
    border: 2px black;
    align-items: center;
    justify-content: center;
`

export const SaveButton = styled(CloseButton)`
    background-color: transparent;
`

export const ButtonText = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
    
`

export const Line = styled.View`
    flex: 0.1;
    width: 90%;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    
` 