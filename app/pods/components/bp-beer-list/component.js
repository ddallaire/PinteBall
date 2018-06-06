import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    table: computed('beers', function() {
        const beers = this.get('beers');
        const nbRow = Math.round(beers.length / 2.0);
        const table = [];
        for(let i = 0; i < nbRow * 2; i+=2) {
            let row = [beers[i], beers[i+1]];
            table.push(row);
        }
        return table;
    })
});
