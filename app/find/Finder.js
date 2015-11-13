import React, { View, Text, StyleSheet, Navigator } from 'react-native';

import SearchInput from './SearchInput';
import CategoryBrowser from './CategoryBrowser';

export default class Finder extends React.Component {

  render() {
    return (
      <View>
        <SearchInput/>
        <CategoryBrowser/>
      </View>      
    );
  }

}