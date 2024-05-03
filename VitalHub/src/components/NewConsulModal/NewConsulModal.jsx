import { StyleSheet, TouchableOpacity } from "react-native"
import { NormalButton } from "../Button/Buttons"
import { FormField } from "../FormField/FormField"
import { LinkMedium } from "../Links/Style"
import { Title } from "../Title/Style"
import { ConsulLevel, ConsulLocal, ContainerChoice, ContainerView, ModalConsul } from "./Style"
import { ContainerBox } from "../../screens/Home/Style"
import { FormChoice } from "../FormChoice/FormChoice"
import { useState } from "react"
import { Label } from "../FormField/Style"
import { SelectBox, SelectBoxTitle } from "../CalendarApp/Style"
import SelectDropdown from "react-native-select-dropdown"
import { AntDesign } from '@expo/vector-icons';


export const NewConsulModal = ({
    visible,
    onRequestClose,
    navigation
}) => {

    const [nivel, setNivel] = useState({id: "ADD341BE-8E85-40F1-BCA3-71C72A1585D3", prioridade: "Rotina" })
    const [localidade, setLocalidade] = useState("")


    const select = [
        "Cardiologista",
        "Ginecologista",
        "Oftalmologista",
        "Psiquiatra",
        "Clinico geral"
    ]

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

                <ConsulLocal >
                        <SelectBoxTitle>Selecione o profissional desejado</SelectBoxTitle>
                        <SelectDropdown
                            data={select}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                            }}
                            defaultButtonText={'Selecionar especialidade'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#34898F'} size={22} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
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

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#60BFC5',
        marginTop: 10
    },
    dropdown1BtnTxtStyle: { color: '#34898F', textAlign: 'left', fontFamily: 'MontserratAlternates_600SemiBold', fontSize: 14 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#60BFC5' },
    dropdown1RowTxtStyle: { color: '#34898F', textAlign: 'center', fontSize: 20 },
})