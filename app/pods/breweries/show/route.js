import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import query from 'pinte-ball/queries/get-brewery';

export default Route.extend({
  apollo: service('apollo'),

  model(params) {
    let variables = {
      breweryId: params.brewery_id,
      breweryIdArray: [params.brewery_id]
    }

    return this.get('apollo').query({ query, variables });
  }
});
