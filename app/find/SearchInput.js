import React, { View, TextInput, StyleSheet, Image } from 'react-native';

export default class SearchInput extends React.Component {

  render() {
    return (
      <Image source={require('../../img/kroam.png')} style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchTextInput} placeholder='Search for deals' />
        </View>
      </Image>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center' 
  },
  searchContainer: {
    padding: 10,
    margin: 40,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  searchTextInput: {
    height: 36,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#555555',
    backgroundColor: '#eee',
  }
});
