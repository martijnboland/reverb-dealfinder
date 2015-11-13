import React, { Navigator } from 'react-native';

import RouterRegistry from './RouterRegistry';
import navigateTo from './routerActions';

const BACK = 'BACK';
const FORWARD = 'FORWARD';

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

        let route = this.props.registry.getRouteByPath(path);
        let routeIndex = this.routeNames.indexOf(path);

        if (routeIndex > -1) {
            this.routeNames = this.routeNames.slice(0, routeIndex + 1);
            route.direction = BACK;
            this.refs.navigator.popToRoute(route);
        } else {
            this.routeNames.push(path);
            route.direction = FORWARD;
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
            configureScene={(route) => (route.direction === BACK) ? Navigator.SceneConfigs.FloatFromRight : Navigator.SceneConfigs.FloatFromLeft}/>
    }
}

export {
  Router,
  RouterRegistry,
  navigateTo
}