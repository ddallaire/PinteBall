import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Brewery from 'pinte-ball/queries/get-brewery';
import BreweryReviews from 'pinte-ball/queries/get-brewery-reviews';
import RSVP from 'rsvp';

export default Route.extend({
  apollo: service('apollo'),

  model(params) {
    const breweryVariables = {
      breweryId: params.brewery_id,
      breweryIdArray: [params.brewery_id]
    }

    const reviewsVariables = {
      skip: 0,
      first: 50,
      breweries: [params.brewery_id],
      cips: []
    }


    return RSVP.hash({
      brewery: this.get('apollo').query({ query: Brewery, variables:breweryVariables }),
      reviews: this.get('apollo').query({ query: BreweryReviews, variables: reviewsVariables }, 'breweryReviews')
    });
  }
});
