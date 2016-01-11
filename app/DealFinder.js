import React, { View, StyleSheet, Navigator } from 'react-native';
import { connect } from 'react-redux';

import { Router, RouterRegistry, navigateTo, didNavigateTo } from './shared/router/Router';
import { fetchCategoriesIfNeeded } from './find/actions';
import { changeLayout } from './shared/layout/actions';
import { colors } from '../styles/global';

import Loading from './Loading';
import Finder from './find/Finder';
import Products from './deals/Products';
import Listing from './deals/Listing';

class App extends React.Component {
  constructor(props) {
    super(props);

    this._routerRegistry = this._buildRouterRegistry(false);

    this._onViewLayout = this._onViewLayout.bind(this);
  }
  
  componentDidMount() {
    this.props.dispatch(fetchCategoriesIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
    // Rebuild navigation when switching from wide to non-wide and vice-versa
    if (nextProps.layout.isWide !== this.props.layout.isWide) {
      if (! nextProps.layout.isWide) {
        this.props.dispatch(navigateTo('/finder', true));          
      }
    }
    
    // Check if initial data is ready and navigate to finder when not in wide mode
    if (this.props.categories.items.length === 0 && 
      nextProps.categories && 
      nextProps.categories.items.length > 0 &&
      !this.props.layout.isWide) {
      this.props.dispatch(navigateTo('/finder', true));
    }
  }
  
  _buildRouterRegistry() {
    let routerRegistry = new RouterRegistry({
      initialRoute: { path: '/', title: '', component: () => Loading }
    });
    
    let routes = [
      { path: '/finder', title: 'Find deals', component: () => Finder },
      { path: '/deals', title: 'Products', component: () => Products },
      { path: '/listing', title: 'Listing', component: () => Listing, sceneConfig: Navigator.SceneConfigs.FloatFromBottom }
    ];
    routerRegistry.registerRoutes(routes);
    
    return routerRegistry;
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
    this.props.dispatch(changeLayout(event.nativeEvent.layout));
  }
  
  _renderLayout() {
    if (this.props.layout.isWide) {
      return (
        <View style={styles.twocolumns}>
          <Finder style={styles.side} categoriesStyle={styles.twoColCategories} titleStyle={styles.twoColCategoriesTitle} />
          <Router
            currentRoute={this.props.currentRoute}
            registry={this._routerRegistry}
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
          registry={this._routerRegistry}
          renderScene={this._renderScene}
          style={styles.navigator}
          onRouteChanged={(route) => this.props.dispatch(didNavigateTo(route))}
          {...this.props} />
      )
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

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    currentRoute: state.router.currentRoute,
    categories: state.finder.categories,
    layout: state.layout
  };
}

export default connect(mapStateToProps)(App);

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
  twoColCategories: {
    backgroundColor: '#444'
  },
  twoColCategoriesTitle: {
    color: '#eee'
  },
  main: {
    flex: 2
  }
});