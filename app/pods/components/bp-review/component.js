import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BeerReviewComments from 'pinte-ball/queries/get-beer-review-comments';
import { computed } from '@ember/object';

export default Component.extend({
  apollo: service('apollo'),
  comments: computed('review', function() {
    const variables = {
      skip: 0,
      first: 50,
      beerReviews: [this.get('review.idBeerReview')],
      cips: []
    }
    Promise.resolve(this.get('apollo').query({ query: BeerReviewComments, variables }, 'beerReviewComments')).then(c => {
      this.set('comments', c);
    });
  })
});
