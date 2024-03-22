import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { MedCard } from "../../components/MedCard/MedCard"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { CardList } from "../Home/Style"
import { TouchableOpacity } from "react-native"
import { Body, RenderInside } from "./Style"
import { useState } from "react"
import { CalendarApp } from "../../components/CalendarApp/CalendarApp"
import { ConsultationModal } from "../../components/ConsultationModal/ConsultationModal"

export const AgendarConsulta = ({ navigation }) => {

    const [status, setStatus] = useState("clínica");

    const [clinicaSelected, setClinicaSelected] = useState("");
    const [medicoSelected, setMedicoSelected] = useState("");

    const [consulModal, setConsulModal] = useState(false); //mudar para false

    const clinicas = [
        { id: 1, nomeClinica: "Clínica Natureh", endereco: "São Paulo, SP", nota: "4,5", dias: "Seg-Sex" },
        { id: 2, nomeClinica: "Diamond Pró-Mulher", endereco: "São Paulo, SP", nota: "4,8", dias: "Seg-Sex" },
        { id: 3, nomeClinica: "Clinica Villa Lobos", endereco: "Taboão, SP", nota: "4,2", dias: "Seg-Sab" },
        { id: 4, nomeClinica: "SP Oncologia Clínica", endereco: "Taboão, SP", nota: "4,2", dias: "Seg-Sab" }
    ]

    const medicos = [
        { id: 1, nomeMedico: "Dra Alessandra", especialidade: "Demartologa, Esteticista" },
        { id: 2, nomeMedico: "Dr Kumushiro", especialidade: "Cirurgião, Cardiologista" },
        { id: 3, nomeMedico: "Dr Rodrigo Santos", especialidade: "Clínico, Pediatra" },
        { id: 4, nomeMedico: "Dr Jerfesson", especialidade: "Fisioterapia" }
    ]

    return (
        <>
            <Container style={{ justifyContent: "center", alignItems: "center", margin: 0 }}>
                <Body>
                    <Title style={{ marginTop: 25, marginBottom: 25 }}>Selecionar {status}</Title>

                    <RenderInside>
                        {status === "clínica" ?
                            (
                                <CardList
                                    data={clinicas}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <ClinicCard
                                            nomeClinica={item.nomeClinica}
                                            nota={item.nota}
                                            dias={item.dias}
                                            local={item.endereco}
                                            //funções
                                            actived={clinicaSelected == item.id}
                                            onPress={() => clinicaSelected == item.id ? setClinicaSelected(item.id) : setClinicaSelected(item.id)}
                                        />}
                                />
                            ) : status === "médico" ? (
                                <CardList
                                    data={medicos}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) =>
                                        <MedCard
                                            nome={item.nomeMedico}
                                            especialidade={item.especialidade}
                                            //funções
                                            actived={medicoSelected == item.id}
                                            onPress={() => medicoSelected == item.id ? setMedicoSelected(item.id) : setMedicoSelected(item.id)}
                                        />}
                                />
                            ) : (
                                <CalendarApp />

                            )
                        }

                        {/* <ClinicCard
                        actived={clinicaSelected}
                        onPress={() => clinicaSelected ? setClinicaSelected(false) : setClinicaSelected(true)}
                    /> */}

                        {/* <MedCard
                        actived={medicoSelected}
                        onPress={() => medicoSelected ? setMedicoSelected(false) : setMedicoSelected(true)}
                    /> */}

                    </RenderInside>

                    <NormalButton
                        title={"Continuar"}
                        onPress={() => {
                            switch (status) {
                                case "":
                                    setStatus("clínica")
                                    break;
                                case "clínica":
                                    setStatus("médico")
                                    break;
                                case "médico":
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
                                    {navigation.replace('Home')}
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