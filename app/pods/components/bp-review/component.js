import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BeerReviewComments from 'pinte-ball/queries/get-beer-review-comments';
import BreweryReviewComments from 'pinte-ball/queries/get-brewery-review-comments';
import { computed } from '@ember/object';

export default Component.extend({
  apollo: service('apollo'),
  displayAddComment: false,
  actions: {
    showAddComment: function() {
      this.toggleProperty('displayAddComment');
    }
  },
  comments: computed('review', function() {
    let variables = {
      skip: 0,
      first: 50,

      cips: []
    }

    let query;
    let responseName;

    if (this.get('type') === 'beer') {
      variables.beerReviews = [this.get('review.idBeerReview')];
      query = BeerReviewComments;
      responseName = 'beerReviewComments';
    } else {
      variables.breweryReviews = [this.get('review.idBreweryReview')];
      query = BreweryReviewComments;
      responseName = 'breweryReviewComments';
    }

    Promise.resolve(this.get('apollo').query({ query, variables }, responseName)).then(c => {
      this.set('comments', c);
    });
  })
});
