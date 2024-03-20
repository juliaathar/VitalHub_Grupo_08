import { TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { FormField } from "../FormField/FormField"
import { LinkMedium } from "../Links/Style"
import { Title } from "../Title/Style"
import { ConsulLevel, ConsulLocal, ContainerChoice, ContainerView, ModalConsul} from "./Style"
import { ContainerBox } from "../../screens/Home/Style"
import { FormChoice } from "../FormChoice/FormChoice"
import { useState } from "react"
import { Label } from "../FormField/Style"


export const NewConsulModal = ({
    visible,
    onRequestClose,
    navigation
}) => {

    const [status, setStatus] = useState()

    return (
        <ModalConsul
            isVisible={visible}
            animationOutTiming={0}
        >
            <ContainerView>
                <Title>Agendar consulta</Title>


                <ConsulLevel>
                    <Label>Qual o nível da consulta</Label>
                    <ContainerChoice>
                        <FormChoice
                            textButton={"Rotina"}
                            actived={status === "Rotina"}
                            onPress={() => setStatus("Rotina")}
                        />
                        <FormChoice
                            textButton={"Exame"}
                            actived={status === "Exame"}
                            onPress={() => setStatus("Exame")}
                        />
                        <FormChoice
                            textButton={"Urgência"}
                            actived={status === "Urgência"}
                            onPress={() => setStatus("Urgência")}
                        />
                    </ContainerChoice>
                </ConsulLevel>

                <ConsulLocal>
                    <FormField
                        fieldWidth={90}
                        editable={true}
                        placeholder={"Informe a localização"}
                        labelText="Informe a localização desejada"
                    />
                </ConsulLocal>

                <NormalButton
                    fieldWidth={90}
                    title={"continuar"}
                    onPress={() => navigation.navigate('AgendarConsulta')}
                />

                <TouchableOpacity onPress={onRequestClose}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </ContainerView>
        </ModalConsul>
    )
}