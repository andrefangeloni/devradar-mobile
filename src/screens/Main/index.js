import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

const Main = () => {
  useEffect(() => {
    loadInitialPosition();
  }, []);

  const loadInitialPosition = async () => {};

  return <MapView style={styles.mapView} />;
};

export default Main;
