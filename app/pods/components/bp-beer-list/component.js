import ListComponent from 'pinte-ball/pods/components/bp-brewery-list/component';
import { computed } from '@ember/object';

export default ListComponent.extend({
    table: computed('beers', function() {
        const beers = this.get('beers');
        return this.get('computeTable')(beers);
    })
});
