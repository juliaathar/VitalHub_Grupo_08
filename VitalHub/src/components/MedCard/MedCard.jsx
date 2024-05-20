import { CenterMed, ContainerMed, MedBody, MedImg, LineMed, Name, Specialty } from "./Style"

export const MedCard = ({
    medicos,
    actived,
    onPress
}) => {
    return (
        <MedBody
            actived={actived}
            onPress={onPress}
        >
            <ContainerMed>
                <MedImg source={medicos.idNavigation.foto ? {uri: medicos.idNavigation.foto} : { uri: "https://github.com/LeonKene-hub.png" }} />

                <CenterMed>
                    <LineMed>
                        <Name>{medicos.idNavigation.nome}</Name>
                    </LineMed>
                    <LineMed>
                        <Specialty>{medicos.especialidade.especialidade1}</Specialty>
                    </LineMed>
                </CenterMed>
            </ContainerMed>
        </MedBody>
    )
}