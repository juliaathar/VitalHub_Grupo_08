import { FormField } from "../../components/FormField/FormField"
import { Container } from "../../components/Container/Style"
import { Paragraph } from "../../components/Paragraph/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Title } from "../../components/Title/Style"
import { Text, TouchableOpacity } from "react-native"
import { InfoBody, Line, Map } from "./Style"
import {
  requestForegroundPermissionsAsync, //solicita o acesso
  getCurrentPositionAsync, //recebe a localizacao atual
  watchPositionAsync, //monitora a posicao
  LocationAccuracy,
  Accuracy
} from "expo-location"
import { useEffect, useRef, useState } from "react"
import { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import { mapskey } from "../../utils/mapsApiKey"



export const LocalMap = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState(null)
  const [finalPosition, setFinalPosition] = useState({
    latitude: -23.8329,
    longitude: -45.3662
  })
  const mapReference = useRef(null)

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

      // console.log(responde)
    })
  }, [1000])

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
    if (mapReference.current && initialPosition) {
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
      {initialPosition !== null ? (
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
              latitude: -23.8329,
              longitude: -45.3662,
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
              latitude: -23.8329,
              longitude: -45.3662
            }}
            title="Posicao atual"
            description="Estou aqui"
            pinColor="red"
          />

        </Map>

      ) : (
        <Text>Nao encontrado</Text>
      )}
      <InfoBody>
        <Title>Clínica Natureh</Title>
        <Paragraph>São Paulo, SP</Paragraph>

        <FormField
          labelText="Endereço"
          fieldWidth={90}
        />

        <Line>
          <FormField
            labelText="Número"
            fieldWidth={45}
          />
          <FormField
            labelText="Bairro"
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
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  }]