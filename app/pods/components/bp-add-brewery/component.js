import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InsertBrewery from 'pinte-ball/queries/mutations/insert-brewery';

export default Component.extend({
  apollo: service('apollo'),

  actions: {
    addBrewery: function() {
      const variables = {
        name: this.get('name'),
        description: this.get('description'),
        imagePath: this.get('imagePath'),
        tags: this.get('tags').split(',')
      }

      this.apollo.client.mutate({mutation: InsertBrewery, variables}).then(() => {
        this.get('onAddBrewery')();
      });
    },
  },
});
