import styled from "styled-components";

//corpo
export const CardBoby = styled.TouchableHighlight`
    width: 90%;
    height: 105px;
    background-color: #FFFFFF;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px black;
    margin: 8px 16px;
    
    box-shadow: 0px 0px 10px  black;
    shadow-color: black;
    shadow-offser: 0px 4px;
    shadow-opacity: 0.15;
    shadow-radius:15px;
    elevation: 5;
`
export const CardContainer = styled.View`
    width: 90%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

//imagem de perfil
export const ImageUserCard = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 5px;
`

//Container que segura todas as informacoes do card
export const CardInfo = styled.View`
    width: 200px;
    height: 80px;
`

//Nome e dados
export const InfoBox = styled.View`
    width: 100%;
    flex: 0.6;
`

//Hora e opcoes
export const CardOptions = styled.View`
    width: 100%;
    flex: 0.4;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Hour = styled.View`
    width: 90px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => `#${props.color}`};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px 0px 15px;
`
export const Appointment = styled.Text`
    font-size: 14px;
    font-family: "MontserratAlternates_600SemiBold";
    color: ${props => `#${props.color}`} ;
    margin-left: 5px;
`

//Botao de opcao
export const Option = styled.TouchableOpacity``

export const OptionText = styled.Text`
    color: ${props => `#${props.color}`} ;
    font-size: 12px;
    font-family: "MontserratAlternates_500Medium";
`

// Nome do paciente
export const Name = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 16px;
`

//Dados do paciente
export const Data = styled.View`
    width: 60%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Age = styled.Text`
    font-family: "Quicksand_500Medium";
    font-size: 14px;
    color: #8C8A97;
`
export const TypeConsul = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 14px;
    color: #8C8A97;
`