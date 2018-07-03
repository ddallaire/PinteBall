import Component from '@ember/component';
import { computed, observer } from '@ember/object';

export default Component.extend({
  classNameBindings: ['selected'],
  selected: false,

  selectObserver: observer('selectedItem', function() {
    console.log(this.get('selectedItem') === this.get('name'))
    if(this.get('selectedItem') === this.get('name')) {
      this.set('selected', true);
    }
    this.set('selected', false);
  }),

  actions: {
    toggle: function() {
      this.get('owner').toggle(this.get('name'));
      //this.set('selected', true);
    }
  }
});
