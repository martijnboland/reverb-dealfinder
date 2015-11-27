import React, { Navigator } from 'react-native';

import RouterRegistry from './RouterRegistry';
import navigateTo from './routerActions';

class Router extends React.Component {

  static propTypes = {
    registry: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    currentRoute: false
  };

  navigateTo(currentRoute) {
    const route = this.props.registry.getRouteByPath(currentRoute.path);
    const currentNavigatorRoutes = this.refs.navigator.getCurrentRoutes();

    if (currentRoute.shouldReset) {
      this.refs.navigator.popToTop();
      this.refs.navigator.replace(route);      
    }
    else {
      // Check if the route is known in the navigator. If so, pop to that route
      // or else push a new route.
      const navigatorRoute = currentNavigatorRoutes.find((r) => { return r.path === route.path });
  
      if (navigatorRoute) {
        this.refs.navigator.popToRoute(navigatorRoute);
      } else {
        this.refs.navigator.push(route);
      }
        
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute && (!this.props.currentRoute || this.props.currentRoute.path !== nextProps.currentRoute.path)) {
      // change the current page to navigate
      this.navigateTo(nextProps.currentRoute);
    }
  }

  render() {
    return <Navigator
      ref="navigator"
      initialRoute={this.props.registry.getInitialRoute()}
      {...this.props}
      configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromRight}/>
  }
}

export {
  Router,
  RouterRegistry,
  navigateTo
}