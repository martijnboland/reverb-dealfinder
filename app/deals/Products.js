import React, { View, Text, StyleSheet, TouchableOpacity, ListView, Image, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import { navigateTo } from '../shared/router/routerActions';
import { findDealsForSearchTerm, findDealsForCategory, findMoreDeals, resetSearchTerm, resetCategory } from '../find/actions';
import { gotoListing } from './actions';
import dealsSelector from './dealsSelector';
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
  
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._loadDeals(this.props.searchTerm, this.props.selectedCategory);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (! nextProps.isLoading && 
      ((nextProps.searchTerm && nextProps.searchTerm !== this.props.searchTerm) ||
      (nextProps.selectedCategory && nextProps.selectedCategory !== this.props.selectedCategory))) {
      this._loadDeals(nextProps.searchTerm, nextProps.selectedCategory);  
    }
    
    if (nextProps.deals) {
      this.state.dataSource = this._ds.cloneWithRows(nextProps.deals);
    }
    const wasLoading = this.state.isLoading;
    this.state.isLoading = nextProps.isLoading;
    
    if (wasLoading && ! nextProps.isLoading && nextProps.deals) {
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
  
  _loadDeals(searchTerm, selectedCategory) {
    this.setState({ isLoading: true })
    if (searchTerm) {
      this.props.dispatch(findDealsForSearchTerm(searchTerm));
    } 
    else if (selectedCategory) {
      this.props.dispatch(findDealsForCategory(selectedCategory));
    }
  }
  
  _getMoreDeals() {
    if (! this.state.isLoading && this.props.canLoadMoreDeals) {
      // TODO: need to find a more efficient deal finder algorithm.
      ///this.props.dispatch(findMoreDeals());    
    }
  }

  _onGoBack() {
    this.props.dispatch(navigateTo('/finder'));
  }

  _onGoToListing(link) {
    this.props.dispatch(gotoListing(link));
  }
  
  _renderRow(deal) {
    return (
     <TouchableOpacity onPress={() => this._onGoToListing(deal.link)} underlayColor="transparent">
        <View style={styles.row}>
          <Image source={{uri: deal.thumbnail}} style={styles.thumbnail} />
          <View style={styles.dealcontainer}>
            <View style={styles.dealtext}>
              <Text style={styles.dealtitle}>{deal.title}</Text>
            </View>
            <View style={styles.prices}>
              <Text style={styles.price}>{deal.price.symbol} {deal.price.amount}</Text>              
              <Text style={styles.pricerange}>
                $ {deal.bottom} - $ {deal.top}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  _renderBackButton() {
    if (!this.props.isWide) {
      return (
        <TouchableOpacity onPress={this._onGoBack} style={globalStyles.navbarButton}>
          <Text style={globalStyles.navbarButtonText}>&lt; Back</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={globalStyles.navbarButton} />
    );
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
          {this._renderBackButton()}
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
    marginTop: 10,
    marginBottom: 10
  },
  list: {
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
    padding: 0,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#ddd',
    height: 96
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
    fontSize: 12,
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
    fontSize: 11,
    flex: 1,
    textAlign: 'right',
    marginTop: 2
  }
});