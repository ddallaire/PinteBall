import {computed} from '@ember/object';
import {readOnly} from '@ember/object/computed';
import Service, {inject as service} from '@ember/service';
import config from 'pinte-ball/config/environment';
import fetch from 'fetch';

export default Service.extend({
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
    const validateUrl = `${config.APP.CAS.CORS}/${config.APP.CAS.SERVER}/serviceValidate?service=${encodeURIComponent(config.APP.CAS.CLIENT)}&ticket=${ticket}`;

    const validation = fetch(validateUrl).then(function(response) {
      return response.text().then(function(text) {
        const xmlData = new window.DOMParser().parseFromString(text, "application/xml");
        const credentials = {
          cip: xmlData.getElementsByTagName('cas:cip')[0].textContent,
          firstName: xmlData.getElementsByTagName('cas:prenom')[0].textContent,
          lastName: xmlData.getElementsByTagName('cas:nomFamille')[0].textContent
        };

        return credentials;
      });
    });

    validation.then(credentials => this.set('credentials', credentials));
  },

  logout() {
    this.sessionDestroyer.destroySession();
    window.location.replace(`${config.APP.CAS.SERVER}/logout`);
  }
});
