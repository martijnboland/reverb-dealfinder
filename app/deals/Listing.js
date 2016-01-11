import React, { View, Text, StyleSheet, TouchableOpacity, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';

import { navigateTo } from '../shared/router/routerActions';
import { colors, styles as globalStyles } from '../../styles/global';

export default class Listing extends React.Component {

  constructor(props) {
    super(props);

    this._onClose = this._onClose.bind(this);
  }
    
  _onClose() {
    this.props.dispatch(navigateTo('/deals'));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={this._onClose} style={[globalStyles.navbarButton]}>
            <Text style={globalStyles.navbarButtonText}>Close</Text>
          </TouchableOpacity>            
          <View style={globalStyles.title}>
            <Text style={globalStyles.titleText}>Listing</Text>
          </View>
          <View style={globalStyles.navbarButton}>
          </View>
        </View>
        <WebView style={styles.webview} url={this.props.listingLink} scalesPageToFit={true} javaScriptEnabled={true} />
      </View>      
    );
  }

}

function mapStateToProps(state) {
  return {
    listingLink: state.deals.selectedListing
  };
}

export default connect(mapStateToProps)(Listing)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  }
});