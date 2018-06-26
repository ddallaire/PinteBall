import Component from '@ember/component';
import {inject as service} from '@ember/service';
import InsertBeerReview from 'pinte-ball/queries/mutations/insert-beer-review';
import InsertBreweryReview from 'pinte-ball/queries/mutations/insert-brewery-review';

export default Component.extend({
  apollo: service('apollo'),
  actions: {
    addReview: function() {
      // TODO: Input form validation
      const variables = {
        id: this.get('id') || '',
        title: this.get('title') || '',
        content: this.get('content') || '',
        rating: this.get('rating') || 0,
        imagePath: this.get('imagePath') || ''
      }

      let mutation;

      if (this.get('type') === 'beer') {
        mutation = InsertBeerReview;
      } else {
        mutation = InsertBreweryReview;
      }

      this.apollo.client.mutate({mutation, variables}).then(() => {
        // TODO: Find another way to update the page in real time?
        window.location.reload(true);
      });
    }
  }
});
