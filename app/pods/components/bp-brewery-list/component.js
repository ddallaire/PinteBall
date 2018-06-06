import Component from '@ember/component';
import ListComponent from 'pinte-ball/pods/components/bp-list/component';
import { computed } from '@ember/object';

export default ListComponent.extend({
    table: computed('breweries', function() {
        const breweries = this.get('breweries');
        return this.get('computeTable')(breweries);
    })
});
