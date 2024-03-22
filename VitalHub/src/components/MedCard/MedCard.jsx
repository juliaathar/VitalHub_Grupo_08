import { CenterMed, ContainerMed, MedBody, MedImg, LineMed, Name, Specialty } from "./Style"

export const MedCard = ({
    nome = "Dra Alessandra",
    especialidade = "Demartologa, Esteticista",
    actived,
    onPress
}) => {
    return (
        <MedBody
            actived={actived}
            onPress={onPress}
        >
            <ContainerMed>
                <MedImg source={{ uri: "https://github.com/LeonKene-hub.png" }} />

                <CenterMed>
                    <LineMed>
                        <Name>{nome}</Name>
                    </LineMed>
                    <LineMed>
                        <Specialty>{especialidade}</Specialty>
                    </LineMed>
                </CenterMed>
            </ContainerMed>
        </MedBody>
    )
}