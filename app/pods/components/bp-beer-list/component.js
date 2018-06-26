import Component from '@ember/component'
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import beersQuery from 'pinte-ball/queries/get-beers';

export default Component.extend({
  apollo: service('apollo'),

  beers: null,

  queryVariables: computed(function() {
    return {
      skip: 0,
      first: 10
    };
  }),

  filters: computed(function() {
    return null;
  }),

  beersQuery: computed('filters', function() {
    return this.get('apollo').query({
      query: beersQuery,
      variables: this.get('queryVariables')
    }, "beers").then(result => {
      this.set('beers', result);
    });
  })
});
