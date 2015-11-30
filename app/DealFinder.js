import React, { View, StyleSheet, Navigator } from 'react-native';
import { connect } from 'react-redux/native';

import { Router, RouterRegistry, navigateTo, didNavigateTo } from './shared/router/Router';
import { fetchCategoriesIfNeeded } from './find/actions';
import { colors } from '../styles/global';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  _getRouterRegistry(){
    let registry = new RouterRegistry({
      initialRoute: { path: '/', title: '', component: () => require('./Loading') }
    });

    registry.registerRoutes([
      { path: '/finder', title: 'Find deals', component: () => require('./find/Finder') },
      { path: '/deals', title: 'Products', component: () => require('./deals/Products') },
      { path: '/listing', title: 'Listing', component: () => require('./deals/Listing'), sceneConfig: Navigator.SceneConfigs.FloatFromBottom }
    ]);

    return registry;
  }

  _renderScene(route, navigator){
    if (route) {
      let Component = route.component();
      return (
        <Component route={route} navigator={navigator}/>
      );
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCategoriesIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
    // Check if initial data is ready and navigate to finder
    if (this.props.categories.items.length === 0 && nextProps.categories && nextProps.categories.items.length > 0) {
      this.props.dispatch(navigateTo('/finder', true));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Router
          currentRoute={this.props.currentRoute}
          registry={this._getRouterRegistry()}
          renderScene={this._renderScene}
          style={styles.navigator}
          onRouteChanged={(route) => this.props.dispatch(didNavigateTo(route))}
          {...this.props} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B71817',
    paddingTop: 0
  },
  navigator: {
    flex: 1,
    backgroundColor: colors.mainBackground
  }
});

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    currentRoute: state.router.currentRoute,
    categories: state.finder.categories
  };
}

export default connect(mapStateToProps)(App);
