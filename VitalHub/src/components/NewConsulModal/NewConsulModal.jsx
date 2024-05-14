import { ConsulLevel, ConsulLocal, ContainerChoice, ContainerView, ModalConsul } from "./Style"
import { StyleSheet, TouchableOpacity } from "react-native"
import { FormChoice } from "../FormChoice/FormChoice"
import { FormField } from "../FormField/FormField"
import { NormalButton } from "../Button/Buttons"
import { LinkMedium } from "../Links/Style"
import { Label } from "../FormField/Style"
import { Title } from "../Title/Style"
import { useState } from "react"

export const NewConsulModal = ({
    visible,
    onRequestClose,
    navigation
}) => {

    const [nivel, setNivel] = useState({id: "ADD341BE-8E85-40F1-BCA3-71C72A1585D3", prioridade: "Rotina" })
    const [localidade, setLocalidade] = useState("")

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
                            actived={nivel.prioridade === "Rotina"}
                            onPress={() => setNivel({id: "ADD341BE-8E85-40F1-BCA3-71C72A1585D3", prioridade: "Rotina" })}
                        />
                        <FormChoice
                            textButton={"Exame"}
                            actived={nivel.prioridade === "Exame"}
                            onPress={() => setNivel({id: "8BB82967-1CA9-4D71-A37C-715E473D00AC", prioridade: "Exame" })}
                        />
                        <FormChoice
                            textButton={"Urgência"}
                            actived={nivel.prioridade === "Urgência"}
                            onPress={() => setNivel({id: "34065EDC-CB48-4045-82FB-949DAE435DC9", prioridade: "Urgência" })}
                        />
                    </ContainerChoice>
                </ConsulLevel>

                <ConsulLocal>
                    <FormField
                        fieldWidth={100}
                        editable={true}
                        placeholder={"Informe a localização"}
                        labelText="Informe a localização desejada"
                        onChangeText={newValue => setLocalidade(newValue)}
                        fieldValue={localidade}
                    />
                </ConsulLocal>

                <NormalButton
                    fieldWidth={90}
                    title={"continuar"}
                    onPress={() => localidade !== "" ? 
                        navigation.navigate('AgendarConsulta', {nivel: nivel, localidade: localidade}) 
                        : 
                        console.log("Informe uma localidade")
                    }
                />

                <TouchableOpacity onPress={onRequestClose}>
                    <LinkMedium>Cancelar</LinkMedium>
                </TouchableOpacity>
            </ContainerView>
        </ModalConsul>
    )
}
