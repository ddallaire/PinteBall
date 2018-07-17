import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getObservable } from 'ember-apollo-client';
import BeerReviewComments from 'pinte-ball/queries/get-beer-review-comments';
import BreweryReviewComments from 'pinte-ball/queries/get-brewery-review-comments';
import InsertBreweryReviewThumbsup from 'pinte-ball/queries/mutations/insert-brewery-review-thumbsup';
import DeleteBreweryReviewThumbsup from 'pinte-ball/queries/mutations/delete-brewery-review-thumbsup';
import InsertBeerReviewThumbsup from 'pinte-ball/queries/mutations/insert-beer-review-thumbsup';
import DeleteBeerReviewThumbsup from 'pinte-ball/queries/mutations/delete-beer-review-thumbsup';

export default Component.extend({
  apollo: service('apollo'),
  session: service('session'),
  displayAddComment: false,
  liked: false,

  comments: null,

  liked: computed('review', 'session', function() {
    const reviews = this.get('review.thumbsups');
    return !!reviews.find(a => a.user.cip == this.get('session').credentials.cip);
  }),

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
    },
    toggleLike: function() {
      let query = null;
      let variables = null;
      let insert = false;
      let liked = this.get('liked');
      this.set('liked', !liked);

      if (this.get('type') === 'beer') {
        query = liked ? DeleteBeerReviewThumbsup : InsertBeerReviewThumbsup;
        variables = {id: this.get('review.idBeerReview')};
      } else {
        query = liked ?  DeleteBreweryReviewThumbsup : InsertBreweryReviewThumbsup;
        variables = {id: this.get('review.idBreweryReview')};
      }

      this.apollo.client.mutate({mutation: query, variables}).then(() => {});
    }
  },
});
