import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import InsertBeer from 'pinte-ball/queries/mutations/insert-beer';
import breweriesQuery from 'pinte-ball/queries/get-breweries';
import BeerValidations from 'pinte-ball/validations/add-beer';

export default Component.extend({
  apollo: service('apollo'),

  model: null,
  breweries: null,
  BeerValidations,

  init() {
    this._super(...arguments);

    this.set('model', {});
  },

  actions: {
    updateBreweriesValues: function (breweries) {
      this.set('selectedBreweries', breweries);
    },

    addBeer: function (model) {
      return model.save().then(() => {
        const variables = {
          name: model.get('beerName'),
          description: model.get('beerDescription'),
          ibu: model.get('beerIbu'),
          alcoholPercent: model.get('beerAlcoholPercent'),
          imagePath: model.get('beerImagePath'),
          breweries: model.get('beerBreweries').map(b => b.id),
          tags: model.get('beerTags').split(','),
          style: model.get('beerStyle.id'),
        }

        this.apollo.client.mutate({ mutation: InsertBeer, variables }).then(() => {
          model = null;
          this.get('onAddBeer')();
        });
      })
    },
  },

  breweriesQuery: computed(function () {
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
  }),
});
