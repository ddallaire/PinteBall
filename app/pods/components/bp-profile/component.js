import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import profileQuery from 'pinte-ball/queries/get-profile';
import moment from 'moment';

function sortByTime(array) {
  return array.sort((a,b) => moment(b.time).diff(moment(a.time)))
}

export default Component.extend({
  apollo: service('apollo'),
  session: service('session'),

  profileQuery: computed(function() {
    return this.get('apollo').query({
      query: profileQuery,
      variables: {cip: this.get('cip') || this.get('session').credentials.cip}
    }, 'profile').then(result => {
      this.set('profile', result);
    });
  }),

  reviews: computed('profile', function() {
    let profile = this.get('profile');
    return [
      ...profile.breweryReviewedBy.map(a => {
        a.target = a.brewery;
        a.target.link = "breweries/show";
        return a;
      }),
      ...profile.beerReviewedBy.map(a => {
        a.target = a.beer;
        a.target.link = "beers/show";
        return a;
      })
    ];
  }),

  sortedReviews: computed('reviews', function() {
    return sortByTime(this.get('reviews')).slice(0,4);
  }),

  comments: computed('profile', function() {
    let profile = this.get('profile');
    return [
      ...profile.breweryReviewsCommentedBy.map(a => {
        a.targetId = a.breweryReview.idBrewery;
        a.link = "breweries/show";
        return a;
      }),
      ...profile.beerReviewsCommentedBy.map(a => {
        a.targetId = a.beerReview.idBeer;
        a.link = "beers/show";
        return a;
      })
    ]
  }),

  sortedComments: computed('comments', function() {
    return sortByTime(this.get('comments')).slice(0,4);
  }),

  thumbsups: computed('profile', function() {
    let profile = this.get('profile');
    return [
      ...profile.breweryReviewsThumbsupBy,
      ...profile.breweryReviewsThumbsupBy
    ];
  }),

  sortedThumbsups: computed('thumbsups', function() {
    return sortByTime(this.get('thumbsups')).slice(0,4);
  })
});

