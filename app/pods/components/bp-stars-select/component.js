import Component from '@ember/component';
import EmberObject from '@ember/object';

const Star = EmberObject.extend({});

export default Component.extend({
  stars: null,
  starsBuffer: null,
  ratingBuffer: null,
  ratingResetIndex: 0,

  init() {
    this._super(...arguments);
    let starArray = [];
    let bufferArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.pushObject(Star.create({id: i, active: false}));
      bufferArray.pushObject(Star.create({id: i, active: false}));
    }

    this.set('stars', starArray);
    this.set('starsBuffer', bufferArray);
    this.set('ratingBuffer', 0);
  },

  actions: {
    starMouseEnter: function(e) {
      if(e.target.id != this.get('ratingResetIndex')) {
        let starArray = this.get('stars');
        starArray.forEach((item, index) => {
          item.set('active', index <= e.target.id);
        });
      } else {
        this.set('ratingResetIndex', null);
      }
    },

    starContainerMouseLeave: function() {
      let starsBuffer = this.get('starsBuffer');
      this.get('stars').forEach((item, index) => {
        item.set('active', starsBuffer.objectAt(index).active);
      });
    },

    starsClick: function(e) {
      let newRating = parseInt(e.target.id) + 1;
      let ratingBuffer = this.get('ratingBuffer');
      if(newRating == ratingBuffer) {
        newRating = 0;
        this.get('stars').forEach((item, index) => {
          item.set('active', false);
        });

        this.set('ratingResetIndex', e.target.id);
      }

      let stars = this.get('stars');

      this.get('starsBuffer').forEach((item, index) => {
        item.set('active', stars.objectAt(index).active);
      });

      this.get('onStarClick')(newRating);
      this.set('ratingBuffer', newRating);
    }
  }
});

