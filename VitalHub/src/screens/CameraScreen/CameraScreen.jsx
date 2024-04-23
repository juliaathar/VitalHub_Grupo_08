import { ButtonCamera, ButtonContainer, CameraBody, ButtonCameraOthers, ButtonCameraCenter } from './Style';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { PhotoTaked } from '../../components/Photo/Photo';
import { useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View } from 'react-native';
//import ImagePicker from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker'

export const CameraScreen = ({ navigation, route }) => {
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off)
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [modalPhoto, setModalPhoto] = useState(false);
    const camRef = useRef(null);

    //const [getMediaLibrary, setMediaLibrary] = useState(route.params.SetMediaLabrary);
    const [lastestPhoto, setLastestPhoto] = useState(null);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            requestPermission(status === 'granted')
        })();

        //verificar se mostra a parte da galeria
        //console.log(getMediaLibrary);
        //console.log(route.params.SetMediaLabrary);
        if (route.params.SetMediaLabrary) {
            GetLastPhoto();
        }
    }, []);

    if (!permission) {
        // Camera permissions are not granted yet
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>Precisamos de permissao para usar a camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    async function GetLastPhoto() {
        const assets = await MediaLibrary.getAssetsAsync({ sortBy : [[MediaLibrary.SortBy.creationTime, false]], first : 1})
        console.log(assets);
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function flashActive() {
        setFlash(current => (current === FlashMode.on ? FlashMode.off : FlashMode.on));
        console.log(flash)
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setModalPhoto(true)
        }
    }
    async function savePicture() {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
            .then(() => {
                navigation.navigate('Prescricao', { photoUri: capturedPhoto })
            })
            .catch(error => {
                console.log("error", error)
            })
    }


    return (
        <>
            <CameraBody
                type={type}
                flashMode={flash}
                ref={camRef}
                ratio='16:9'
            >

                <ButtonContainer>
                    <ButtonCameraOthers onPress={toggleCameraType}>
                        <FontAwesome name="refresh" size={23} color="white" />
                    </ButtonCameraOthers>

                    <ButtonCamera onPress={takePicture}>
                        <ButtonCameraCenter/>
                    </ButtonCamera>

                    <ButtonCameraOthers onPress={flashActive}>
                        {flash === "on" ? (
                            <Ionicons name="flash" size={24} color="yellow" />
                        ) : (
                            <Ionicons name="flash-off" size={24} color="white" />
                        )}
                    </ButtonCameraOthers>
                </ButtonContainer>
            </CameraBody>

            <PhotoTaked
                titleButton='Salvar'
                RequestSave={savePicture}
                uriPhoto={capturedPhoto}
                visible={modalPhoto}
                onRequestClose={() => setModalPhoto(false)}
            />

        </>
    )
}
