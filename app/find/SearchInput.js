import React, { View, TextInput, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/global';

export default class SearchInput extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      searchTerm: props.searchTerm
    }  
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ searchTerm: nextProps.searchTerm });
  }
    
  render() {
    return (
      <Image source={require('../../img/kroam.png')} style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchTextInput} 
            placeholder='Search for deals'
            onChangeText={(text) => this.setState({ searchTerm: text })}
            onSubmitEditing={() => this.props.onSearch(this.state.searchTerm)}
            returnKeyType='search'
            value={this.state.searchTerm}
            autoCapitalize='none'
            autoCorrect={false}
          />
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
    justifyContent: 'center',
    backgroundColor: colors.mainAccent
  },
  searchContainer: {
    padding: 10,
    margin: 40,
    backgroundColor: '#fff',
    borderRadius: 2
  },
  searchTextInput: {
    height: 36,
    padding: 8,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 2,
    color: colors.textNormal,
    backgroundColor: '#eee',
  }
});
