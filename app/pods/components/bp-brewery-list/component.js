import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getObservable } from 'ember-apollo-client';
import breweriesQuery from 'pinte-ball/queries/get-breweries';
import tagsQuery from 'pinte-ball/queries/get-tags';

export default Component.extend({
  apollo: service('apollo'),

  breweries: null,
  breweriesTags: null,

  init() {
    this._super(...arguments);
    this.set('tagFilters', []);
  },

  actions: {
    toggleAddBreweryModal: function() {
      this.toggleProperty('showAddBrewery');
    },

    onAddBrewery: function() {
      this.toggleProperty('showAddBrewery');
      getObservable(this.get('breweries')).refetch();
      getObservable(this.get('breweriesTags')).refetch();
    },

    onTagFilterChange: function(filters) {
      this.set('tagFilters', filters);
    }
  },

  queryVariables: computed('tagFilters.[]', function() {
    const tagFilters = this.get('tagFilters').map(tag => tag.id);

    return {
      skip: 0,
      first: 10,
      tags: tagFilters
    };
  }),

  breweriesTagsQuery: computed(function() {
    return this.get('apollo').watchQuery({
      query: tagsQuery,
      variables: {skip: 0, first: 20}
    }, "tags").then(result => {
      this.set('breweriesTags', result);
    });
  }),

  breweriesQuery: computed('queryVariables', function() {
    return this.get('apollo').watchQuery({
      query: breweriesQuery,
      variables: this.get('queryVariables')
    }, "breweries").then(result => {
      this.set('breweries', result);
    });
  })
});
