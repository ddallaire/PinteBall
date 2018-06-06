import {computed} from '@ember/object';
import {readOnly} from '@ember/object/computed';
import Service, {inject as service} from '@ember/service';
import config from 'pinte-ball/config/environment';

import ticketValidationMutation from 'pinte-ball/queries/mutations/login';
import logoutMutation from 'pinte-ball/queries/mutations/logout';

export default Service.extend({
  apollo: service('apollo'),
  sessionFetcher: service('session/fetcher'),
  sessionPersister: service('session/persister'),
  sessionDestroyer: service('session/destroyer'),

  isAuthenticated: readOnly('credentials.cip'),

  credentials: computed({
    get() {
      return this.sessionFetcher.fetch();
    },

    set(_, value) {
      this.sessionPersister.persist(value);
      return value;
    }
  }),

  redirectToCas() {
    const casUrl = `${config.APP.CAS.SERVER}/login?service=${encodeURIComponent(config.APP.CAS.CLIENT)}`;
    window.location.replace(casUrl);
  },

  validateTicket(ticket) {
    return this.apollo.client.mutate({mutation: ticketValidationMutation, variables: {ticket}})
      .then(credentials => {
        const userCredentials = {
          cip: credentials.data.login.cip,
          name: credentials.data.login.name,
          surname: credentials.data.login.surname,
          token: credentials.data.login.token
        };
        this.set('credentials', userCredentials);
        return true;
      })
      .catch(error => {
        return false;
      });
  },

  logout() {
    this.sessionDestroyer.destroySession();
    this.apollo.client.mutate({mutation: logoutMutation});
    window.location.replace(`${config.APP.CAS.SERVER}/logout?service=${encodeURIComponent(config.APP.CAS.CLIENT)}`);
  }
});
