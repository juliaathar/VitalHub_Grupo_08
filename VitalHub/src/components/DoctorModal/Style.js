import styled from "styled-components";
import Modal from "react-native-modal";

export const BodyModal = styled(Modal)`
    align-items: center;
    position: fixed;
`

export const Center = styled.View`
    background-color: #FBFBFB;
    border-radius: 10px;
    width: 90%;
    height: 65%;
    align-items: center;
    justify-content: space-between;
`

export const DocImg = styled.Image`
    width: 90%;
    height: 180px;
    border-radius: 10px;
    margin-top: 18px;
`

export const Line = styled.View`
    flex-direction: row;
    //border: 1px solid blue;
    width: 75%;
    justify-content: space-between;
`