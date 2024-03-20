import styled from "styled-components";

export const OptionLine = styled.View`
    width: 90%;
    margin-top: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const PhotoButton = styled.TouchableOpacity`
    width: 50%;
    height: 45px;
    border-radius: 5px;
    background-color: #49B3BA;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const CancelarButton = styled(PhotoButton)`
    background-color: transparent;
`

export const TextButton = styled.Text`
    color: white;
    font-size: 14px;
    margin-left: 10px;
    font-family: "MontserratAlternates_700Bold";
`

export const CancelarLink = styled.Text`
    color: #C81D25;
    font-family: "MontserratAlternates_500Medium";
`

export const FormPhoto = styled.View`
    width: 90%;
    margin-top: 20px;
    height: 140px;
`
export const PhotoField = styled.View`
    border-radius: 5px;
    margin-top: 10px;
    background-color: #F5F3F3;
    height: 110px;
    align-items: center;
    justify-content: center;
`
export const DecorLine = styled.View`
    border: 2px solid #8C8A97;
    width: 90%;
    margin: 30px 0px 10px 0px;
`