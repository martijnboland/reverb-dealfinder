import React, { View, Text, StyleSheet, TouchableOpacity, ListView, Image } from 'react-native';
import { connect } from 'react-redux/native';

import navigateTo from '../shared/router/routerActions';
import dealsSelector from './dealsSelector';
import { findMoreDeals } from '../find/actions';
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
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deals) {
      this.state.dataSource = this._ds.cloneWithRows(nextProps.deals);
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
  
  _onEndReached() {
    this.props.dispatch(findMoreDeals());
  }

  _onGoBack() {
    this.props.dispatch(navigateTo('/finder'));
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
          <Text style={globalStyles.navbarButton}></Text>
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          contentContainerStyle={styles.list}
          onEndReached={this._onEndReached}
        />
      </View>      
    );
  }

}

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

export default connect(dealsSelector)(Products)