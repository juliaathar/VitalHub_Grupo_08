import { Calendar, LocaleConfig } from "react-native-calendars";
import { ActivityIndicator, StyleSheet } from "react-native-web";
import SelectDropdown from 'react-native-select-dropdown'
import { SelectBox, SelectBoxTitle } from "./Style";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import moment from "moment";

export const CalendarApp = ({
    setDiaSelected,
    setHoraSelected
}) => {
    LocaleConfig.locales['br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abril', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
        dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
        today: "Hoje"
    };
    LocaleConfig.defaultLocale = 'br';

    const dataAtual = moment().format("YYYY-MM-DD");
    const [arrayOptions, setArrayOptions] = useState('');
    const [selected, setSelected] = useState('');

    //instância da data atual
    const currentDate = new Date();

    //define a data final como sendo o último dia do mês
    const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    function CarregarOpcoes() {
        //conferir quantas horas faltam, ate a 24h
        const horasRestantes = moment(dataAtual).add(24, "hours").diff(moment(), 'hours')
        //console.log(horasRestantes);

        //criar um laco que rode a quantidade de horas que faltam
        const options = Array.from({ length: horasRestantes }, (_, index) => {
            let valor = new Date().getHours() + (index + 1)

            return (`${valor}:00`)

        })

        //devolver para cada hora, uma nova opcao no select
        setArrayOptions(options)
    }
    useEffect(() => {
        CarregarOpcoes();
    }, [])

    return (
        <>
            <Calendar
                //style={{marginBottom: 10}}
                onDayPress={day => {
                    setSelected(day.dateString);
                    setDiaSelected(day.dateString);
                }}
                minDate={currentDate.toUTCString()}
                maxDate={endingDate.dateString}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />

            {arrayOptions !== null ? (
                <SelectBox>
                    <SelectBoxTitle>Selecione um horário disponível</SelectBoxTitle>
                    <SelectDropdown
                        data={arrayOptions}

                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem);
                            setHoraSelected(selectedItem)
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
            )
                : <ActivityIndicator />}
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
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdown1BtnTxtStyle: { color: '#34898F', textAlign: 'left', fontFamily: 'MontserratAlternates_600SemiBold', fontSize: 14 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#60BFC5' },
    dropdown1RowTxtStyle: { color: '#34898F', textAlign: 'center', fontSize: 20 },
})