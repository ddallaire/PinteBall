import Component from '@ember/component';
import { observer } from '@ember/object';
import { set } from '@ember/object';

export default Component.extend({
  selectedItem: "REVIEWS",

  toggle: function(section) {
    this.set('selectedItem', section);
  },
});
