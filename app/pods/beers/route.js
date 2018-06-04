import Route from '@ember/routing/route';
import query from 'assets/pinte-ball/queries/get-beers.graphql';

export default Route.extend({
    apollo: Ember.inject.service(),

    model() {
        return this.get('apollo').query({query});
    }
});
