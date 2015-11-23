import React, { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux/native';

import navigateTo from '../shared/router/routerActions';
import { colors, styles as globalStyles } from '../../styles/global';

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this._ds.cloneWithRows(props.deals)
    }

    this._renderRow = this._renderRow.bind(this);
    this._onGoBack = this._onGoBack.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deals) {
      this.state.dataSource = this._ds.cloneWithRows(nextProps.deals);
    }
  }

  _renderRow(deal) {
    return (
      <View style={styles.row}>
        <Text>{deal.title}</Text>
        <Text>{deal.bottom}</Text>
        <Text>{deal.top}</Text>
        <Text>{deal.price.amount}</Text>
      </View>
    );
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          contentContainerStyle={styles.list}
        />
      </View>      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  list: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    deals: state.finder.deals
  };
}

export default connect(mapStateToProps)(Products)