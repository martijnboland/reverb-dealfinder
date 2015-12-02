import React, { View, Image, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { colors } from '../../styles/global';

export default class CategoryBrowser extends React.Component {

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this._ds.cloneWithRows(props.categories)
    }

    this._renderRow = this._renderRow.bind(this);
    this._onSelectCategory = this._onSelectCategory.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      this.state.dataSource = this._ds.cloneWithRows(nextProps.categories);
    }
  }

  _onSelectCategory(category) {
    this.props.onSelectCategory(category);
  }

  _renderRow(category) {
    const slug = category.slug;
    return (
      <TouchableHighlight onPress={() => this._onSelectCategory(slug)} underlayColor="transparent">
        <View style={styles.row}>
          <Image style={styles.catimage} source={{uri: category.image}} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={[styles.title, this.props.titleStyle]}>Browse deals by category</Text>
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
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 10
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#ddd'
  },
  catimage: {
    width: 128,
    height: 48,
    marginBottom: 5
  },
  categoryText: {
    color: colors.textNormal,
    fontSize: 12
  }
});
