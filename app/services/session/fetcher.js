import Service from '@ember/service';
import config from 'pinte-ball/config/environment';

export default Service.extend({
  fetch() {
    const credentials = localStorage.getItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE);
    if (!credentials) return {};

    return JSON.parse(credentials);
  }
});
