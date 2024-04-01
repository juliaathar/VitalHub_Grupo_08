import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BellButton, BellButtonText } from './Style';

export const BellButtonAll = ({
    onPress,
    actived
}) => {
    return (
        <BellButton
            onPress={onPress}
        >
            <MaterialCommunityIcons name="bell-outline" size={34} color={actived ? "white" : "gray"} />
            <BellButtonText style={{ color: actived ? "white" : "gray" }}>Todas</BellButtonText>
        </BellButton>
    )
}

export const BellButtonNone = ({
    onPress,
    actived
}) => {
    return (
        <BellButton
            onPress={onPress}
        >
            <MaterialCommunityIcons name="bell-remove-outline" size={34} color={actived ? "white" : "gray"} />
            <BellButtonText style={{ color: actived ? "white" : "gray" }}>Nenhuma</BellButtonText>
        </BellButton>
    )
}

export const BellButtonPer = ({
    onPress,
    actived
}) => {
    return (
        <BellButton
            onPress={onPress}
        >
            <MaterialCommunityIcons name="bell-plus-outline" size={34} color={actived ? "white" : "gray"} />
            <BellButtonText style={{ color: actived ? "white" : "gray" }}>Personalizado</BellButtonText>
        </BellButton>
    )
}