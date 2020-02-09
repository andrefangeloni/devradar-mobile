import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  avatar: {
    height: 54,
    width: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  devBio: {
    marginTop: 5,
    color: '#666',
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: 'absolute',
    flexDirection: 'row',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    elevation: 2,
  },
  loadButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8E4DFF',
  },
});

export default styles;
