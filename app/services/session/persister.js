import Service from '@ember/service';
import config from 'pinte-ball/config/environment';

export default Service.extend({
  persist(session) {
    localStorage.setItem(config.APP.LOCAL_STORAGE.SESSION_NAMESPACE, JSON.stringify(session));
  }
});
