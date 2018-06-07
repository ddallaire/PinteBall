import Route from '@ember/routing/route';
import query from 'pinte-ball/queries/get-beers';
import { inject as service } from '@ember/service';

export default Route.extend({
  apollo: service('apollo'),

  model() {
    let variables = {
      skip: 0,
      first: 10
    };

    return this.get('apollo').query({query, variables}, "beers");
  }
});
