import { Calendar, LocaleConfig } from "react-native-calendars";
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from "react-native-web";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { SelectBox, SelectBoxTitle } from "./Style";


export const CalendarApp = ({

}) => {
    LocaleConfig.locales['br'] = {
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abril', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
        dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
        today: "Hoje"
    };
    LocaleConfig.defaultLocale = 'br';


    const [selected, setSelected] = useState('');
    const horarios = [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00"
    ]

    return (
        <>
            <Calendar
                //style={{marginBottom: 10}}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />

            <SelectBox>
                <SelectBoxTitle>Selecione um horário disponível</SelectBoxTitle>
                <SelectDropdown
                    data={horarios}
                    // defaultValueByIndex={1}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Selecionar horário'}
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
            </SelectBox>
        </>
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