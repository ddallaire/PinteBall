import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ApolloService from "ember-apollo-client/services/apollo";
import { setContext } from "apollo-link-context";

export default ApolloService.extend({
  session: service('session'),

  link: computed(function() {
    let httpLink = this._super(...arguments);

    let authLink = setContext(() =>({
      headers: {authorization: `Bearer ${this.get('session.credentials.token')}`}
    }));
    return authLink.concat(httpLink);
  }),
});
