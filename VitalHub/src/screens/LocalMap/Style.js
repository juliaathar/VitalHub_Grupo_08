import MapView from "react-native-maps";
import styled from "styled-components";


export const Map = styled(MapView)`
    width: 100%;
    height: 50%;
`

export const InfoBody = styled.View`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px 0px 0px;
    border-radius: 10px 10px 0px 0px;
`

export const Line = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
`