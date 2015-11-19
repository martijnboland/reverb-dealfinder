import React, { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux/native';

import SearchInput from './SearchInput';
import CategoryBrowser from './CategoryBrowser';
import navigateTo from '../shared/router/routerActions';
import { selectCategory } from './actions';

class Finder extends React.Component {

  componentWillReceiveProps(nextProps) {
    // Navigate 
    if (nextProps.selectedCategory && nextProps.selectedCategory !== this.props.selectedCategory) {
      this.props.dispatch(navigateTo('/deals'));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchinput}>
          <SearchInput />
        </View>
        <View style={styles.categorybrowser}>
          <CategoryBrowser categories={this.props.categories} onSelectCategory={(category) => this.props.dispatch(selectCategory(category))} />
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
    selectedCategory: state.finder.selectedCategory
  };
}

export default connect(mapStateToProps)(Finder)