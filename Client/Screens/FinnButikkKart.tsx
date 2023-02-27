
import React from 'react';
import { useRef, useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, LatLng, Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View, TextInput, Text, TouchableOpacity, Button, Linking, Platform, PermissionsAndroid } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../components/environments';
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';



const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 59.913868,
  longitude: 10.752245,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};


type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};


function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}:


  InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "nb-NO",
        }}
      />
    </>
  );
}

export default function Kart({ route }) {
  const { dest_lat, dest_long, adresse } = route.params; // getting values from previous screen
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>({ latitude: dest_lat, longitude: dest_long });
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [placeholderText, setplaceholderText] = useState('');
  const mapRef = useRef<MapView>(null);
  const [adr, setAdr] = useState('');

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adr)}`;
    Linking.openURL(url);
  };


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };


  function gåTilPosisjon() {
    setOrigin(location)
    moveTo(location)
    setplaceholderText("Min posisjon")
    setAdr(adresse)
  }

  const edgePaddingValue = 70;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };
  const traceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };
  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination"
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    }
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#66A2BA"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Starts Posisjon"
          placeholder={placeholderText}
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destination"
          placeholder={adresse}
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace Route</Text>
        </TouchableOpacity>
        <View style={styles.posisjonsButtonContainer}>
          <TouchableOpacity onPress={gåTilPosisjon}>
            <Text style={styles.buttonText}> Min posisjon </Text>
          </TouchableOpacity>
        </View>
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}

      </View>
      <View>
        <TouchableOpacity style={styles.mapButton} onPress={openMaps} >
          <Text style={styles.buttonText}>Åpne Google Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
    right: '5%',
    justifyContent: 'center'
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  mapButton: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
    bottom: 150

  },
  buttonText: {
    textAlign: "center",
  },
  posisjonsButtonContainer: {
    left: 215,
    width: 95,
    borderRadius: 8,
  },
  posisjonsButton: {
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  butikkButtonContainer: {
    backgroundColor: '#66A2BA',
    width: 150,
    borderRadius: 8,
    bottom: 100,
    left: 140,
    alignContent: 'center',
    paddingVertical: 3,
  },
  butikkButtonText: {
    textAlign: "center",
    color: 'white',
    fontSize: 20,
  },
}); 
