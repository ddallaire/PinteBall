import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getObservable } from 'ember-apollo-client';
import BeerReviews from 'pinte-ball/queries/get-beer-reviews';
import BreweryReviews from 'pinte-ball/queries/get-brewery-reviews';

export default Component.extend({
  apollo: service('apollo'),

  reviews: null,

  reviewsQuery: computed(function() {
    let query = null;
    let variables = {
      skip: 0,
      first: 50,
      cips: []
    };
    let queryResultName = '';

    if (this.get('type') === 'beer') {
      query = BeerReviews;
      variables.beers = [this.get('beerOrBreweryId')];
      queryResultName = 'beerReviews';
    } else {
      query = BreweryReviews;
      variables.breweries = [this.get('beerOrBreweryId')];
      queryResultName = 'breweryReviews';
    }

    return this.get('apollo').watchQuery({
      query,
      variables
    }, queryResultName).then(result => {
      this.set('reviews', result);
    });
  }),

  actions: {
    showAddReview: function() {
      this.toggleProperty('displayAddReview');
    },

    refetchReviews() {
      getObservable(this.get('reviews')).refetch();
      this.toggleProperty('displayAddReview');
    }
  }
});
