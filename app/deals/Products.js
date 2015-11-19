import React, { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux/native';

import navigateTo from '../shared/router/routerActions';
import { styles as globalStyles } from '../../styles/global';

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this._onGoBack = this._onGoBack.bind(this);
  }

  _onGoBack() {
    this.props.dispatch(navigateTo('/finder'));
  }

  render() {
    return (
      <View>
        <View style={globalStyles.header}>
         <TouchableOpacity onPress={this._onGoBack} style={globalStyles.navbarButton}>
            <Text style={globalStyles.navbarButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={globalStyles.title}>
            <Text style={globalStyles.titleText}>Deals</Text>
          </View>
          <Text style={globalStyles.navbarButton}></Text>
        </View>
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
});

function mapStateToProps(state) {
  return {
    selectedCategory: state.finder.selectedCategory
  };
}

export default connect(mapStateToProps)(Products)