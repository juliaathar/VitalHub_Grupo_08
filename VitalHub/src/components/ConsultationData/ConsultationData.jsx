import { Age, Appointment, CardBoby, CardContainer, CardInfo, CardOptions, Data, Hour, ImageUserCard, InfoBox, Name, Option, OptionText, TypeConsul } from "./Style"
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export const ConsultationData = ({
    situacao = "",
    nome = "Beta Tester",
    idade = "...",
    tipoConsulta = "Rotina",
    hora = "14:00",
    onPressCancel,
    onPressAppoiment,
    onPressCard
    
}) => {

    function wordBreak(nome, max = 18) {
        if (nome.length > max) {
            return nome.slice(0, max) + "...";
        }
        return nome;
    }
    
    function Consulta(tipo) {
        tipoConsulta = "Indefinido"

        switch (tipo) {
            case 1:
                tipoConsulta = "Rotina"
                break;
            case 2:
                tipoConsulta = "Exame"
                break;
            case 3:
                tipoConsulta = "Urgência"
                break;
        
            default:
                tipoConsulta = "Indefinido"
                break;
        }
        return tipoConsulta;
    }

    return (
        <CardBoby 
            onPress={onPressCard}
            activeOpacity={0.3}
            underlayColor="#DDDDDD"
        >
            <CardContainer>
                <ImageUserCard source={{ uri: "https://github.com/LeonKene-hub.png" }} />

                <CardInfo>
                    <InfoBox>
                        <Name>{wordBreak(nome)}</Name>
                        <Data>
                            <Age>{idade != "In" ? idade : "∞"} anos</Age>
                            <Fontisto name="ellipse" size={8} color="#D9D9D9"/>
                            <TypeConsul>{Consulta(tipoConsulta)}</TypeConsul>
                        </Data>
                    </InfoBox>

                    <CardOptions>
                        <Hour
                            situacao={situacao}
                            color={situacao == "Pendente" ? "E8FCFD" : "F1F0F5"}
                        >
                            {
                                situacao == "Pendente" ? (
                                    <MaterialIcons
                                        situacao={situacao}
                                        name="watch-later"
                                        size={14}
                                        color="#49B3BA"
                                    />
                                ) : situacao == "Cancelado" ? (
                                    <MaterialIcons
                                        situacao={situacao}
                                        name="watch-later"
                                        size={14}
                                        color="#4E4B59"
                                    />
                                ) : (
                                    <MaterialIcons
                                        situacao={situacao}
                                        name="watch-later"
                                        size={14}
                                        color="#4E4B59"
                                    />
                                )
                            }


                            <Appointment color={situacao == "Pendente" ? "49B3BA" : "4E4B59"}> {hora} </Appointment>
                        </Hour>

                        {
                            situacao == "Cancelado" ? (
                                <></>
                            ) : situacao == "Pendente" ? (

                                <Option 
                                    onPress={onPressCancel}
                                    situacao={situacao}
                                    color={"C81D25"}
                                >
                                    <OptionText situacao={situacao} color={"C81D25"}> Cancelar </OptionText>
                                </Option>

                            ) : (

                                <Option 
                                    onPress={onPressAppoiment}
                                    situacao={situacao}
                                    color={"344F8F"}
                                >
                                    <OptionText situacao={situacao} color={"344F8F"}> Ver Prontuario </OptionText>
                                </Option>

                            )
                        }
                    </CardOptions>
                </CardInfo>

            </CardContainer>
        </CardBoby>
    )
}