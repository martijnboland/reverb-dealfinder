import React, { Navigator, BackAndroid, Platform } from 'react-native';

import RouterRegistry from './RouterRegistry';
import { navigateTo, didNavigateTo } from './routerActions';

class Router extends React.Component {
  
  constructor(props) {
    super(props);
    
    this._navigateTo = this._navigateTo.bind(this);
    this._setNavigatorRef = this._setNavigatorRef.bind(this); 
  }

  static propTypes = {
    registry: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    currentRoute: false
  };

  _navigateTo(currentRoute) {
    const route = this.props.registry.getRouteByPath(currentRoute.path);
    const currentNavigatorRoutes = this._navigator.getCurrentRoutes();

    if (currentRoute.shouldReset) {
      this._navigator.popToTop();
      this._navigator.replace(route);      
    }
    else {
      // Check if the route is known in the navigator. If so, pop to that route
      // or else push a new route.
      const navigatorRoute = currentNavigatorRoutes.find((r) => { return r.path === route.path });
  
      if (navigatorRoute) {
        this._navigator.popToRoute(navigatorRoute);
      } else {
        this._navigator.push(route);
      }        
    }
  }
  
  _setNavigatorRef(navigator) {
    this._listeners = [];

    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {
        
        if (Platform.OS === 'android') {
          BackAndroid.addEventListener('hardwareBackPress', () => {
            navigator.pop();
            return  true;
          });
        }
        
        this._listeners.push(navigator.navigationContext.addListener('didfocus', (event) => {
          // sync route with state
          this.props.onRouteChanged(event.data.route.path)
        }));
      }
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute && 
      (!this.props.currentRoute || this.props.currentRoute.path !== nextProps.currentRoute.path || nextProps.currentRoute.shouldReset)) {
      // change the current page to navigate
      this._navigateTo(nextProps.currentRoute);
    }
  }
  
  componentWillUnmount() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  }

  render() {
    return <Navigator
      ref={this._setNavigatorRef}
      initialRoute={this.props.registry.getInitialRoute()}
      {...this.props}
      configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromRight}/>
  }
}

export {
  Router,
  RouterRegistry,
  navigateTo,
  didNavigateTo
}