import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel(transition) {
    if (!this.get('session').isAuthenticated) {
      if (transition.queryParams['ticket']) {
        const authResult = this.get('session').validateTicket(transition.queryParams['ticket']);
        authResult.then(result => {
          if (result) {
            this.transitionTo('home');
          }
        });
      } else {
        this.get('session').redirectToCas();
      }
    } else if (transition.intent.url == '/') {
      this.transitionTo('home');
    }
  }
});
