import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Helper | array-join', function() {
  setupComponentTest('array-join', {
    integration: true
  });

  it('renders', function() {
    this.set('inputValue', [{name: "allo"}, {name: "davs"}]);

    this.render(hbs`{{array-join inputValue}}`);

    expect(this.$().text().trim()).to.equal('allo, davs');
  });
});

