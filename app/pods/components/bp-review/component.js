import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getObservable } from 'ember-apollo-client';
import BeerReviewComments from 'pinte-ball/queries/get-beer-review-comments';
import BreweryReviewComments from 'pinte-ball/queries/get-brewery-review-comments';

export default Component.extend({
  apollo: service('apollo'),
  displayAddComment: false,

  comments: null,

  commentsQuery: computed(function() {
    let query = null;
    let variables = {
      skip: 0,
      first: 50,
      cips: []
    };
    let queryResultName = '';

    if (this.get('type') === 'beer') {
      query = BeerReviewComments;
      variables.beerReviews = [this.get('review.idBeerReview')];
      queryResultName = 'beerReviewComments';
    } else {
      query = BreweryReviewComments;
      variables.breweryReviews = [this.get('review.idBreweryReview')];
      queryResultName = 'breweryReviewComments';
    }

    return this.get('apollo').watchQuery({
      query,
      variables
    }, queryResultName).then(result => {
      this.set('comments', result);
    });
  }),

  thumbsupCount: computed('review', function() {
    return this.get('review.thumbsups').length;
  }),

  actions: {
    showAddComment: function() {
      this.toggleProperty('displayAddComment');
    },

    refetchComments() {
      this.toggleProperty('displayAddComment');
      getObservable(this.get('comments')).refetch();
    }
  },
});
