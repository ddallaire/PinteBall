import {expect} from 'chai';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {setupTest} from 'ember-mocha';

import config from 'pinte-ball/config/environment';

describe('Unit | Services | Session | persister', () => {
  setupTest('service:session/persister');

  let service;

  const credentials = {
    cip: 'dald2202',
    firstName: 'David',
    lastName: 'Dallaire'
  };

  beforeEach(function() {
    service = this.subject();
  });

  afterEach(() => {
    localStorage.removeItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE);
  });

  it('should persist the session credentials to localStorage', () => {
    service.persist(credentials);

    expect(localStorage.getItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE)).to.equal(JSON.stringify(credentials));
  });
});
