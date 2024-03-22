import { BackgroundOption, ContainerLogo } from "../../components/ContainerLogo/Style"
import { ContentAccount, TextAccountLink } from "../../components/ContentAccount/Style"
import { CheckCode, CheckCodeBox } from "../../components/CheckCode/Style"
import { NormalButton } from "../../components/Button/Buttons"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { Title } from "../../components/Title/Style"
import { Logo } from "../../components/Logo/Style"
import { AntDesign } from '@expo/vector-icons';


export const VerificarEmail = ({navigation}) => {
    return (
        <Container>
            <ContainerLogo>
                <BackgroundOption>
                    <AntDesign name="close" size={24} color="#34898F" />
                </BackgroundOption>

                <Logo source={require("../../assets/VitalHub_Logo1.png")} />
            </ContainerLogo>

            <Title>Verifique seu e-mail</Title>

            <Paragraph>Digite o codigo de 4 digitos enviado para username@email.com</Paragraph>

            <CheckCodeBox>
                <CheckCode placeholder='0' keyboardType="numeric" maxLength={1} />
                <CheckCode placeholder='0' keyboardType="numeric" maxLength={1} />
                <CheckCode placeholder='0' keyboardType="numeric" maxLength={1} />
                <CheckCode placeholder='0' keyboardType="numeric" maxLength={1} />
            </CheckCodeBox>

            <NormalButton title={"Verificar"} fieldWidth={90}  onPress={() => navigation.navigate('RedefinirSenha')}/>

            <ContentAccount>
                <TextAccountLink>Reenviar Codigo</TextAccountLink>
            </ContentAccount>
        </Container>
    )
}