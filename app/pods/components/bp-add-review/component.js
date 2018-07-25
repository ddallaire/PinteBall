import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InsertBeerReview from 'pinte-ball/queries/mutations/insert-beer-review';
import InsertBreweryReview from 'pinte-ball/queries/mutations/insert-brewery-review';
import ReviewValidations from 'pinte-ball/validations/add-review';

export default Component.extend({
  apollo: service('apollo'),
  model: null,
  ReviewValidations,
  reviewRating: 0,

  init() {
    this._super(...arguments);
    this.set('model', {});
  },

  actions: {
    addReview: function(model) {
      return model.save().then(() => {
        const variables = {
          id: this.get('beerOrBreweryId'),
          title: model.get('reviewTitle'),
          content: model.get('reviewContent'),
          rating: model.get('reviewRating') || 0,
          imagePath: model.get('reviewImagePath') || ''
        }

        let mutation;

        if (this.get('type') === 'beer') {
          mutation = InsertBeerReview;
        } else {
          mutation = InsertBreweryReview;
        }

        this.apollo.client.mutate({mutation, variables}).then(() => {
          this.get('onAddReview')();
        });
      });
    }
  }
});
