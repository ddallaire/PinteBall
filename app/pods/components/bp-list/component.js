import Component from '@ember/component';

export default Component.extend({
  computeTable: function(items) {
    const nbRow = Math.round(items.length / 2.0);
    const table = [];
    for(let i = 0; i < nbRow * 2; i+=2) {
      let row = [items[i], items[i+1]];
      table.push(row);
    }
    return table;
  }
});
