import Component from '@ember/component';

export default Component.extend({
  displayAddReview: false,
  actions: {
    showAddReview: function() {
      this.toggleProperty('displayAddReview');
    }
  }
});
