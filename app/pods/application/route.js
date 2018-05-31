import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel(transition) {
    if (!this.get('session').isAuthenticated) {
      if (transition.queryParams['ticket']) {
        this.get('session').validateTicket(transition.queryParams['ticket']);
      } else {
        this.get('session').redirectToCas();
      }
    }
  }
});
