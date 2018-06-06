import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  beerRating: computed('beer', function() {
    let rating = this.get('beer').rating;
    return Math.round(rating * 10) / 10;
  }),
});
