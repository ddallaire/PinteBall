import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import InsertBeer from 'pinte-ball/queries/mutations/insert-beer';
import breweriesQuery from 'pinte-ball/queries/get-breweries';
import tagsQuery from 'pinte-ball/queries/get-tags';

export default Component.extend({
  apollo: service('apollo'),

  breweries: null,

  actions: {
    updateStyleValue: function(style) {
      this.set('selectedStyle', style);
    },

    updateBreweriesValues: function(breweries) {
      this.set('selectedBreweries', breweries);
    },

    addBeer: function() {
      const variables = {
        name: this.get('name'),
        description: this.get('description'),
        ibu: this.get('ibu'),
        alcoholPercent: this.get('alcoholPercent'),
        imagePath: this.get('imagePath'),
        breweries: this.get('selectedBreweries').map(b => b.id),
        tags: this.get('tags').split(','),
        rating: this.get('rating'),
        style: this.get('selectedStyle.id'),
      }

      this.apollo.client.mutate({mutation: InsertBeer, variables}).then(() => {
        this.get('onAddBeer')();
      });
    },
  },

  breweriesQuery: computed(function() {
    return this.get('apollo').query({
      query: breweriesQuery,
      variables: {
        skip: 0,
        first: 50,
        tags: []
      }
    }, "breweries").then(result => {
      this.set('breweries', result);
    });
  })
});
