import Component from '@ember/component';
import {inject as service} from '@ember/service';
import InsertBeerReviewComment from 'pinte-ball/queries/mutations/insert-beer-review-comment';
import InsertBreweryReviewComment from 'pinte-ball/queries/mutations/insert-brewery-review-comment';

export default Component.extend({
  apollo: service('apollo'),
  actions: {
    addReviewComment: function() {
      const variables = {
        id: this.get('id'),
        content: this.get('commentContent')
      };

      let mutation;

      if (this.get('type') === 'beer') {
        mutation = InsertBeerReviewComment;
      } else {
        mutation = InsertBreweryReviewComment;
      }

      this.apollo.client.mutate({mutation, variables}).then(() => {
        // TODO: Find another way to update the page in real time?
        window.location.reload(true);
      });
    }
  }
});
