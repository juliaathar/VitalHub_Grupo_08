import { TouchableHighlight } from "react-native"
import { Button, ButtonTitle, ButtonGoogle, ButtonGoogleTitle } from "./Style"
// import { AntDesign } from '@expo/vector-icons';

export const NormalButton = ({
    title,
    fieldWidth = 100,
    onPress
}) => {
    return(
        <Button fieldWidth={fieldWidth} onPress={onPress}>
            <ButtonTitle>{title}</ButtonTitle>
        </Button>
    )
}

export const GoogleButton = ({
    title,
    fieldWidth,
    onPress
}) => {
    return(
        <ButtonGoogle fieldWidth={fieldWidth} onPress={onPress}>
            {/* <AntDesign name="google" size={24} color="#496BBA" /> */}
            <ButtonGoogleTitle>{title}</ButtonGoogleTitle>
        </ButtonGoogle>
    )
}