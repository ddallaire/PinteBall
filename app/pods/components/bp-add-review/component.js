import Component from '@ember/component';
import {inject as service} from '@ember/service';
import InsertBeerReview from 'pinte-ball/queries/mutations/insert-beer-review';

export default Component.extend({
  apollo: service('apollo'),
  actions: {
    addReview: function() {
      // TODO: Input form validation
      const variables = {
        id: this.get('id') || '',
        title: this.get('title') || '',
        content: this.get('content') || '',
        rating: this.get('rating') || '',
        imagePath: this.get('imagePath') || ''
      }

      this.apollo.client.mutate({mutation: InsertBeerReview, variables}).then(res => {
        // TODO: Find another way to update the page in real time?
        window.location.reload(true);
      });
    }
  }
});
