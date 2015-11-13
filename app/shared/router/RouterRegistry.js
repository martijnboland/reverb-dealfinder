export default class RouterRegistry {

    constructor(options) {
        this.routes = {};

        options.initialRoute && this.registerRoute(options.initialRoute);
    }

    registerRoute(route) {
        if (Object.keys(this.routes).length === 0) {
            this.initialRoute = route.path;
        }
        this.routes[route.path] = route;
    }

    registerRoutes(routes) {
        for(let route of routes){
          this.registerRoute(route);
        }
    }

    unregisterRouteByPath(path) {
        this.routes = this.routes.filter((o) => { return o.path !== path; })
    }

    unregisterRoute(route) {
        this.unregisterRouteByName(route.path);
    }

    getRouteByPath(path) {
        if (path in this.routes) {
            return this.routes[path];
        } else {
            throw Error('Please register a page before trying to find it.')
        }
    }

    getInitialRoute() {
        return this.getRouteByPath(this.initialRoute);
    }
}