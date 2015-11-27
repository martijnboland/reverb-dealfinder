import React, { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux/native';

import SearchInput from './SearchInput';
import CategoryBrowser from './CategoryBrowser';
import { findDealsForCategory, findDealsForSearchTerm, resetSearchTerm, resetCategory } from './actions';

class Finder extends React.Component {
    
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchinput}>
          <SearchInput searchTerm={this.props.searchTerm} onSearch={(searchTerm) => this.props.dispatch(findDealsForSearchTerm(searchTerm))} />
        </View>
        <View style={styles.categorybrowser}>
          <CategoryBrowser categories={this.props.categories} onSelectCategory={(category) => this.props.dispatch(findDealsForCategory(category))} />
        </View>
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchinput: {
    flex: 1
  },
  categorybrowser: {
    flex: 3
  }
});

function mapStateToProps(state) {
  return {
    categories: state.finder.categories.items,
    searchTerm: state.finder.searchTerm,
    selectedCategory: state.finder.selectedCategory
  };
}

export default connect(mapStateToProps)(Finder)