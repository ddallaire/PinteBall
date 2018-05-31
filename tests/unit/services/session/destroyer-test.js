import {expect} from 'chai';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {setupTest} from 'ember-mocha';

import config from 'pinte-ball/config/environment';

describe('Unit | Services | Session | destroyer', () => {
  setupTest('service:session/destroyer');

  let service;

  const credentials = {
    cip: 'dald2202',
    firstName: 'David',
    lastName: 'Dallaire'
  };

  beforeEach(function() {
    service = this.subject();

    localStorage.setItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE, JSON.stringify(credentials));
  });

  afterEach(() => {
    localStorage.removeItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE);
  });

  it('should remove the credentials from localStorage', () => {
    service.destroySession();

    expect(localStorage.getItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE)).to.be.null;
  });
});
