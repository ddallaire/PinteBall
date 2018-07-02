import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Beer from 'pinte-ball/queries/get-beer';

export default Route.extend({
  apollo: service('apollo'),

  model(params) {
    return this.get('apollo').query({ query: Beer, variables: {
      beerId: params.beer_id
    }}, 'beer');
  }
});

