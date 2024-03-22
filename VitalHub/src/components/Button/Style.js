import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    width: ${props => `${props.fieldWidth}%`};
    height: 53px;
    background-color: #496BBA;
    border: #496BBA;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 8px 12px;
    margin-top: 30px;
`

export const ButtonTitle = styled.Text`
    font-size: 16px;
    font-family: 'MontserratAlternates_700Bold';
    color: #FFFFFF;
    text-transform: uppercase;
`

export const ButtonGoogle = styled(Button)`
    justify-content: space-evenly;
    border-color: #496BBA;
    background-color: #FAFAFA;
    margin-top: 15px;
    flex-direction: row;
`

export const ButtonGoogleTitle =styled(ButtonTitle)`
    color: #496BBA;
`