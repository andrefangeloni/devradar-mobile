import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Callout } from 'react-native-maps';

import api from '../../services/api';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Main = ({ navigation }) => {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

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

  const onRegionChange = region => {
    setCurrentRegion(region);
  };

  const loadDevs = async () => {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });
    setDevs(response.data.devs);
  };

  return (
    <>
      <MapView
        style={styles.mapView}
        initialRegion={currentRegion}
        onRegionChangeComplete={onRegionChange}>
        {devs.map(item => (
          <Marker
            key={item._id}
            coordinate={{
              latitude: item.location.coordinates[1],
              longitude: item.location.coordinates[0],
            }}>
            <Image style={styles.avatar} source={{ uri: item.avatar_url }} />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: item.github_username,
                });
              }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{item.name}</Text>
                <Text style={styles.devBio}>{item.bio}</Text>
                <Text style={styles.devTechs}>{item.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Devs por Techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity style={styles.loadButton} onPress={() => loadDevs()}>
          <Icon name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Main;
