import styled from "styled-components";
import { ClinicBody } from "../ClinicCard/Style";

export const MedBody = styled(ClinicBody)`
    margin-bottom: 10px;
    flex-direction: row;
    height: 100px;
`

export const MedImg = styled.Image`
    height: 100%;
    width: 77px;
    border-radius: 5px;
`

export const CenterMed = styled.View`
    //border: 1px solid;
    width: 70%;
    flex-direction: column;
`

export const ContainerMed = styled.View`
    width: 90%;
    height: 80%;
    flex-direction: row;
    justify-content: space-between;
    border: ${props => props.actived ? "2px solid #496BBA":"0px"};
`

export const LineMed = styled.View`
    //border: 1px solid;
    flex: 0.5;
    justify-content: center;
`

export const Name = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 16px;
`

export const Specialty = styled.Text`
    font-family: "Quicksand_500Medium";
    font-size: 14px;
`