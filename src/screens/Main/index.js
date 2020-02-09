import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Main = ({ navigation }) => {
  const [currentRegion, setCurrentRegion] = useState(null);
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    loadInitialPosition();
  }, []);

  const loadInitialPosition = async () => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <MapView style={styles.mapView} initialRegion={currentRegion}>
      <Marker coordinate={{ latitude: -22.9408845, longitude: -47.0680438 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/51930261?s=460&v=4',
          }}
        />
        <Callout
          onPress={() => {
            navigation.navigate('Profile', {
              github_username: 'andrefangeloni',
            });
          }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>André Angeloni</Text>
            <Text style={styles.devBio}>React Native Developer</Text>
            <Text style={styles.devTechs}>React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
};

export default Main;
