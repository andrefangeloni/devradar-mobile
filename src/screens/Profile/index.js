import React from 'react';

import { WebView } from 'react-native-webview';

// import styles from './styles';

const Profile = ({ navigation }) => {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView
      showsVerticalScrollIndicator={false}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
};

export default Profile;
