import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import beersQuery from 'pinte-ball/queries/get-beers';
import breweriesQuery from 'pinte-ball/queries/get-breweries';
import beerReviewsQuery from 'pinte-ball/queries/get-beer-reviews';
import breweryReviewsQuery from 'pinte-ball/queries/get-brewery-reviews';
import moment from 'moment';

export default Component.extend({
  apollo: service('apollo'),
  beers: null,
  breweries: null,
  reviews: null,
  showBeers: true,
  showBreweries: false,
  showReviews: false,

  init: function() {
    this._super(...arguments);
    this.set('reviews', []);
  },

  actions: {
    showBeers: function() {
      this.set('showBeers', true);
      this.set('showBreweries', false);
      this.set('showReviews', false);
    },

    showBreweries:  function() {
      this.set('showBeers', false);
      this.set('showBreweries', true);
      this.set('showReviews', false);
    },

    showReviews: function() {
      this.set('showBeers', false);
      this.set('showBreweries', false);
      this.set('showReviews', true);
    }
  },

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
        this.set('reviews', [...this.get('reviews'), ...result.map(a => {a.type="beer"; a.targetId=a.idBeer; return a;})]);
      }),

      this.get('apollo').query({
        query: breweryReviewsQuery,
        variables: {skip: 0, first: 10,  breweries: [], $cips: []}
      }, "breweryReviews").then(result => {
        this.set('reviews', [...this.get('reviews'), ...result.map(a => {a.type="brewery"; console.log(a);a.targetId=a.idBrewery; return a;})]);
      })
    ]).then(() => {
      this.set('reviews', [...this.get('reviews')].sort((a,b) => moment(b.time).diff(moment(a.time))));
    });
  })
});
