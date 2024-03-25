import { BoxUser, DataUser, ImageUser, Line, LinearContainer, UserName, Wellcome } from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { userDecodeToken } from '../../utils/Auth';
import { useEffect, useState } from "react";

export const Header = ({ navigation }) => {
    const [name, setName] = useState();

    async function profileLoad() {
        const token = await userDecodeToken();
        console.log(token)
        setName(token.name)
    }

    useEffect(() => {
        profileLoad();
    },[])

    return (
        <LinearContainer>
            <Line>
                <BoxUser
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <ImageUser source={{ uri: "https://github.com/LeonKene-hub.png" }} />

                    <DataUser>
                        <Wellcome>Bem Vindo</Wellcome>
                        <UserName>{name}</UserName>
                    </DataUser>

                </BoxUser>

                <TouchableOpacity>
                    <MaterialCommunityIcons name="bell" size={25} color="white" />
                </TouchableOpacity>
            </Line>
        </LinearContainer>
    )
}
