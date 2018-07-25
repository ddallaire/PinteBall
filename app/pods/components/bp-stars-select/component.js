import Component from '@ember/component';
import EmberObject from '@ember/object';

const Star = EmberObject.extend({});

export default Component.extend({
  stars: null,
  lastStarsState: null,
  lastRating: null,
  lastStarClicked: 0,

  init() {
    this._super(...arguments);
    let starArray = [];
    let bufferArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.pushObject(Star.create({id: i, active: false}));
      bufferArray.pushObject(Star.create({id: i, active: false}));
    }

    this.set('stars', starArray);
    this.set('lastStarsState', bufferArray);
    this.set('lastRating', 0);
  },

  actions: {
    starMouseEnter: function(e) {
      if(e.target.id == this.get('lastStarClicked')) {
        this.set('lastStarClicked', null);
      } else {
        this.get('stars').forEach((item, index) => {
          item.set('active', index <= e.target.id);
        });
      }
    },

    starContainerMouseLeave: function() { 
      const lastStars = this.get('lastStarsState');
      this.get('stars').forEach((item, index) => {
        item.set('active', lastStars.objectAt(index).active);
      });
    },

    starsClick: function(e) {
      const lastRating = this.get('lastRating');
      const stars = this.get('stars');
      let newRating = parseInt(e.target.id) + 1;
      
      if(newRating == lastRating) {
        newRating = 0;
        stars.setEach('active', false);
        this.set('lastStarClicked', e.target.id);
      }

      this.get('onStarClick')(newRating);
      this.get('lastStarsState').forEach((item, index) => {
        item.set('active', stars.objectAt(index).active);
      });
      this.set('lastRating', newRating);
    }
  }
});

