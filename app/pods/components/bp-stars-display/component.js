import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  stars: computed('rating', function() {
    const roundedRating = Math.round(this.get('rating'));
    return new Array(5).fill(0).fill(1, 0, roundedRating);
  })
});
