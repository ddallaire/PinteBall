import Component from '@ember/component';

export default Component.extend({
    test: [],
    selected: [],
    
    init: function() {
        this._super(...arguments);
        this.set('test', [{id: 1, title: 'test'}, {id: 2, title: 'test2'}]);
    },

    actions: {
        update(selection) {
            console.log(selection);
        }
    }
});
