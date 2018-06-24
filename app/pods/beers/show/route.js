import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Beer from 'pinte-ball/queries/get-beer';
import BeerReviews from 'pinte-ball/queries/get-beer-reviews';
import RSVP from 'rsvp';

export default Route.extend({
  apollo: service('apollo'),

  model(params) {
    const beerVariables = {
      beerId: params.beer_id
    }

    const reviewsVariables = {
      skip: 0,
      first: 50,
      beers: [params.beer_id],
      cips: []
    }

    return RSVP.hash({
      beer: this.get('apollo').query({ query: Beer, variables: beerVariables }, 'beer'),
      reviews: this.get('apollo').query({ query: BeerReviews, variables: reviewsVariables }, 'beerReviews')
    });
  }
});

