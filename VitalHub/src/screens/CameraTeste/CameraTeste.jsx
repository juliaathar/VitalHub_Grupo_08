import { Camera, CameraType, FlashMode } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react';

import { ButtonCamera, ButtonContainer, CameraBody } from './Style';
import { View } from 'react-native';
import { PhotoTaked } from '../../components/Photo/Photo';

export const CameraTeste = ({ navigation, route}) => {
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off)
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const camRef = useRef(null)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [modalPhoto, setModalPhoto] = useState(false)
    /*
        
    */

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();

            const { status : mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            requestPermission(status === 'granted')
        })();
    }, []);

    if (!permission) {
        //Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>Precisamos de permissao para usar a camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
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
            navigation.navigate('Prescricao', {foto : "asset"})
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
                    <ButtonCamera onPress={toggleCameraType}>
                        <FontAwesome name="refresh" size={23} color="white" />
                    </ButtonCamera>

                    <ButtonCamera onPress={takePicture}>
                        <FontAwesome name='camera' size={23} color="white" />
                    </ButtonCamera>

                    <ButtonCamera onPress={flashActive}>
                        <FontAwesome name="bolt" size={23} color={flash === "on" ? 'green' : 'white'}/>
                    </ButtonCamera>
                </ButtonContainer>
            </CameraBody>

            <PhotoTaked
                RequestSave={savePicture}
                uriPhoto={capturedPhoto}
                visible={modalPhoto}
                onRequestClose={() => setModalPhoto(false)}
            />

        </>
    )
}
