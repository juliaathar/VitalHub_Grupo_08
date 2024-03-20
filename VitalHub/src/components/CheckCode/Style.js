import styled from "styled-components";

export const CheckCodeBox = styled.View`
    width: 90%;
    height: 62px;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
`

export const CheckCode = styled.TextInput.attrs({
    placeholderTextColor: '#77CACF'
})`
    width: 20%;
    border: 2px solid #77CACF;
    border-radius: 5px;
    font-size: 40px;
    /* padding-left: 22px; */
    text-align: center;
`