import { TouchableOpacity } from "react-native";
import { BoxUser, DataUser, ImageUser, Line, LinearContainer, UserName, Wellcome } from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Header = ({ navigation }) => {
    return (
        <LinearContainer>
            <Line>
                <BoxUser
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <ImageUser source={{ uri: "https://github.com/LeonKene-hub.png" }} />

                    <DataUser>
                        <Wellcome>Bem Vindo</Wellcome>
                        <UserName>Beta Tester</UserName>
                    </DataUser>

                </BoxUser>

                <TouchableOpacity>
                    <MaterialCommunityIcons name="bell" size={25} color="white" />
                </TouchableOpacity>
            </Line>
        </LinearContainer>
    )
}
