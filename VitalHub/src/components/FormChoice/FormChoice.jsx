import { Choice, ChoiceText } from "./Style"

export const FormChoice = ({
    textButton,
    actived = false,
    onPress
}) => {
    return (
        <Choice actived={actived} onPress={onPress}>
            <ChoiceText actived={actived}>{textButton}</ChoiceText>
        </Choice>
    )
}