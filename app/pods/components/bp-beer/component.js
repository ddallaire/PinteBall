import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  beer: computed('params.[]', function() {
    return this.get('params')[0];
  })
});
