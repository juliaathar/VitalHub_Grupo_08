import { CameraView } from "expo-camera";
import styled from "styled-components";

export const ButtonContainer = styled.View`
    position: fixed;
    background-color: transparent;
    //border: 1px solid red;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 35px;
    width: 90%;
    align-self: center;
    bottom: 45px;
`

export const ButtonCamera = styled.TouchableOpacity `
    border: 3px solid white;
    width: 60px;
    height: 60px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`

export const ButtonCameraCenter = styled.View `
    border: 3px solid white;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    background-color: white;
`

export const ButtonCameraOthers = styled.TouchableOpacity `
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    //background-color: white;
`

export const CameraBody = styled(CameraView)`
    flex: 1;
    justify-content: flex-end;
`

export const LastPhoto = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 5px;
`