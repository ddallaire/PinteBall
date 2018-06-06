import Component from '@ember/component';

export default Component.extend({
    willRender() {
        const roundedRating = Math.round(this.get('rating'));
        const starArray = new Array(5).fill(0).fill(1, 0, roundedRating);
        this.set('stars', starArray);
    }
});
