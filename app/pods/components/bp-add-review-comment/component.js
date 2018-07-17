import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InsertBeerReviewComment from 'pinte-ball/queries/mutations/insert-beer-review-comment';
import InsertBreweryReviewComment from 'pinte-ball/queries/mutations/insert-brewery-review-comment';
import ReviewCommentValidations from 'pinte-ball/validations/add-review-comment';

export default Component.extend({
  apollo: service('apollo'),

  model: null,
  ReviewCommentValidations,

  init() {
    this._super(...arguments);
    this.set('model', {});
  },

  actions: {
    addReviewComment: function(model) {
      model.save().then(() => {
        const variables = {
          id: this.get('id'),
          content: model.get('commentContent')
        };

        let mutation;

        if (this.get('type') === 'beer') {
          mutation = InsertBeerReviewComment;
        } else {
          mutation = InsertBreweryReviewComment;
        }

        this.apollo.client.mutate({mutation, variables}).then(() => {
          this.get('onAddComment')();
        });
      });
    }
  }
});
