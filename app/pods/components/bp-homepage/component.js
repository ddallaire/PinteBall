import Component from '@ember/component';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import beersQuery from 'pinte-ball/queries/get-beers';
import breweriesQuery from 'pinte-ball/queries/get-breweries';
import beerReviewsQuery from 'pinte-ball/queries/get-beer-reviews';
import breweryReviewsQuery from 'pinte-ball/queries/get-brewery-reviews';

export default Component.extend({
  apollo: service('apollo'),
  beers: null,
  breweries: null,
  reviews: null,
  beerReviews: null,
  breweryReviews: null,

  beersQuery: computed(function() {
    return this.get('apollo').query({
      query: beersQuery,
      variables: {skip: 0, first: 10, styles: [], tags: []}
    }, "beers").then(result => {
      this.set('beers', result);
    });
  }),

  breweriesQuery: computed(function() {
    return this.get('apollo').query({
      query: breweriesQuery,
      variables: {skip: 0, first: 10, tags: []}
    }, "breweries").then(result => {
      this.set('breweries', result);
    });
  }),

  reviewsQuery: computed(function() {
    return Promise.all([
      this.get('apollo').query({
        query: beerReviewsQuery,
        variables: {skip: 0, first: 10, beers: [], cips: []}
      }, "beerReviews").then(result => {
        this.set('beerReviews', result);
      }),

      this.get('apollo').query({
        query: breweryReviewsQuery,
        variables: {skip: 0, first: 10,  breweries: [], $cips: []}
      }, "breweryReviews").then(result => {
        this.set('breweryReviews', result);
      })
    ]).then(() => {
      console.log("Test");
      this.set('reviews', [...this.get('beerReviews'), ...this.get('breweryReviews')]);
    });
  })
});
