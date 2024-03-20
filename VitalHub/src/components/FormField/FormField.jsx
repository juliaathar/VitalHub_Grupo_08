import { ContentBox, InputContent, Label } from "./Style"


export const FormField = ({
    labelText = "Teste label",
    fieldWidth = 100,
    fieldValue = null,
    editable = false,
    onChangeText = null,
    KeyType = 'default',
    placeholder,
    maxLenght
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
                multiline={true}
                keyboardType={KeyType}
                value={fieldValue}
                editable={editable}
                maxLenght={maxLenght}
                onChangeText={onChangeText}

                {...editable ? (placeholder = { placeholder }) : (placeholder = "")}
            />
        </ContentBox>
    )
}