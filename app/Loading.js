import React, { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../styles/global';

export default class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/splash.png')} style={styles.splash} />
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  splash: {
    marginBottom: 50
  },
  loading: {
    color: colors.textNormal,
    marginTop: 30
  }
});