import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BeerReviewComments from 'pinte-ball/queries/get-beer-review-comments';
import BreweryReviewComments from 'pinte-ball/queries/get-brewery-review-comments';
import { computed } from '@ember/object';

export default Component.extend({
  apollo: service('apollo'),
  comments: computed('review', function() {
    let variables = {
      skip: 0,
      first: 50,

      cips: []
    }

    if (this.get('type') === 'beer') {
      variables.beerReviews = [this.get('review.idBeerReview')];
      Promise.resolve(this.get('apollo').query({ query: BeerReviewComments, variables }, 'beerReviewComments')).then(c => {
        this.set('comments', c);
      });
    } else {
      variables.breweryReviews = [this.get('review.idBreweryReview')];
      Promise.resolve(this.get('apollo').query({ query: BreweryReviewComments, variables }, 'breweryReviewComments')).then(c => {
        this.set('comments', c);
      });
    }
  })
});
