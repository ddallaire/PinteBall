import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | bp-review', function() {
  setupComponentTest('bp-review', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#bp-review}}
    //     template content
    //   {{/bp-review}}
    // `);

    this.render(hbs`{{bp-review}}`);
    expect(this.$()).to.have.length(1);
  });
});
