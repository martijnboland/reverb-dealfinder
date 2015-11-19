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

  constructor(props) {
    super(props);

    this.routeNames = [props.registry.getInitialRoute().path];
  }

  navigateTo(path) {
    const route = this.props.registry.getRouteByPath(path);
    const currentNavigatorRoutes = this.refs.navigator.getCurrentRoutes();

    // Check if the route is known in the navigator. If so, pop to that route
    // or else push a new route.
    const navigatorRoute = currentNavigatorRoutes.find((r) => { return r.path === route.path });

    if (navigatorRoute) {
      this.refs.navigator.popToRoute(navigatorRoute);
    } else {
      this.refs.navigator.push(route);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentRoute !== nextProps.currentRoute) {
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