import React, { View, Text, StyleSheet } from 'react-native';

export default class CategoryBrowser extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Category browser</Text>
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 3
  }
});
