import styled from "styled-components";
import Modal from "react-native-modal";

export const ModalConsul = styled(Modal)`
    height: 60%;
    width: 100%;
    background-color: #FBFBFB;
    border-radius: 10px 10px 0px 0px;
    align-self: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    margin: 0px;
`

export const ContainerView = styled.View`
    width: 90%;
    height: 90%;
    align-items: center;
    justify-content: space-between;
`
export const ConsulLevel = styled.View`
    width: 90%;
    justify-content: space-between;
`

export const ConsulLocal = styled.View`
    width: 100%;
    align-items: center;
`
export const ContainerChoice = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`