import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InsertBrewery from 'pinte-ball/queries/mutations/insert-brewery';
import BreweryValidations from 'pinte-ball/validations/add-brewery';

export default Component.extend({
  apollo: service('apollo'),

  model: null,
  BreweryValidations,

  init() {
    this._super(...arguments);
    this.set('model', {});
  },

  actions: {
    addBrewery: function(model) {
      return model.save().then(() => {
        const variables = {
          name: model.get('breweryName'),
          description: model.get('breweryDescription'),
          imagePath: model.get('breweryImagePath'),
          tags: model.get('breweryTags').split(',')
        }

        this.apollo.client.mutate({mutation: InsertBrewery, variables}).then(() => {
          this.get('onAddBrewery')();
        });
      });
    }
  },
});
