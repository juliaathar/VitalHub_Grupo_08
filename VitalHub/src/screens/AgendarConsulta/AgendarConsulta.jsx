import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { MedCard } from "../../components/MedCard/MedCard"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { CardList } from "../Home/Style"
import { TouchableOpacity } from "react-native"
import { Body, RenderInside } from "./Style"
import { useEffect, useState } from "react"
import { CalendarApp } from "../../components/CalendarApp/CalendarApp"
import { ConsultationModal } from "../../components/ConsultationModal/ConsultationModal"
import api from "../../service/service"

export const AgendarConsulta = ({ navigation }) => {
    const [medicosLista, setMedicosLista] = useState(null)
    const [clinicasLista, setClinicasLista] = useState(null)

    const [status, setStatus] = useState("clínica");
    const [medicoSelected, setMedicoSelected] = useState("");
    const [clinicaSelected, setClinicaSelected] = useState("");
    const [consulModal, setConsulModal] = useState(false); //mudar para false


   

    const clinicas = [
        { id: 1, nomeClinica: "Clínica Natureh", endereco: "São Paulo, SP", nota: "4,5", dias: "Seg-Sex" },
        { id: 2, nomeClinica: "Diamond Pró-Mulher", endereco: "São Paulo, SP", nota: "4,8", dias: "Seg-Sex" },
        { id: 3, nomeClinica: "Clinica Villa Lobos", endereco: "Taboão, SP", nota: "4,2", dias: "Seg-Sab" },
        { id: 4, nomeClinica: "SP Oncologia Clínica", endereco: "Taboão, SP", nota: "4,2", dias: "Seg-Sab" }
    ]


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
                                    renderItem={ ({ item }) =>
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
                                    renderItem={ ({ item }) =>
                                        <MedCard
                                            medicos={item}
                                            //funções
                                            actived={medicoSelected == item.id}
                                            onPress={() => setMedicoSelected(item.id)}
                                        />
                                    }
                                />
                            ) : (
                                <CalendarApp />

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