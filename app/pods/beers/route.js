import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from '../../queries/get-beers';

export default Route.extend(RouteQueryManager, {
    model() {
        let variables = {
          skip: 0,
          first: 10
        };

        return this.get('apollo').query({ query, variables }, 'beers');
    }
});
