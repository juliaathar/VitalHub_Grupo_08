import styled from "styled-components";

export const ClinicBody = styled.TouchableOpacity`
    height: 84px;
    background-color: #FFFFFF;
    border-radius: 5px;
    border: ${props => props.actived ? "2px solid #496BBA":"0px"};
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    box-shadow: 0px 0px 10px  black;
    shadow-color: black;
    shadow-offser: 0px 4px;
    shadow-opacity: 0.15;
    shadow-radius:15px;
    elevation: 5;
`

export const Center = styled.View`
    //border: 1px solid black;
    width: 90%;
    height: 90%;
    flex-direction: column;
`

export const Line = styled.View`
    //border: 1px solid red;
    flex: 0.5;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ClinicName = styled.Text`
    color: #33303E;
    font-size: 16px;
    font-family: "MontserratAlternates_600SemiBold";
`

export const NotaText = styled.Text`
    color: #F9A620;
    font-size: 14px;
    font-family: "MontserratAlternates_600SemiBold";
`
export const NoteIcon = styled.View`
    flex-direction: row;
    align-items: center;
`

export const WorkingBody = styled.View`
    flex-direction: row;
    background-color: #E8FCFD;
    border-radius: 5px;
    padding: 4px 10px;
`
export const Local = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 14px;
`
export const WorkingDays = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 14px;
    color: #49B3BA;
`