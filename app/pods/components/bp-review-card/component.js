import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  fallbackImagePath: computed('imagePath', function() {
    return this.get('imagePath') || "/assets/images/default-beer-image.jpg";
  })
});
