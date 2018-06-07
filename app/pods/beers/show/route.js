import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import query from 'pinte-ball/queries/get-beer';

export default Route.extend({
  apollo: service('apollo'),

  model(params) {
    let variables = {
      beerId: params.beer_id
    }

    return this.get('apollo').query({ query, variables }, 'beer');
  }
});
