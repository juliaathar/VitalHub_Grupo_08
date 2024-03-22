import { Title } from "../../components/Title/Style";
import { Button, View } from "react-native";

export const Navegacao = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />

            <Button
                title="RecuperarSenha"
                onPress={() => navigation.navigate("RecuperarSenha")}
            />

            <Button
                title="VerificarEmail"
                onPress={() => navigation.navigate('VerificarEmail')}
            />

            <Button
                title="RedefinirSenha"
                onPress={() => navigation.navigate('RedefinirSenha')}
            />

            <Button
                title="CriarConta"
                onPress={() => navigation.navigate('CriarConta')}
            />

            <Title> Dentro do app</Title>
            <Button
                title="Perfil"
                onPress={() => navigation.navigate('Perfil')}
            />

            <Button
                title="Home_Medico"
                onPress={() => navigation.navigate('Home_Medico')}
            />

            <Button
                title="Home"
                onPress={() => navigation.navigate('Home')}
            />

            <Button
                title="Prontuario"
                onPress={() => navigation.navigate('Prontuario')}
            />

            <Button
                title="AgendarConsulta"
                onPress={() => navigation.navigate('AgendarConsulta')}
            />

            <Button
                title="Prescricao"
                onPress={() => navigation.navigate('Prescricao')}
            />

            <Button
                title="LocalMap"
                onPress={() => navigation.navigate('LocalMap')}
            />

            <Button
                title="CameraTeste"
                onPress={() => navigation.navigate('CameraTeste')}
            />
        </View>
    );
}