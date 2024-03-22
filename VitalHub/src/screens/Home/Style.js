import styled from "styled-components"

export const ContainerBox = styled.View`
    margin-bottom: 15px;
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const CardList = styled.FlatList`
    width: 100%;
    height: 50%;
    gap: 10px;
`

export const NewConsul = styled.TouchableOpacity`
    background-color: #49B3BA;
    border-radius: 10px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
`