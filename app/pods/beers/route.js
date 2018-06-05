import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'pinte-ball/queries/get-beers';

export default Route.extend(RouteQueryManager, {
    model() {
        let variables = {
          skip: 0,
          first: 10
        };

        return [{id: 1, name: "Péché mortel", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}, {id: 2, name: "Coors light", description: "alalal"}, {id: 3, name: "Other", description: "alalal"}];
    }
});
