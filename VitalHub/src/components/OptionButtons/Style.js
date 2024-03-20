import styled from "styled-components";

export const OptionTouch = styled.TouchableOpacity`
    width: 100px;
    height: 45px;
    border: 2px solid #607EC5;
    border-radius: 5px;
    background-color: ${props => props.actived ? "#607EC5" : "#FBFBFB"};
    align-items: center;
    justify-content: center;
    padding: 11px;
`

export const OptionText = styled.Text`
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 12px;
    color: ${props => props.actived ? "#FBFBFB" : "#607EC5"};
`