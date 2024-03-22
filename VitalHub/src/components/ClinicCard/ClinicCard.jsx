import { Center, ClinicBody, ClinicName, Line, Local, NotaText, NoteIcon, WorkingBody, WorkingDays } from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const ClinicCard = ({
    nomeClinica = "Clínica Natureh",
    local = "São Paulo, SP",
    nota = "4,5",
    dias = "Seg-Sex",
    actived = false,
    onPress
}) => {
    return (
        <ClinicBody
            actived={actived}
            onPress={onPress}
        >
            <Center>

                <Line>
                    <ClinicName> {nomeClinica} </ClinicName>

                    <NoteIcon>
                        <AntDesign name="star" size={20} color="#F9A620" />

                        <NotaText> {nota} </NotaText>
                    </NoteIcon>
                </Line>

                <Line>
                    <Local> {local} </Local>

                    <WorkingBody>
                        <MaterialCommunityIcons name="calendar" size={20} color="#49B3BA" />
                        <WorkingDays> {dias} </WorkingDays>
                    </WorkingBody>
                </Line>
            </Center>
        </ClinicBody>
    )
}