import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { MedCard } from "../../components/MedCard/MedCard"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { CardList } from "../Home/Style"
import { TouchableOpacity } from "react-native"
import { Body, RenderInside, SelectBox, SelectBoxTitle } from "./Style"
import { useEffect, useState } from "react"
import { CalendarApp } from "../../components/CalendarApp/CalendarApp"
import { ConsultationModal } from "../../components/ConsultationModal/ConsultationModal"
import api from "../../service/service"
import { StyleSheet } from "react-native-web";

export const AgendarConsulta = ({ navigation }) => {
    //status da pagina
    const [status, setStatus] = useState("clínica");

    //chamados pela API
    const [medicosLista, setMedicosLista] = useState(null)
    const [clinicasLista, setClinicasLista] = useState(null)

    //front-end
    const [medicoSelected, setMedicoSelected] = useState("");//id do medico selecionado
    const [clinicaSelected, setClinicaSelected] = useState("");//id da clinica selecionada

    //calendario e select
    const [diaSelected, setDiaSelected] = useState("");//id do dia selecionada
    const horarios = ["11:00", "12:00", "13:00", "14:00", "15:00"] //provisorio

    const [consulModal, setConsulModal] = useState(false); //mudar para false


    //traz os medicos da api
    async function ListarMedicos() {
        //Instanciar
        await api.get("http://172.16.39.82:4466/api/Medicos")
            .then(async (response) => {
                setMedicosLista(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    //traz as clinicas da api
    async function ListarClinicas() {
        await api.get("http://172.16.39.82:4466/api/Clinica/ListarTodas")
            .then(async (response) => {
                setClinicasLista(response.data)
            }).catch(error => {
                console.log(error);
            })
    }


    //atualiza as chamadas
    useEffect(() => {
        ListarMedicos()
        ListarClinicas()
    }, [])

    return (
        <>
            <Container style={{ justifyContent: "center", alignItems: "center", margin: 0 }}>
                <Body>
                    <Title style={{ marginTop: 25, marginBottom: 25 }}>Selecionar {status}</Title>

                    <RenderInside>
                        {status === "clínica" ?
                            (
                                <CardList
                                    data={clinicasLista}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <ClinicCard
                                            nomeClinica={item.nomeFantasia}
                                            nota={""}
                                            dias={""}
                                            local={item.endereco.logradouro}
                                            //funções
                                            actived={clinicaSelected == item.id}
                                            onPress={() => setClinicaSelected(item.id)}
                                        />
                                    }
                                />
                            ) : status === "médico" ? (
                                <CardList
                                    data={medicosLista}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <MedCard
                                            medicos={item}
                                            //funções
                                            actived={medicoSelected == item.id}
                                            onPress={() => setMedicoSelected(item.id)}
                                        />
                                    }
                                />
                            ) : (
                                // <CalendarApp />
                                <>
                                    <Calendar
                                        //style={{marginBottom: 10}}
                                        onDayPress={day => {
                                            setDiaSelected(day.dateString);
                                        }}
                                        markedDates={{
                                            [diaSelected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                                        }}
                                    />

                                    <SelectBox>
                                        <SelectBoxTitle>Selecione um horário disponível</SelectBoxTitle>
                                        <SelectDropdown
                                            data={horarios}
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
                    </RenderInside>

                    <NormalButton
                        title={"Continuar"}
                        onPress={() => {
                            switch (status) {
                                case "":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    clinicaSelected === "" ? setStatus("clínica") :
                                        setStatus("médico")
                                    break;
                                case "médico":
                                    medicoSelected === "" ? setStatus("médico") :
                                        setStatus("data")
                                    break;
                                case "data":
                                    setConsulModal(true)
                                    break;
                                default:
                                    setStatus("data")
                                    break;
                            }
                        }}
                    />

                    <TouchableOpacity
                        style={{ marginBottom: 15 }}
                        onPress={() => {
                            switch (status) {
                                case "data":
                                    setStatus("médico")
                                    break;
                                case "médico":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    { navigation.replace('Home') }
                                    break;
                                default:
                                    setStatus("clínica")
                                    break;
                            }
                        }}
                    >
                        <LinkMedium>Cancelar</LinkMedium>
                    </TouchableOpacity>
                </Body>
            </Container>

            <ConsultationModal
                visible={consulModal}
                onRequestClose={() => setConsulModal(false)}
                navigation={navigation}
            />
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