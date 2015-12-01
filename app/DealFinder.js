import React, { View, StyleSheet, Navigator } from 'react-native';
import { connect } from 'react-redux/native';

import { Router, RouterRegistry, navigateTo, didNavigateTo } from './shared/router/Router';
import { fetchCategoriesIfNeeded } from './find/actions';
import { colors } from '../styles/global';

import Loading from './Loading';
import Finder from './find/Finder';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isWide: false 
    };
    
    this._onViewLayout = this._onViewLayout.bind(this);
  }

  _getRouterRegistry(){
    let registry = new RouterRegistry({
      initialRoute: { path: '/', title: '', component: () => Loading }
    });
    
    let routes = [];
    if (! this.state.isWide) {
      routes.push({ path: '/finder', title: 'Find deals', component: () => Finder });
    }

    routes.push({ path: '/deals', title: 'Products', component: () => require('./deals/Products') });
    routes.push({ path: '/listing', title: 'Listing', component: () => require('./deals/Listing'), sceneConfig: Navigator.SceneConfigs.FloatFromBottom });

    registry.registerRoutes(routes);

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

  _onViewLayout(event) {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({ isWide: width > 800 })
  }
  
  _renderLayout() {
    if (this.state.isWide) {
      return (
        <View style={styles.twocolumns}>
          <Finder style={styles.side} categoriesStyle={styles.categories} />
          <Router
            currentRoute={this.props.currentRoute}
            registry={this._getRouterRegistry()}
            renderScene={this._renderScene}
            style={[styles.navigator, styles.main]}
            onRouteChanged={(route) => this.props.dispatch(didNavigateTo(route))}
            {...this.props} />
        </View>
      )
    } else {
      return (
        <Router
          currentRoute={this.props.currentRoute}
          registry={this._getRouterRegistry()}
          renderScene={this._renderScene}
          style={styles.navigator}
          onRouteChanged={(route) => this.props.dispatch(didNavigateTo(route))}
          {...this.props} />
      )
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCategoriesIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
    // Check if initial data is ready and navigate to finder when not in wide mode
    if (this.props.categories.items.length === 0 && 
      nextProps.categories && 
      nextProps.categories.items.length > 0 &&
      !this.state.isWide) {
      console.log('Received categories');
      this.props.dispatch(navigateTo('/finder', true));
    }
  }
  
  render() {
    return (
      <View style={styles.container} onLayout={this._onViewLayout}>
        {this._renderLayout()}
      </View>
    )
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
  },
  twocolumns: {
    flex: 1,
    flexDirection: 'row'
  },
  side: {
  },
  categories: {
    backgroundColor: '#444'
  },
  main: {
    flex: 2
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
