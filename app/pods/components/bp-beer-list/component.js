import Component from '@ember/component'
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getObservable } from 'ember-apollo-client';
import beersQuery from 'pinte-ball/queries/get-beers';
import beerStylesQuery from 'pinte-ball/queries/get-beer-styles';
import tagsQuery from 'pinte-ball/queries/get-tags';

export default Component.extend({
  apollo: service('apollo'),

  beers: null,
  beerStyles: null,
  beerTags: null,
  showAddBeer: false,

  init() {
    this._super(...arguments);
    this.set('styleFilters', []);
    this.set('tagFilters', []);
  },

  actions: {
    toggleAddBeerModal: function() {
      this.toggleProperty('showAddBeer');
    },

    onAddBeer: function() {
      this.toggleProperty('showAddBeer');
      getObservable(this.get('beers')).refetch();
      getObservable(this.get('beerTags')).refetch();
    }
  },

  queryVariables: computed('styleFilters.[]', 'tagFilters.[]', function() {
    const styleFilters = this.get('styleFilters').map(style => style.id);
    const tagFilters = this.get('tagFilters').map(tag => tag.id);

    return {
      skip: 0,
      first: 10,
      styles: styleFilters,
      tags: tagFilters
    };
  }),

  beerTagsQuery: computed(function() {
    return this.get('apollo').watchQuery({
      query: tagsQuery,
      variables: {skip: 0, first: 20}
    }, "tags").then(result => {
      this.set('beerTags', result);
    });
  }),

  beerStylesQuery: computed(function() {
    return this.get('apollo').query({
      query: beerStylesQuery,
      variables: {skip: 0, first: 20}
    }, "beerStyles").then(result => {
      this.set('beerStyles', result);
    });
  }),

  beersQuery: computed('queryVariables', function() {
    return this.get('apollo').watchQuery({
      query: beersQuery,
      variables: this.get('queryVariables')
    }, "beers").then(result => {
      this.set('beers', result);
    });
  })
});
