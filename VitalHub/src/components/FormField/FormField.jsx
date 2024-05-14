import { ContentBox, InputContent, Label } from "./Style"


export const FormField = ({
    labelText = "Teste label",
    fieldWidth = 100,
    fieldValue = null,
    editable = false,
    onChangeText = null,
    KeyType = 'default',
    placeholder,
    maxLength
}) => {
    return (
        <ContentBox
            fieldWidth={fieldWidth}
        >
            {labelText.length == 0 ? (
                <>
                </>
            ) : (
                <Label>
                    {labelText}
                </Label>
            )}

            <InputContent
                blurOnSubmit
                autoCorrect
                multiline
                keyboardType={KeyType}
                value={fieldValue}
                editable={editable}
                maxLength={maxLength}
                onChangeText={onChangeText}

                {...editable ? (placeholder = { placeholder }) : (placeholder = "")}
            />
        </ContentBox>
    )
}