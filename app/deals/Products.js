import React, { View, Text, StyleSheet, TouchableOpacity, ListView, Image } from 'react-native';
import { connect } from 'react-redux/native';

import navigateTo from '../shared/router/routerActions';
import dealsSelector from './dealsSelector';
import { findMoreDeals, resetSearchTerm, resetCategory } from '../find/actions';
import Spinner from '../shared/components/Spinner';
import { colors, styles as globalStyles } from '../../styles/global';

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this._ds.cloneWithRows(props.deals),
      isLoading: props.isLoading,
      listView: null
    }

    this._renderRow = this._renderRow.bind(this);
    this._onGoBack = this._onGoBack.bind(this);
    this._getMoreDeals = this._getMoreDeals.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deals) {
      this.state.dataSource = this._ds.cloneWithRows(nextProps.deals);
    }
    const wasLoading = this.state.isLoading;
    this.state.isLoading = nextProps.isLoading;
    
    if (wasLoading && ! nextProps.isLoading) {
      // Get more deals when the listview is not filling the screen
      if (this._listView.scrollProperties.contentLength < this._listView.props.scrollRenderAheadDistance) {
        this._getMoreDeals();      
      }
    }
  }
  
  componentWillUnmount() {
    this.props.dispatch(resetSearchTerm());
    this.props.dispatch(resetCategory());
  }
  
  _getMoreDeals() {
    if (! this.state.isLoading && this.props.canLoadMoreDeals) {
      this.props.dispatch(findMoreDeals());    
    }
  }

  _renderRow(deal) {
    return (
      <View style={styles.row}>
        <Image source={{uri: deal.thumbnail}} style={styles.thumbnail} />
        <View style={styles.dealcontainer}>
          <View style={styles.dealtext}>
            <Text style={styles.dealtitle}>{deal.title}</Text>
          </View>
          <View style={styles.prices}>
            <Text style={styles.price}>{deal.price.symbol} {deal.price.amount}</Text>              
            <Text style={styles.pricerange}>
              {deal.bottom} - {deal.top}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  
  _onGoBack() {
    this.props.dispatch(navigateTo('/finder'));
  }
  
  _renderLoadingIndicator() {
    if (this.props.isLoading) {
      return (
        <Spinner color={'#fff'} />
      )      
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={globalStyles.header}>
         <TouchableOpacity onPress={this._onGoBack} style={globalStyles.navbarButton}>
            <Text style={globalStyles.navbarButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={globalStyles.title}>
            <Text style={globalStyles.titleText}>Deals</Text>
          </View>
          <View style={[globalStyles.navbarButton, globalStyles.headerRight]}>
            {this._renderLoadingIndicator()}
          </View>
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          contentContainerStyle={styles.list}
          onEndReached={this._getMoreDeals}
          ref={(c) => this._listView = c}
        />
      </View>      
    );
  }

}

export default connect(dealsSelector)(Products)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  list: {
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 3,
    padding: 0,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#ddd'
  },
  thumbnail: {
    width: 96,
    height: 96
  },
  dealcontainer: {
    height: 96,
    flex: 1,
    flexDirection: 'column'
  },
  dealtext: {
    padding: 5,
    flex: 1    
  },
  dealtitle: {
    color: colors.textNormal,
    fontSize: 11,
    fontWeight: 'bold'
  },
  prices: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: colors.secundaryBackground,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 5
  },
  price: {
    color:  colors.textAttention,
    fontWeight: 'bold',
    flex: 1
  },
  pricerange: {
    color: colors.textLight,
    fontSize: 10,
    flex: 1,
    textAlign: 'right',
    marginTop: 2
  }
});