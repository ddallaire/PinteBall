import DS from 'ember-data';

export default DS.Model.extend({
    id: DS.attr('string'),
    name: DS.attr('string')
});
