import { Age, Appointment, CardBoby, CardContainer, CardInfo, CardOptions, Data, Hour, ImageUserCard, InfoBox, Name, Option, OptionText, TypeConsul } from "./Style"
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export const ConsultationData = ({
    situacao = "pendente",
    nome = "Beta Tester",
    idade = 20,
    tipoConsulta = "Rotina",
    hora = "14:00",
    onPressCancel,
    onPressAppoiment,
    onPressCard
    
}) => {
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
                        <Name>{nome}</Name>
                        <Data>
                            <Age>{idade} anos</Age>
                            <Fontisto name="ellipse" size={7} color="#D9D9D9"/>
                            <TypeConsul>{tipoConsulta}</TypeConsul>
                        </Data>
                    </InfoBox>

                    <CardOptions>
                        <Hour
                            situacao={situacao}
                            color={situacao == "pendente" ? "E8FCFD" : "F1F0F5"}
                        >
                            {
                                situacao == "pendente" ? (
                                    <MaterialIcons
                                        situacao={situacao}
                                        name="watch-later"
                                        size={14}
                                        color="#49B3BA"
                                    />
                                ) : situacao == "cancelado" ? (
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


                            <Appointment color={situacao == "pendente" ? "49B3BA" : "4E4B59"}> {hora} </Appointment>
                        </Hour>

                        {
                            situacao == "cancelado" ? (
                                <></>
                            ) : situacao == "pendente" ? (

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