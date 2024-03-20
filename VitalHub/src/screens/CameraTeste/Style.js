import { Camera } from "expo-camera";
import styled from "styled-components";

export const ButtonContainer = styled.View`
    position: fixed;
    background-color: transparent;
    //border: 1px solid red;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 35px;
    width: 100%;
    align-self: center;
    border-radius: 50px;
    bottom: 45px;
`

export const ButtonCamera = styled.TouchableOpacity `
    border: 1px solid white;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`

export const CameraBody = styled(Camera)`
    flex: 1;
    justify-content: flex-end;
`