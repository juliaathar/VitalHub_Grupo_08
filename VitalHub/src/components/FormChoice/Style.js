import styled from "styled-components"
import { OptionText, OptionTouch } from "../OptionButtons/Style"

export const Choice = styled(OptionTouch)`
    //margin-top: 10px;
    background-color: ${props => props.actived ? "#60BFC5" : "#FFFFFF"};
    border: 2px solid #60BFC5;
    width: 32%;
`

export const ChoiceText = styled(OptionText)`
    color: ${props => props.actived ? "#FFFFFF" : "#77CACF"};
    font-size: 14px;
`