import { BoxUser, DataUser, ImageUser, Line, LinearContainer, UserName, Wellcome } from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Header = ({ navigation, name, foto }) => {

    return (
        <LinearContainer>
            <Line>
                <BoxUser
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <ImageUser source={{ uri: foto}} />

                    <DataUser>
                        <Wellcome>Bem Vindo</Wellcome>
                        <UserName>{name}</UserName>
                    </DataUser>

                </BoxUser>

                <TouchableOpacity onPress={() => navigation.navigate("NotificacoesConfig")}>
                    <MaterialCommunityIcons name="bell" size={25} color="white" />
                </TouchableOpacity>
            </Line>
        </LinearContainer>
    )
}
