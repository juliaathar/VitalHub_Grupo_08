import { OptionText, OptionTouch } from "./Style"

export const OptionButtons = ({
    textButton,
    actived = false,
    onPress
}) => {

    return (
        <OptionTouch actived={actived} onPress={onPress}>
            <OptionText actived={actived}>{textButton}</OptionText>
        </OptionTouch>
    )
}