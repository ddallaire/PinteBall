import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  fallbackImagePath: computed('imagePath', function() {
    let fallbackImage = this.get('type') == "beer" ? "default-beer-image.jpg" : "default-brewery-image.jpg";
    return this.get('imagePath') || "/assets/images/" + fallbackImage;
  })
});
