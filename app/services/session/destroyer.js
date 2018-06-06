import Service from '@ember/service';
import config from 'pinte-ball/config/environment';

export default Service.extend({
  destroySession() {
    const session = config.APP.LOCAL_STORAGE.SESSION_NAMESPACE;
    localStorage.removeItem(session);
  }
});
