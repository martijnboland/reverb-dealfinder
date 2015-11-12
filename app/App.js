var React = require('react-native');
var { View, Text, StyleSheet } = React;

//import React, { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/global';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Reverb Deal Finder</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B71817',
    paddingTop: 20,
  },
  navigator: {
    flex: 1,
    backgroundColor: colors.mainBackground
  }
});


export default App;