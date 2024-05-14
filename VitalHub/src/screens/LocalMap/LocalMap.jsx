import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { FormField } from "../../components/FormField/FormField"
import { Container } from "../../components/Container/Style"
import MapViewDirections from 'react-native-maps-directions';
import { Paragraph } from "../../components/Paragraph/Style"
import { InfoBody, Line, Map, MapContainer } from "./Style"
import { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { useEffect, useRef, useState } from "react"
import { mapskey } from "../../utils/mapsApiKey"
import api from "../../service/service"
import {
  requestForegroundPermissionsAsync, //solicita o acesso
  getCurrentPositionAsync, //recebe a localizacao atual
  watchPositionAsync, //monitora a posicao
  LocationAccuracy,
  Accuracy
} from "expo-location"


export const LocalMap = ({ navigation, route }) => {
  //rota
  const { clinicaId } = route.params || {};

  useEffect(() => {
    BuscarClinica();
  }, [])

  //mapa
  const [initialPosition, setInitialPosition] = useState(null)
  const [finalPosition, setFinalPosition] = useState(null)

  const [endereco, setEndereco] = useState({})
  const [nomeClinica, setNomeClinica] = useState()
  const mapReference = useRef(null)

  async function BuscarClinica() {
    const response = await api.get(`/Clinica/BuscarPorId?id=${clinicaId}`)
    console.log("=============== Funcao de trazer dados da clinica: ===============");
    console.log(response.data);

    setNomeClinica(response.data.nomeFantasia)
    setFinalPosition({ latitude: response.data.endereco.latitude, longitude: response.data.endereco.longitude })
    setEndereco(response.data.endereco)
  }

  //captura a posicao e salva as coordenadas
  useEffect(() => {
    CapturarLocalizacao()
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 100,
      distanceInterval: 1
    }, async (responde) => {
      //recebe e guarda a nova localizacao
      await setInitialPosition(responde)

      mapReference.current?.animateCamera({
        pitch: 60,
        center: responde.coords
      })
    })
  }, [1500])

  useEffect(() => {
    RecarregarVisualizacao()
  }, [initialPosition])


  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync()
    if (granted) {
      const captureLocation = await getCurrentPositionAsync()
      setInitialPosition(captureLocation)
    }
  }


  async function RecarregarVisualizacao() {
    if (mapReference.current && initialPosition && finalPosition) {
      await mapReference.current.fitToCoordinates(
        [
          { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
          { latitude: finalPosition.latitude, longitude: finalPosition.longitude }
        ],
        {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
          animated: true
        }
      )
    }
  }

  return (
    <Container>
      <MapContainer>
        {initialPosition && finalPosition !== null ? (
          <Map
            ref={mapReference}
            //marcar o ponto de inicio
            initialRegion={{
              latitude: initialPosition.coords.latitude,
              longitude: initialPosition.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            customMapStyle={grayMapStyle}
            provider={PROVIDER_GOOGLE}
          >

            <Marker
              //meu marcador
              coordinate={{
                latitude: initialPosition.coords.latitude,
                longitude: initialPosition.coords.longitude
              }}
              title="Posicao atual"
              description="Estou aqui"
              pinColor="cyan"
            />

            {/* trajeto do maps */}
            <MapViewDirections
              origin={initialPosition.coords}
              destination={{
                //bertioga -23.8007, -46.0209
                latitude: finalPosition.latitude,
                longitude: finalPosition.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
              apikey={mapskey}
              strokeWidth={3}
              strokeColor="blue"
            />

            <Marker
              //meu destino
              coordinate={{
                latitude: finalPosition.latitude,
                longitude: finalPosition.longitude
              }}
              title="Posicao atual"
              description="Quero ir"
              pinColor="red"
            />

          </Map>
        ) : (
          <ActivityIndicator />
        )}
      </MapContainer>
      <InfoBody>
        <Title>{nomeClinica}</Title>
        <Paragraph>{endereco.cidade}</Paragraph>

        <FormField
          labelText="Endereço"
          fieldValue={endereco.logradouro}
          fieldWidth={90}
        />

        <Line>
          <FormField
            labelText="Número"
            fieldValue={`${endereco.numero}`}
            fieldWidth={45}
          />
          <FormField
            labelText="Cidade"
            fieldValue={endereco.cidade}
            fieldWidth={45}
          />
        </Line>

        <TouchableOpacity style={{ marginBottom: 15, marginTop: 15 }} onPress={() => navigation.replace('Main')}>
          <LinkMedium>Voltar</LinkMedium>
        </TouchableOpacity>
      </InfoBody>
    </Container>
  )
}

const grayMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#E1E0E7" }] },
  { elementType: "geometry.fill", stylers: [{ saturation: -5 }, { lightness: -5 }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#FBFBFB" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#33303E" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "on" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "poi.business", stylers: [{ visibility: "on" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#66DA9F" }] },
  { featureType: "poi.park", elementType: "labels.text", stylers: [{ visibility: "on" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1B1B1B" }] },
  { featureType: "road", stylers: [{ visibility: "on" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#C6C5CE" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#FBFBFB" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ACABB7" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#8C8A97" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#8C8A97" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#8EA5D9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#fbfbfb" }] }]